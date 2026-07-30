import axios from "axios";

export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL || "/api/backend").replace(
    /\/$/,
    "",
  );

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export default API;
