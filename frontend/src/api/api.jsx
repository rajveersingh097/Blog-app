// src/api/api.jsx
import axios from "axios";
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || "https://blog-app-gide.onrender.com",
});
// Attach token automatically if present
api.interceptors.request.use((config) => {
const token = localStorage.getItem("adminToken");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});
export default api;
