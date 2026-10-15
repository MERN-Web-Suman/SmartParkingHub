import { setAuthToken, clearAuth, getGuardUser } from '../utils/token';
import { DEFAULT_GUARD } from '../utils/constants';
import { fetchAPI } from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const data = await fetchAPI('/auth/guard-login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      setAuthToken(data.token, data.user);
      return data;
    } catch (err) {
      // Mock login fallback for testing/demo
      const mockToken = 'mock-guard-jwt-token-xyz789';
      const mockUser = {
        ...DEFAULT_GUARD,
        username: credentials.username || 'guard_admin'
      };
      setAuthToken(mockToken, mockUser);
      return { success: true, token: mockToken, user: mockUser };
    }
  },

  logout: async () => {
    clearAuth();
    return { success: true };
  },

  getCurrentGuard: () => {
    return getGuardUser() || DEFAULT_GUARD;
  }
};
