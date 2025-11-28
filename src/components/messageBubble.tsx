'use client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : message.type === 'error'
            ? 'bg-red-100 text-red-900 border border-red-300'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {!isUser && message.type === 'safety_block' && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-500">⚠️</span>
            <span className="text-xs font-semibold text-red-600">Safety Warning</span>
          </div>
        )}
        {!isUser && message.type === 'error' && (
          <div className="flex items-center gap-2 mb-1">
            <span>❌</span>
            <span className="text-xs font-semibold">Error</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}