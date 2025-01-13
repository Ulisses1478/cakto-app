import { api, handleResponse } from "../../api";

export interface AuthCredentialsRequest {
  email: string;
  password: string;
}

export interface AuthCredentialsResponse {
  access: string;
  refresh: string;
}

export interface ForgotPasswordRequest {
  email: string;
  recaptchaToken: string;
}

export interface ChangePasswordRequest {
  password: string;
  token: string;
}

class Auth {
  async login(credentials: AuthCredentialsRequest) {
    const fetcher = () => api.post("/token/", credentials);
    return handleResponse<AuthCredentialsResponse>(fetcher);
  }

  async forgotPassword(credentials: ForgotPasswordRequest) {
    const fetcher = () => api.post("/recovery/send-email/", credentials);
    return handleResponse<AuthCredentialsResponse>(fetcher);
  }

  async changePassword(credentials: ChangePasswordRequest) {
    const fetcher = () => api.post("/recovery/change-password/", credentials);
    return handleResponse<AuthCredentialsResponse>(fetcher);
  }
}

export default new Auth();
