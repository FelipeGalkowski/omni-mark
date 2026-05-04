import { httpClient } from "./httpClient";

export class AuthService {
  static async getAuthUrl() {
    const { data } = await httpClient.get<{ authUrl: string }>('/auth/url');
    return data.authUrl;
  }

  static async refreshToken() {
    const { data } = await httpClient.post<{ message: string; expiresIn: number }>('/auth/refresh');
    return data;
  }

  static isAuthenticated(): boolean {
    return true; // Token check handled by API
  }
}
