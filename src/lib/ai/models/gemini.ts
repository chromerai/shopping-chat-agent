import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import dotenv  from 'dotenv'

dotenv.config();

export class GeminiModel {
    private static genAi = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

    static async generateContent(prompt: string, temperature: number = 0.2): Promise<string> {
        try {
            const response = await this.genAi.models.generateContent(
                {
                    model: "gemini-2.0-flash",
                    contents: prompt,
                    config: {
                        temperature,
                        topP: 0.8,
                        topK: 40,
                        maxOutputTokens: 1024
                    },
                }
            );

            if(!response.text){
                throw new Error('Empty response from Gemini')
            }

            return response.text;
        } catch (error) {
            console.error("Gemini API error:", error);
            return `Failed to get response from Gemini: ${error}`;
        }
    }

    static async generateStructuredResponse<T extends z.ZodType>(
        prompt: string,
        schema: T,
        options?: {
            systemInstructions?: string;
            temperature?: number;
            maxOutputTokens?: number;
        }
    ): Promise<z.infer<T>> {

        try {
            const response = await this.genAi.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    systemInstruction: options?.systemInstructions,
                    temperature: options?.temperature ?? 0.2,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: options?.maxOutputTokens ?? 1024,
                    responseMimeType: "application/json",
                    responseJsonSchema: z.toJSONSchema(schema)
                },
            });

            const text = response.text
            console.log(text)
            if(!text){
                throw new Error('Empty response from Gemini')
            }
            const parsed = JSON.parse(text);
            return schema.parse(parsed)
        } catch (error) {
            console.error("Error generating structured response:", error);
            throw error;
        }
    }
}