import type { GrantType } from "@/service/AuthService";

// API (snake_case)
export interface SignInApiDTO {
  client_id: number;
  client_secret: string;
  code: string;
  grant_type: GrantType;
  redirect_uri: string;
}

export interface RefreshTokenApiDTO {
  client_id: number;
  client_secret: string;
  grant_type: GrantType;
}

// Response API
export interface SignResponseApi {
  access_token: string;
  expires_in: number;
  scope: string;
  user_id: number;
  refresh_token: string;
}
