import api from "./api";
import type { AxiosRequestConfig } from "axios";

export const Service = {
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return api.get<T>(url, config);
  },

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) {
    return api.post<T>(url, data, config);
  },

  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) {
    return api.put<T>(url, data, config);
  },

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) {
    return api.patch<T>(url, data, config);
  },

  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return api.delete<T>(url, config);
  },
};