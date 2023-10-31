import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { TOKEN_JWT } from "../constans";

import { AUTH_LOGIN, AUTH_REGISTRATION } from "./endpoint";

const baseURL = "https://todoserver-1jmd.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

const urlsSkipAuth: string[] = [AUTH_REGISTRATION, AUTH_LOGIN];

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (
    config &&
    config.headers &&
    config.url &&
    !urlsSkipAuth.includes(config.url)
  ) {
    const jwtToken = localStorage.getItem(TOKEN_JWT);
    const updatedConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
      },
    };

    return updatedConfig;
  }

  return config;
});

export default axiosInstance;
