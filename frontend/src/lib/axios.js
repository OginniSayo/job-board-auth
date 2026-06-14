import axios from "axios";

// in development, use the local server; in production, use the same origin
// because in production there is no localhost
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/v1"
    : "/api/v1";
    
const api = axios.create({
  baseURL: BASE_URL
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
