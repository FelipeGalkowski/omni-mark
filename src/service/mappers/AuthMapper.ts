import type { ISignInDTO } from "../AuthService";
import type { SignInApiDTO, SignResponseApi, SignResponse, RefreshTokenDTO, RefreshTokenApiDTO } from "./type";

export const AuthMapper = {
  accessToken: {
    toApi(dto: ISignInDTO): SignInApiDTO {
      return {
        client_id: dto.clientId,
        client_secret: dto.clientSecret,
        code: dto.code,
        grant_type: dto.grantType,
        redirect_uri: dto.redirectUri,
      };
    },

    toDomain(api: SignResponseApi): SignResponse {
      return {
        accessToken: api.access_token,
        expiresIn: api.expires_in,
        scope: api.scope,
        userId: api.user_id,
        refreshToken: api.refresh_token,
      };
    },
  },

  refreshToken: {
    toApi(dto: RefreshTokenDTO): RefreshTokenApiDTO {
      return {
        client_id: dto.clientId,
        client_secret: dto.clientSecret,
        grant_type: dto.grantType,
      };
    },

    toDomain(api: SignResponseApi): SignResponse {
      return {
        accessToken: api.access_token,
        expiresIn: api.expires_in,
        scope: api.scope,
        userId: api.user_id,
        refreshToken: api.refresh_token,
      };
    },
  },
};
