import axios, { AxiosError, AxiosResponse } from "axios";

import { navigationRef } from "../navigation";
import { Utils } from "../utils";

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

api.interceptors.response.use(async (config) => {
  console.log("status_code", config.status);
  if (config.status === 401) {
    await Utils.Storage.removeItem(Utils.Storage.Keys.AUTH);
    if (navigationRef.isReady()) {
      navigationRef.navigate("Login" as unknown as never);
    }
  }

  return config;
});

export type HandleResponseProps<T = unknown> =
  | { data: T; success: true; error: null }
  | { error: AxiosError; success: false; data: null };

export async function handleResponse<T = unknown>(
  cb: () => Promise<AxiosResponse<T>>
): Promise<HandleResponseProps<T>> {
  try {
    const { data } = await cb();
    return { data, success: true, error: null };
  } catch (error: any) {
    return { error, success: false, data: null };
  }
}

export interface BaseResponseProps {
  message: string;
}

export async function handleMockResponse(cb: () => Promise<any>): Promise<any> {
  cb();
  return { data: { message: "Sucesso" }, success: true, error: null };
}
