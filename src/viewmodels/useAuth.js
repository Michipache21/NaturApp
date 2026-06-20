import { useState, useEffect } from 'react';
import AuthService from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = AuthService.onAuthChange(u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    return await AuthService.login(email, password);
  };

  const register = async (email, password) => {
    return await AuthService.register(email, password);
  };

  const logout = async () => {
    await AuthService.logout();
  };

  return { user, loading, login, register, logout };
}