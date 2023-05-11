import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const getToken = () => {
  return Cookies.get("x-access-token");
};
const api: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    config.headers["x-access-token"] = token;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
