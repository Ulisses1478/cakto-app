import { Utils } from "@/utils";
import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  config.headers = config.headers || {};
  if (!config.headers.Authorization) {
    const auth = await Utils.Storage.getItem<{ token: string }>(
      Utils.Storage.Keys.AUTH
    );

    if (auth) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }

  return config;
});

export type HandleResponseProps<T = unknown> =
  | { data: T; success: true; error: null }
  | { error: AxiosError; success: false; data: null };

export async function handleResponse<T>(
  cb: () => Promise<AxiosResponse<T>>
): Promise<HandleResponseProps<T>> {
  try {
    const { data } = await cb();
    return { data, success: true, error: null };
  } catch (error: any) {
    return { error, success: false, data: null };
  }
}
