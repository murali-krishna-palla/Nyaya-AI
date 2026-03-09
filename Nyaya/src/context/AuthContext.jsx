import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('nyaya-token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nyaya-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (tokenVal, userData) => {
    localStorage.setItem('nyaya-token', tokenVal);
    localStorage.setItem('nyaya-user', JSON.stringify(userData));
    setToken(tokenVal);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('nyaya-token');
    localStorage.removeItem('nyaya-user');
    setToken(null);
    setUser(null);
  };

  const updateLanguage = async (language) => {
    const data = await authAPI.updateLanguage(language);
    const updated = { ...user, preferredLanguage: language };
    localStorage.setItem('nyaya-user', JSON.stringify(updated));
    setUser(updated);
    return data;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
