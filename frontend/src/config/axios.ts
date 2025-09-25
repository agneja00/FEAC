import { PROD } from "../constants/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
  ? "https://home-services-f898b008a33e.herokuapp.com/"
  : "http://localhost:3000/";

const config: AxiosRequestConfig = {
  baseURL,
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
