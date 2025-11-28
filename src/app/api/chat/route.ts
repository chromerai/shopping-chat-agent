import { NextRequest, NextResponse } from "next/server";
import { ShoppingAgent } from "@/lib/ai/agents/ShoppingAgent";

const agent = new ShoppingAgent()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {message, sessionId, context } = body

        if(!message || typeof message !== 'string') {
            return NextResponse.json(
                {error: 'Message is required'},
                {status: 400}
            );
        }

        if (!sessionId || typeof sessionId !== 'string') {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            );
        }

        const result = await agent.processMessage(
            message, 
            sessionId, 
            context
        );

        return NextResponse.json(result)
    } catch (error) {
        console.error(`[API] error: ${error}`)
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message: "Unknown error"
            },
            {
                status: 500
            }
        );
    }
}