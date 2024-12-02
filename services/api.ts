import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  // TODO: Move to .env file
  baseURL: "https://apistg.cakto.com.br/api",
});

export type HandleResponseProps<T> =
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
