import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getAuthToken } from '../utils/token';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const guard = authService.getCurrentGuard();
      setUser(guard);
      setIsAuthenticated(true);
    } else {
      // Auto-authenticate as default security officer for seamless UI preview
      const guard = authService.getCurrentGuard();
      setUser(guard);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      setIsAuthenticated(true);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
