import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://ff5a-187-1-167-154.ngrok-free.app", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
