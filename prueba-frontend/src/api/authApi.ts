
import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/auth",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
