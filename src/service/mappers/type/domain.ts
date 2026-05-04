import type { GrantType } from ".";

// Domain (camelCase)
export interface ISignInDTO {
  clientId: number;
  clientSecret: string;
  code: string;
  grantType: GrantType;
  redirectUri: string;
}

export type RefreshTokenDTO = Omit<ISignInDTO, "code" | "redirectUri">;

export interface SignResponse {
  accessToken: string;
  expiresIn: number;
  scope: string;
  userId: number;
  refreshToken: string;
}
