// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  uid: string | null;
  isLoggedIn: boolean;
  login: (uid: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  uid: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const storedUid = localStorage.getItem('firebaseUID');
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  const login = (uid: string) => {
    localStorage.setItem('firebaseUID', uid);
    setUid(uid);
  };

  const logout = () => {
    localStorage.removeItem('firebaseUID');
    setUid(null);
  };

  return (
    <AuthContext.Provider
      value={{ uid, isLoggedIn: !!uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
