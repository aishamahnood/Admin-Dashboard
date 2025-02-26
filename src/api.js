import axios from 'axios';

// Define and export BASE_URL separately
export const BASE_URL = "https://aquarise-intelflow-backend.vercel.app";

export const apiservice = axios.create({
  baseURL: BASE_URL,  // Use baseURL instead of BASE_URL (case-sensitive)
  timeout: 9000,
});

// Interceptor to add Authorization header if token exists
apiservice.interceptors.request.use(
  config => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
apiservice.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
