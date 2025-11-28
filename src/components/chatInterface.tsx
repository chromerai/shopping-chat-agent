'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import MessageBubble from './messageBubble';
import PhoneCard from './phoneCard';
import ComparisonView from './comparisonView';
import LoadingIndicator from './loadingIndicator';

export default function ChatInterface() {
  const { messages, isLoading, sendMessage, clearSession, sessionId } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    await sendMessage(input);
    setInput('');
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to start a new conversation?')) {
      clearSession();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg">
      {/* Header with session info and clear button */}
      <div className="border-b p-3 flex justify-between items-center bg-gray-50">
        <div className="text-xs text-gray-500">
          Session: {sessionId ? sessionId.slice(0, 8) + '...' : 'Loading...'}
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="text-xs px-3 py-1 text-red-600 hover:bg-red-50 rounded transition"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-4">👋 Welcome! How can I help you today?</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setInput('Show me phones under $500')}
                  className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  disabled={!sessionId}
                >
                  Phones under $500
                </button>
                <button
                  onClick={() => setInput('Compare iPhone 15 and Samsung S24')}
                  className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  disabled={!sessionId}
                >
                  Compare phones
                </button>
                <button
                  onClick={() => setInput('Best phone for photography')}
                  className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  disabled={!sessionId}
                >
                  Best for photography
                </button>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index}>
            <MessageBubble message={message} />
            
            {/* Render phone cards if available */}
            {message.data?.recommendations && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {message.data.recommendations.map((rec: any, idx: number) => (
                  <PhoneCard key={idx} phone={rec.phone} reason={rec.reason} />
                ))}
              </div>
            )}

            {/* Render comparison if available */}
            {message.data?.comparison && (
              <div className="mt-4">
                <ComparisonView comparison={message.data.comparison} />
              </div>
            )}
          </div>
        ))}

        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sessionId ? "Ask about phones..." : "Initializing..."}
            disabled={isLoading || !sessionId}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !sessionId}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}