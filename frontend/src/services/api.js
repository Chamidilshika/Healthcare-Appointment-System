import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically attach the token to every single request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    // Safely check if token exists and isn't the literal string "undefined"
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;