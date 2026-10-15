const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('guard_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Call to ${endpoint} failed, falling back to mock provider if available:`, err.message);
    throw err;
  }
};
