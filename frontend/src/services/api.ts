import axios from 'axios';

// 1. Create the Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attaches Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('glucolens_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Response Interceptor: Handles 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear session
      localStorage.removeItem('glucolens_token');
      localStorage.removeItem('glucolens_user');
      // Optional: Redirect to login is handled by the ProtectedRoute component
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;