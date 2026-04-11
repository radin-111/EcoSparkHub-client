import { env } from "@/env";
import { ApiResponse } from "@/types&enums&interfaces/api.types";
import axios from "axios";
import { cookies } from "next/headers";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const instance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
      cache: "no-store",
    },
  });
  return instance;
};

const get = async <T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> => {
  try {
    const instance = await axiosInstance();
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
    const instance = await axiosInstance();

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
    const instance = await axiosInstance();
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
    const instance = await axiosInstance();
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
    const instance = await axiosInstance();
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
