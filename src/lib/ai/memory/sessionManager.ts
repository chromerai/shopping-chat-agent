import { kv } from "@vercel/kv";
import { Session } from "@/types/shopping";

export class SessionManager {
    private static readonly SESSION_TTL = 3600;

    static async getSession(sessionId: string): Promise<Session | null> {
        try {
            return await kv.get<Session>(`session: ${sessionId}`);
        } catch (error) {
            console.error('Error getting session from KV:', error);
            return null;
        }
    }

    static async createSession(sessionId: string): Promise<Session | null> {
        const newSession: Session = {
            id: sessionId,
            history: [],
            context: {
                current_products: [],
                last_recommendations: [],
                user_preferences: {}
            }
        };

        await kv.set(`session:${sessionId}`, newSession, {ex: this.SESSION_TTL});
        return newSession;
    }

    static async getOrCreateSession(sessionId: string): Promise<Session | null> {
        let session = await this.getSession(sessionId);

        if(!session) {
            session = await this.createSession(sessionId)
        }

        return session;
    }

    static async updateSession(sessionId: string, updates: Partial<Session>): Promise<void> {
        let current = await this.getSession(sessionId)
        if(!current) {
            throw new Error("Session not fount")
        }

        const updatedSession: Session =  {
            ...current,
            ...updates,
            context: {
                ...current.context,
                ...updates.context
            }
        };

        await kv.set(`session:${sessionId}`, updatedSession, {ex: this.SESSION_TTL});
    }
    
    static async updateSessionContext(sessionId: string, context: any): Promise<void> {
        const current = await this.getSession(sessionId)
        if(!current) {
            throw new Error('Session not found')
        }

        await this.updateSession(sessionId, {
            context: {
                ...current.context,
                ...context
            }
        });
    }

    static async addMessage(sessionId: string, role: 'user' | 'assistant', content: string): Promise<void> {
        const session = await this.getSession(sessionId);
        if (!session) {
        throw new Error('Session not found');
        }

        session.history.push({
            role, 
            content,
            timestamp: new Date()
        });

        await this.updateSession(sessionId, {history: session.history})
    }

    static async clearSession(sessionId: string): Promise<void> {
        await kv.del(`session:${sessionId}`)
    }
}