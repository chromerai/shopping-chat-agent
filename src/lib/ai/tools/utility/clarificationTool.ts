import { HumanInputResponse } from "../../types";
export class HumanInputTool {
  static async askHuman(question: string, context: any): Promise<HumanInputResponse> {
    console.log(`[Agent Paused]: Awaiting user input: "${question}"`);
    
    return {
      status: 'AWAITING_INPUT',
      message: question,
      context: context // Preserve current context for resumption
    };
  }
}