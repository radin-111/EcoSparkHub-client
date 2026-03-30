import { env } from "@/env";
import { ApiResponse } from "@/types&enums/api.types";
import axios from "axios";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};

const get = async <T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.get<ApiResponse<T>>(endpoint, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async <T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.put<ApiResponse<T>>(endpoint, data, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async <T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.post<ApiResponse<T>>(endpoint, data, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const del = async <T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.delete<ApiResponse<T>>(endpoint, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const patch = async <T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = axiosInstance();
    const response = await instance.patch<ApiResponse<T>>(endpoint, data, {
      headers: options?.headers,
      params: options?.params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpClient = {
  get,
  put,
  post,
  delete: del,
  patch,
};
