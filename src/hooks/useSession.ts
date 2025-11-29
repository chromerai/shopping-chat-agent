
import { useState, useEffect } from 'react';

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    let clientSessionId = localStorage.getItem('client_session_id');
    
    if (!clientSessionId) {
      // Generate new client session identifier
      clientSessionId = crypto.randomUUID()
      localStorage.setItem('client_session_id', clientSessionId);
    }
    
    setSessionId(clientSessionId);
  }, []);

  const newChat = () => {
    // Generate new session ID
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('client_session_id', newSessionId);
    
    // Refresh the page
    window.location.reload();
  };

  return { sessionId, newChat };
}