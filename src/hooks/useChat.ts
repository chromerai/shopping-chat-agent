'use Client'

import {useState, useCallback, useEffect} from "react"

interface Message {
    role: 'user' | 'assistant';
    content: string;
    type?: string;
    data?: any
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [context, setContext] = useState<any>(null);

    useEffect(() => {
        let id = sessionStorage.getItem('chatSessionId');

        if(!id) {
            id = crypto.randomUUID();
            sessionStorage.setItem('chatSessionId', id);
            console.log('[CHAT] new session created: ', id)
        } else {
            console.log('[CHAT] Existing session restored: ', id)
        }

        setSessionId(id)
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        if(!sessionId)
        {
            console.error('[CHAT] Cannot send message: session ID not initialized')
            return;
        }

        const userMessage: Message = {role: 'user', content}
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    message: content,
                    sessionId,
                    context
                })
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const result = await response.json()

            if(result.context){
                setContext(result.context);
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: result.response,
                type: result.type,
                data: result.data,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('[Chat] Error sending message:', error);

            setMessages((prev) => [
                ...prev,
                {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                type: 'error',
                },
            ]);
        } finally {
            setIsLoading(false)
        }
    }, [sessionId, context])

    const clearSession = useCallback(() => {
        sessionStorage.removeItem('chatSessionId')
        const newId = crypto.randomUUID();
        sessionStorage.setItem('chatSessionId', newId);
        setSessionId(newId);
        setMessages([]);
        setContext(null);
        console.log('[Chat] Session cleared, new session:', newId);
    }, []);

    return {
        messages,
        isLoading, 
        sendMessage, 
        clearSession,
        sessionId,
    }
}

