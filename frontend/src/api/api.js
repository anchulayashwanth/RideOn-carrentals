import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // Backend URL from .env or fallback
});

export default api;
