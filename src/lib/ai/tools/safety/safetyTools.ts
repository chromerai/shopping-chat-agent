import {SAFETY_PROMPT} from "../../Shoppingprompts/safetyPrompt"
import {SafetyResult} from "../../types"
import {GeminiModel} from "../../models/gemini"

export class SafetyTools {
    private static readonly RED_FLAGS = [
        /system prompt|instructions?|how are you programmed/i,
        /api key|password|secret|token|credientials/i,
        /ignore|override|break|bypass|hack|/i,
        /trash|shitty|hate|terrible|rubbish/i,
        /reveal|show me your|internal|behind the scenes/i,
        /don't follow|disregard|skip|avoid.*rules/i,
        /as a hacker|as a malicious user/i,
        /previous prompt|initial instructions/i,
    ];

    private static readonly OFF_TOPIC_PATTERNS = [
        /politics|religion|sex|violence|illegal/i,
        /meical advice|financial advice|legal advice/i,
        /other products|not phones|cars|tv|headphones|other electronics/i,
    ];

    static async safetyCheck(userInput: string): Promise<SafetyResult> {
        /**
         * function checking for appropriateness of the input
         */
        const ruleBasedResult = this.ruleBasedSafetyCheck(userInput)
        if(!ruleBasedResult.safe) {
            return ruleBasedResult;
        }

        try {
            const llmResult = await this.llmSafetyCheck(userInput);
            if(!llmResult.safe) {
                return llmResult;
            }

            return {
                safe: true,
                reason: "passed_all_safety_checks",
                category: "shopping"
            }
        } catch (error: unknown) {
            console.error('LLM safety check failed, falling back to rule based check: ', error)

            let response = "", reason = "", category = ""
            if (error instanceof Error) {
                if (error.message.includes("timeout") || error.message.includes("network")) {
                    response = "Temporary connectivity issues. Try again Later"
                    reason = "llm_network_error"
                    category = "malicious"
                } else if(error.message.includes('quota') || error.message.includes('limit')) {
                    response = "Service currently unavailable.Try again later"
                    reason = "llm_api_limit",
                    category = "malicious"
                } else {
                    response =  "I'm unable to process your request at the moment. Please try again later.",
                    reason = 'llm_unknown_error',
                    category =  'malicious'
                }
        }

            return {
                safe: false,
                response: response,
                reason: reason,
                category: category
            };
        }
    }

    private static ruleBasedSafetyCheck(userInput: string): SafetyResult {
        const input = userInput.toLowerCase();

        for (let pattern of this.RED_FLAGS) {
            if(pattern.test(input)) {
                return {
                    safe: false,
                    response: "I'm only here to help you in your phone shopping. How can I assist you in finding a phone",
                    reason: "malicious_pattern_detected",
                    category: "malicious"
                };
            }
        }

        for (let pattern of this.OFF_TOPIC_PATTERNS) {
            if(pattern.test(input)) {
                return {
                    safe: false,
                    response: "I specialize in phone shopping and comparisons. If you have questions about phones, I will be happy to help",
                    reason: "off_topic_query",
                    category: "off_topic"
                };
            }
        }

        return {
            safe: true,
            reason: "rule_based_checks_passed",
            category: "shopping"
        }

    }

    private static async llmSafetyCheck(userInput: string): SafetyResult {
        const safetyPrompt = SAFETY_PROMPT.replace("{query}", userInput)

        const response = await GeminiModel.generateStructuredResponse<{
            safe: boolean,
            reason: string,
            category: string 
        }>(safetyPrompt)

        if(!response.safe) {
            return {
                safe: false,
                response: this.getSafetyResponse(response.category),
                reason: response.reason,
                category: response.category as 'off_topic' | 'malicious'
            }
        }

        return {
            safe: true,
            reason: response.reason,
            category: response.category as 'shopping'
        }
    }

    private static getSafetyResponse(category: 'off_topic' | 'malicious'): string {
        const responses = {
      malicious: "I'm here to help with phone shopping. How can I assist you with finding a phone?",
      off_topic: "I specialize in phone shopping and comparisons. Feel free to ask me about phones!"
    };

    return responses[category];

    }
}