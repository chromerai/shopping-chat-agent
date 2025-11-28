import { GeminiModel } from "../models/gemini";
import { SYSTEM_PROMPT, SYSTEM_CHECK_SCHEMA, ReActStep } from "../Shoppingprompts/systemPrompt";
import { SessionManager } from "../memory/sessionManager";
import { SafetyTools } from "../tools/safety/safetyTools";
import { ALL_TOOLS } from "../tools";
import { AgentResult, Session, HumanInputResponse } from "../types";


interface ReActLoopResult {
  success: boolean;
  finalResponse: string | null;
  iterations: number;
  finalContext: any;
  data: any;
  status?: 'COMPLETED';
}

export class ShoppingAgent {
    private readonly MAX_ITERATIONS = 5

    async processMessage(userInput: string, sessionId: string, previousContext?: any): Promise<AgentResult> {
        console.log(`[Agent] starting processing for session: ${sessionId}`)

        const safetyResult = await SafetyTools.safetyCheck(userInput)
        if(!safetyResult.safe){
            return {
                response: safetyResult.response!,
                type: 'safety_block',
                sessionId,
                iterations: 0
            }
        }

        let session = await SessionManager.getOrCreateSession(sessionId)

        let currentContext = previousContext || session?.context

        await SessionManager.addMessage(sessionId, 'user', userInput)

        const result = await this.executeReactLoop(userInput, session, currentContext)


        if(result.status === 'AWAITING_INPUT') {
            await SessionManager.updateSessionContext(sessionId, result.context)
            return result
        }

        await SessionManager.updateSessionContext(sessionId, result.finalContext || currentContext)

        if(result.finalResponse) {
            await SessionManager.addMessage(sessionId, 'assistant', result.finalResponse)
        }

        return {
            response: result.finalResponse || "I couldn't complete your request. Please try again.",
            type: result.success ? 'success' : 'error',
            sessionId,
            iterations: result.iterations,
            data: result.data
        }

    }

    private async executeReactLoop(userInput: string, 
        session: Session | null, 
        initialContext: any
    ): Promise<ReActLoopResult| HumanInputResponse> {
        const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
            { role: 'user', content: userInput }
        ];

        let currentContext = initialContext
        let finalResponse: string | null = null
        let accumulatedData: any = {}

        try {
            for(let i = 0; i < this.MAX_ITERATIONS; i++) {
                console.log(`[Agent] iteration: ${i + 1} for sessionId: ${session?.id}`)

                const llmResponse = await this.getLLMResponse(messages, currentContext, i)
                const responseText = llmResponse.response

                if(!responseText) {
                    throw new Error("empty response from LLM")
                }

                messages.push({role: 'assistant', content: responseText})

                const hasAction = llmResponse.action && llmResponse.action !== 'final_response'

                if(hasAction) {
                    console.log(`[Agent] executing action: ${llmResponse.action}`)

                    const observation = await this.executeAction(
                        llmResponse.action!,
                        llmResponse.action_input!,
                        currentContext
                    )

                    if(observation.status === 'AWAITING_INPUT'){
                        console.log(`[Agent] Pausing execution for human input`);
                        return observation;
                    }

                    currentContext = this.updateContext(currentContext, llmResponse.action!, observation)
                    accumulatedData = this.accumulateData(accumulatedData, llmResponse.action!, observation)

                    const observationContent = typeof observation === 'string'
                        ? observation
                        : JSON.stringify(observation).slice(0, 500) + '...';

                    messages.push({
                        role: 'system',
                        content: `Observation: ${observationContent}`
                    });
                } else {
                    console.log(`[Agent] Finished after ${i + 1} iterations - no action needed`);
                    finalResponse = responseText;
                    break;
                }
            }
            return {
                success: true,
                finalResponse,
                iterations: messages.filter(m => m.role === 'assistant').length,
                finalContext: currentContext,
                data: accumulatedData
            }

        } catch (error) {
            console.error(`[Agent] Error in ReAct loop:`, error);
            return {
                success: false,
                finalResponse: "I encountered an error while processing your request.",
                iterations: messages.filter(m => m.role === 'assistant').length,
                finalContext: currentContext,
                data: accumulatedData
            };
        }
    }

    private async executeAction(
        action: string, 
        action_input: any,
        context: any
    ): Promise<any> {
        try {
            const toolFunction = ALL_TOOLS[action as keyof typeof ALL_TOOLS];

            if(!toolFunction) {
                return `Error: Unknown Action '${action}'.Available Actions: ${Object.keys(ALL_TOOLS).join(', ')}`
            }

            console.log(`[Agent] Executing action: '${action}' with input: '${action_input}'`)
            const result = await toolFunction(action_input, context)

            return result
        } catch (error) {
            console.error(`[Agent] Error executing action ${action}:`, error);
            if(error instanceof Error){
                return `Error executing ${action}: ${error.message}`
            } else {
                return `Unknown error occured: ${error}`
            }
        }
    }

    private async getLLMResponse(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
        context: any,
        iteration: number
    ): Promise<ReActStep> {
        const prompt = this.buildReactPrompt(messages, context, iteration)
        try {
            return await GeminiModel.generateStructuredResponse(
                prompt,
                SYSTEM_CHECK_SCHEMA,
                {
                    temperature: 0.2,
                    maxOutputTokens: 1024
                }
            )
        } catch (error) {
            console.error('Error getting LLM response:', error);
            return {
                thought: 'Error in response parsing, providing final response',
                action: '',
                action_input: {},
                response: "I'm having trouble processing that. Could you try rephrasing your question?"
            }
        }
    }

    private buildReactPrompt(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    context: any,
    iteration: number
    ): string {
        const conversationHistory = messages
            .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
            .join('\n\n')
        
        return `${SYSTEM_PROMPT}

        CURRENT CONTEXT: 
        ${JSON.stringify(context, null, 2)}

        Conversation History: 
        ${conversationHistory}

        CURRENT ITERATION: ${iteration + 1} of ${this.MAX_ITERATIONS}`
    }

    private updateContext(currentContext: any, action: string, observation: any) {
        const updated = { ...currentContext };

        switch(action) {
            case 'get_recommendation': 
            if(observation.recommendations) {
                updated.last_recommendations = observation.recommendations
                updated.current_products = observation.recommendations.map((r: any) => r.phone)
            }
            break;

            case 'compare_products': 
            if(observation.phones) {
                updated.comparison_results = {
                    differences: observation.differences,
                    recommendations: observation.recommendations
                }
                updated.current_products = observation.phones
            }
            break;

            case 'get_product_details':
                if(observation.product){
                    updated.product_details = observation.product
                    updated.current_products = [observation.product]
                }
            break;
        }

        return updated
    }

    private accumulateData(accumulated: any, action: string, observation: any) {
        const updated = { ...accumulated };
    
        switch (action) {
        case 'get_recommendations':
            updated.recommendations = observation.recommendations;
            break;
            
        case 'compare_products':
            updated.comparison = observation;
            break;
            
        case 'get_product_details':
            if (!updated.products) updated.products = [];
            updated.products.push(observation.product);
            break;
            
        case 'search_web':
            updated.web_search = observation;
            break;
        }
        
        return updated;
    }
}