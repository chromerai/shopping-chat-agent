import { PhoneSearchTool } from "./searchTool";
import { ScoredPhone, RecommendationResult } from '../../types'
import { Phone } from '@/types/shopping'
import { GeminiModel } from "../../models/gemini";
import { PREFERENCE_PROMPT, PREFERENCE_PROMPT_SCHEMA, preferencePromptResponse } from "../../Shoppingprompts/preferencePrompt";

export class RecommendationTool {
    static async getRecommendations(
        userQuery: string, 
        context: any,
    ): Promise<RecommendationResult> {
        try {
            const userPreferences = await this.analysePreferences(userQuery, context)
            const potentialPhones = await this.getPotentialPhones(userPreferences)
            const scoredPhones = await this.scorePotentialPhones(potentialPhones, userPreferences)
            const recommendations = await this.generateRanking(scoredPhones, userPreferences)

            return recommendations
        } catch (error) {
            console.error('Error in getRecommendations: ', error)
            return {
                recommendations: [],
                rationale: "Encountered error while procesing, please try again",
                querySummary: userQuery
            }
        }
    }

    private static async analysePreferences(userQuery: string, context: any): Promise<preferencePromptResponse> {
        const preferencePrompt = PREFERENCE_PROMPT
                                .replace("{query}", userQuery)
                                .replace("{context}", context || "")

        const llmResponse = await GeminiModel.generateStructuredResponse(
            preferencePrompt, 
            PREFERENCE_PROMPT_SCHEMA,
            {
                temperature: 0.2,
                maxOutputTokens: 1024
            }
        )

        return llmResponse;
    }

    private static async getPotentialPhones(preferences: preferencePromptResponse): Promise<Phone[]> {
        const filters: any = {}

       if(preferences.os_preference){
        filters.os_preference = preferences.os_preference
       }

       if(preferences.budget){
        filters.minPrice = preferences.budget.min
        filters.maxPrice = preferences.budget.max
       }

       if(preferences.brand_preferences && preferences.brand_preferences.length > 0){
        filters.brand = preferences.brand_preferences
       }

       if(preferences.feature_priorities && preferences.feature_priorities.length > 0){
        filters.feature_priorities = preferences.feature_priorities
       }

       return await PhoneSearchTool.searchPhones(filters)
    }

    private static scorePotentialPhones(phones: Phone[], preferences: preferencePromptResponse): ScoredPhone[] {
        return phones.map(phone => {
            let score = 0;
            const matchReasons: string[] = [],
            tradeoffs: string[] = []

            if(preferences.budget && phone.price) {
                if(phone.price >= preferences.budget.min && phone.price <= preferences.budget.max){
                    score += 20;

                    matchReasons.push("within Budget")
                } else if(phone.price > preferences.budget.max) {
                    score -= 20;
                    tradeoffs.push('over budget');
                } else if(phone.price < preferences.budget.min) {
                    score -= 20;
                    tradeoffs.push("below min Budget")
                }
            }

            if(preferences.brand_preferences.length > 0) {
                const brandMatch = preferences.brand_preferences.some(brand => phone.brand.toLowerCase().includes(brand))
                if(brandMatch){
                    score += 15;
                    matchReasons.push("preferred brand(s) available")
                } else {
                    score -= 15
                    tradeoffs.push('Asked Brand(s) phones unavailable')
                }
            }

            if(preferences.feature_priorities && preferences.feature_priorities?.length > 0) {
                preferences.feature_priorities.forEach(feature => {
                    if(phone.features.includes(feature)){
                        score += 10
                        matchReasons.push(`${feature} available`)
                    } else {
                        score -= 5
                        tradeoffs.push(`${feature} unavailable`)
                    }
                })
            }

            return {
                phone,
                score: Math.max(0, score),
                matchReasons,
                tradeoffs
            };
        });
    }

    private static async generateRanking(
        scoredPhones: ScoredPhone[],
        preferences: preferencePromptResponse
    ): Promise<RecommendationResult> {
        const rankedPhones = scoredPhones
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)

            const rationale = await this.generateRationale(rankedPhones, preferences)

            return {
                recommendations: rankedPhones,
                rationale,
                querySummary: this.summarizeQuery(preferences)
            }
    }

    private static async generateRationale(recommendations: ScoredPhone[], preferences: preferencePromptResponse): Promise<string> {
        if (recommendations.length === 0) {
        return "I couldn't find any phones that match your specific requirements. You might want to adjust your preferences like budget or must-have features.";
        }

        const rationalePrompt = `
        Generate a helpful recommendation rationale for these phones based on user preferences.

        User Preferences: 
        - Use case: ${preferences.use_case}
        - size_preference: ${preferences.size_preference || 'not specified'}
        - Budget: ${preferences.budget ? `₹${preferences.budget.min} - ₹${preferences.budget.max}` : 'not specified'}
        - features: ${preferences.feature_priorities.join(', ') || 'none specified'}
        - brand_preferences: ${preferences.brand_preferences.join(', ') || 'none specified'}
        - os_preferences: ${preferences.os_preference || 'none specified'}

        Top Recommendations:
        ${recommendations.map((rec, index) => `
        ${index + 1}. ${rec.phone.brand} ${rec.phone.model} (Score: ${rec.score})
        - Price: ₹${rec.phone.price}
        - Key Strengths: ${rec.matchReasons.join(', ')}
        ${rec.tradeoffs.length > 0 ? `- Considerations: ${rec.tradeoffs.join(', ')}` : ''}
        `).join('\n')}

        Write a concise, helpful paragraph (1-2 sentences) per recommendation explaining why these phones were recommended.
        `;

            return await GeminiModel.generateContent(rationalePrompt);
    }

    private static summarizeQuery(preferences: preferencePromptResponse): string {
    let summary = `Looking for ${preferences.use_case}`;
    
    if (preferences.budget) {
      summary += `, budget ₹${preferences.budget.min} - ₹${preferences.budget.max}`;
    }

    if(preferences.size_preference){
        summary += `size-preference: ${preferences.size_preference}`
    }
    
    if (preferences.feature_priorities.length > 0) {
      summary += `, prioritize: ${preferences.feature_priorities.join(', ')} feature`;
    }

    if (preferences.brand_preferences.length > 0) {
      summary += `, brand: ${preferences.brand_preferences.join(', ')}`;
    }

    if (preferences.os_preference) {
      summary += `, desired operating System: ${preferences.os_preference}`;
    }
    
    return summary;
  }

}
