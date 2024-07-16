// eslint-disable-next-line import/no-unresolved
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/../env";
import querySerializer from "../utils/querySerializer";

const api = axios.create({
  baseURL: API_URL,
  paramsSerializer: querySerializer,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers["x-access-token"] = parsedToken;
      return config;
    }

    delete config.headers["x-access-token"];

    return config;
  } catch (error) {
    throw new Error("Error in interceptor token", { cause: error });
  }
});

export default api;
