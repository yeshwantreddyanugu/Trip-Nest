// src/hooks/useAuthState.ts
import { useEffect, useState } from 'react';

export const useAuthState = () => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const storedUid = localStorage.getItem('firebaseUID');
    if (storedUid) {
      setUid(storedUid);
    } else {
      setUid(null); // ensure cleanup if not found
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('firebaseUID');
    setUid(null);
  };

  const login = (newUid: string) => {
    localStorage.setItem('firebaseUID', newUid);
    setUid(newUid);
  };

  return {
    uid,
    isLoggedIn: !!uid,
    login,
    logout,
  };
};
