
import axios from "axios";
import { useAuthStore } from "../store/auth/authStore";

export const oficinaApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/office",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
oficinaApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
