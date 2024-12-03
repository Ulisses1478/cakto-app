import { api, handleResponse } from '@/services/api';

export interface AuthCredentialsRequest {
  email: string;
  password: string;
}

export interface AuthCredentialsResponse {
  access: string;
  refresh: string;
}


class Auth {
  async login(credentials: AuthCredentialsRequest) {
    const fetcher = () => api.post('/token/', credentials);
    return handleResponse<AuthCredentialsResponse>(fetcher);
  }
export default new Auth();
