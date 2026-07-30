import axios from "axios";

// ALWAYS use same-origin proxy in browser - never hit Render directly
const API = axios.create({
  baseURL: "/api/backend",
  withCredentials: true,
  timeout: 60000,
  headers: { Accept: "application/json" },
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
