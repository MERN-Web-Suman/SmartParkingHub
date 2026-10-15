const TOKEN_KEY = 'guard_auth_token';
const USER_KEY = 'guard_user_info';

export const setAuthToken = (token, user = null) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getGuardUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
