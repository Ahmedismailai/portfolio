import axios from "axios";

export const API_BASE_URL = "/api/backend";

// ALWAYS use same-origin proxy in browser - never hit Render directly
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
  headers: { Accept: "application/json" },
});

API.interceptors.response.use((response) => {
  const method = response.config?.method?.toLowerCase();
  if (["post", "put", "patch", "delete"].includes(method)) {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("portfolio_data_cache");
      } catch {}
      window.dispatchEvent(new Event("portfolio:data-invalidated"));
    }
  }
  return response;
});

export default API;
