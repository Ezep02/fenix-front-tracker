import axios from "axios";

export const AuthenticationInstance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_BACKEND_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MultipartInstance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_BACKEND_URL}`,
  withCredentials: true,
});

