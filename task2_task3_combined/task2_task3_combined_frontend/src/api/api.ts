import axios from "axios";

const API_URL = "http://localhost:5168/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

