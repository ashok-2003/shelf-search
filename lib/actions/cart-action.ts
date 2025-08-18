export const syncToBackend = {
  add: (sessionId: string, productId: string, platform: string, platformLogo: string, quantity: number) => {
    fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, platform, platformLogo, quantity })
    }).catch(console.error); // Just log errors, don't block UI
  },
  
  remove: (sessionId: string, productId: string, platform: string, platformLogo: string, quantity?: number) => {
    fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, platform, platformLogo, quantity })
    }).catch(console.error);
  },
  
  update: (sessionId: string, productId: string, platform: string, platformLogo: string, quantity: number) => {
    fetch('/api/cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, platform, platformLogo, quantity })
    }).catch(console.error);
  },
  
  clear: (sessionId: string) => {
    fetch('/api/cart/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    }).catch(console.error);
  }
};

// Simple session ID helper
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  const userId = localStorage.getItem('userId');
  if (userId) return userId;
  
  let anonId = localStorage.getItem('anonSessionId');
  if (!anonId) {
    anonId = `anon_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`;
    localStorage.setItem('anonSessionId', anonId);
  }
  return anonId;
};