// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Automatically uses your .env value
  withCredentials: true, // Send cookies with requests if needed (for auth/session)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
