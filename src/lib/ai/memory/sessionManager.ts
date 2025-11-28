// import { createClient } from 'redis';
// import { Session } from "../types";

// const redis = await createClient({ url: process.env.REDIS_URL}).connect();
// export class SessionManager {
//     private static readonly SESSION_TTL = 3600;
   

//     static async getSession(sessionId: string): Promise<Session | null> {
//         try {
//             return await redis.get<Session>(`session:${sessionId}`);
//         } catch (error) {
//             console.error('Error getting session from redis:', error);
//             return null;
//         }
//     }

//     static async createSession(sessionId: string): Promise<Session | null> {
//         const newSession: Session = {
//             id: sessionId,
//             history: [],
//             context: {
//                 current_products: [],
//                 last_recommendations: [],
//                 user_preferences: {}
//             }
//         };

//         await redis.set(`session:${sessionId}`, newSession, {ex: this.SESSION_TTL});
//         return newSession;
//     }

//     static async getOrCreateSession(sessionId: string): Promise<Session | null> {
//         let session = await this.getSession(sessionId);

//         if(!session) {
//             session = await this.createSession(sessionId)
//         }

//         return session;
//     }

//     static async updateSession(sessionId: string, updates: Partial<Session>): Promise<void> {
//         let current = await this.getSession(sessionId)
//         if(!current) {
//             throw new Error("Session not fount")
//         }

//         const updatedSession: Session =  {
//             ...current,
//             ...updates,
//             context: {
//                 ...current.context,
//                 ...updates.context
//             }
//         };

//         await redis.set(`session:${sessionId}`, updatedSession, {ex: this.SESSION_TTL});
//     }
    
//     static async updateSessionContext(sessionId: string, context: any): Promise<void> {
//         const current = await this.getSession(sessionId)
//         if(!current) {
//             throw new Error('Session not found')
//         }

//         await this.updateSession(sessionId, {
//             context: {
//                 ...current.context,
//                 ...context
//             }
//         });
//     }

//     static async addMessage(sessionId: string, role: 'user' | 'assistant', content: string): Promise<void> {
//         const session = await this.getSession(sessionId);
//         if (!session) {
//         throw new Error('Session not found');
//         }

//         session.history.push({
//             role, 
//             content,
//             timestamp: new Date()
//         });

//         await this.updateSession(sessionId, {history: session.history})
//     }

//     static async clearSession(sessionId: string): Promise<void> {
//         await redis.del(`session:${sessionId}`)
//     }
// }

import { createClient } from 'redis';
import { Session } from "../types";

// Create Redis client instance
const redis = createClient({ 
  url: process.env.REDIS_URL 
});

// Handle connection errors
redis.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Connect to Redis
let isConnected = false;

const ensureConnected = async () => {
  if (!isConnected) {
    await redis.connect();
    isConnected = true;
  }
};

export class SessionManager {
    private static readonly SESSION_TTL = 3600;
   
    static async getSession(sessionId: string): Promise<Session | null> {
        try {
            await ensureConnected();
            const sessionData = await redis.get(`session:${sessionId}`);
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (error) {
            console.error('Error getting session from redis:', error);
            return null;
        }
    }

    static async createSession(sessionId: string): Promise<Session | null> {
        try {
            await ensureConnected();
            const newSession: Session = {
                id: sessionId,
                history: [],
                context: {
                    current_products: [],
                    last_recommendations: [],
                    user_preferences: {}
                }
            };

            await redis.setEx(
                `session:${sessionId}`, 
                this.SESSION_TTL, 
                JSON.stringify(newSession)
            );
            return newSession;
        } catch (error) {
            console.error('Error creating session in redis:', error);
            return null;
        }
    }

    static async getOrCreateSession(sessionId: string): Promise<Session | null> {
        let session = await this.getSession(sessionId);

        if(!session) {
            session = await this.createSession(sessionId);
        }

        return session;
    }

    static async updateSession(sessionId: string, updates: Partial<Session>): Promise<void> {
        try {
            await ensureConnected();
            let current = await this.getSession(sessionId);
            if(!current) {
                throw new Error("Session not found");
            }

            const updatedSession: Session = {
                ...current,
                ...updates,
                context: {
                    ...current.context,
                    ...updates.context
                }
            };

            await redis.setEx(
                `session:${sessionId}`, 
                this.SESSION_TTL, 
                JSON.stringify(updatedSession)
            );
        } catch (error) {
            console.error('Error updating session in redis:', error);
            throw error;
        }
    }
    
    static async updateSessionContext(sessionId: string, context: any): Promise<void> {
        const current = await this.getSession(sessionId);
        if(!current) {
            throw new Error('Session not found');
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

        await this.updateSession(sessionId, { history: session.history });
    }

    static async clearSession(sessionId: string): Promise<void> {
        try {
            await ensureConnected();
            await redis.del(`session:${sessionId}`);
        } catch (error) {
            console.error('Error clearing session from redis:', error);
            throw error;
        }
    }

    // Optional: Close Redis connection when needed
    static async disconnect(): Promise<void> {
        if (isConnected) {
            await redis.quit();
            isConnected = false;
        }
    }
}