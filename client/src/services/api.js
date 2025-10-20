import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://skillsync-8z4m.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or unauthorized. Please login again.");
    }
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default API;
