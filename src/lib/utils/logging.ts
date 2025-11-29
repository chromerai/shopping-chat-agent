export class Logger {
    private static prefix = '[ShoppingAgent]';

    static log(message: string, data?: any) {
        console.log(`${this.prefix} ${message}`, data ? data : '');
    }

    static error(message: string, error?: any) {
        console.error(`${this.prefix} ERROR: ${message}`, error ? error : '');
    }

    static llmRequest(iteration: number, prompt: string, context: any) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`${this.prefix} LLM REQUEST - Iteration ${iteration}`);
        console.log(`Prompt Length: ${prompt.length} chars`);
        console.log(`Context:`, JSON.stringify(context, null, 2));
        console.log(`${'='.repeat(50)}\n`);
    }

    static llmResponse(response: any) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`${this.prefix} LLM RESPONSE`);
        console.log(`Thought: ${response.thought}`);
        console.log(`Action: ${response.action}`);
        console.log(`Action Input:`, response.action_input);
        console.log(`Response: ${response.response}`);
        console.log(`${'='.repeat(50)}\n`);
    }

    static action(action: string, input: any, result: any) {
        console.log(`\n${this.prefix} ACTION EXECUTED: ${action}`);
        console.log(`Input:`, input);
        console.log(`Result:`, result);
    }
}