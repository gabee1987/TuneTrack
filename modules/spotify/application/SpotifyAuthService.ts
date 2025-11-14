import { SpotifyConfig } from "@/modules/spotify/config/spotifyConfig";
import { SpotifyToken } from "@/modules/spotify/domain/SpotifyToken";
import { SpotifyTokenStorage } from "@/modules/spotify/application/ports/SpotifyTokenStorage";

export interface TokenResponsePayload {
  accessToken: string;
  refreshToken?: string | null;
  expiresIn?: number | null;
}

const TOKEN_MARGIN_MS = 5_000;

export class SpotifyAuthService {
  constructor(
    private readonly storage: SpotifyTokenStorage,
    private readonly config: SpotifyConfig,
    private readonly fetchFn: typeof fetch = fetch
  ) {}

  async getValidAccessToken(): Promise<string | null> {
    const token = await this.storage.getToken();
    if (!token) {
      return null;
    }
    if (this.isTokenValid(token)) {
      return token.accessToken;
    }
    if (!token.refreshToken) {
      await this.storage.clearToken();
      return null;
    }
    const refreshed = await this.refreshAccessToken(token.refreshToken);
    return refreshed?.accessToken ?? null;
  }

  async hasValidAccessToken(): Promise<boolean> {
    return (await this.getValidAccessToken()) !== null;
  }

  async persistTokenResponse(payload: TokenResponsePayload): Promise<void> {
    if (!payload.accessToken) {
      throw new Error("Cannot persist Spotify token without accessToken");
    }
    const expiresIn = payload.expiresIn ?? 3600;
    const refreshToken = payload.refreshToken ?? "";
    const token: SpotifyToken = {
      accessToken: payload.accessToken,
      refreshToken,
      expiresIn,
      expirationTime: Date.now() + expiresIn * 1000,
    };
    await this.storage.setToken(token);
  }

  async clearToken(): Promise<void> {
    await this.storage.clearToken();
  }

  private isTokenValid(token: SpotifyToken): boolean {
    return token.expirationTime - TOKEN_MARGIN_MS > Date.now();
  }

  private async refreshAccessToken(
    refreshToken: string
  ): Promise<SpotifyToken | null> {
    if (!this.config.clientId) {
      console.error(
        "[spotify] Cannot refresh token without a configured client id."
      );
      return null;
    }

    try {
      const response = await this.fetchFn(
        this.config.discovery.tokenEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: this.config.clientId,
          }).toString(),
        }
      );

      if (!response.ok) {
        const details = await response.text();
        console.warn("[spotify] Failed to refresh token:", details);
        await this.storage.clearToken();
        return null;
      }

      const payload = await response.json();
      const expiresIn = payload.expires_in ?? 3600;
      const token: SpotifyToken = {
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token ?? refreshToken,
        expiresIn,
        expirationTime: Date.now() + expiresIn * 1000,
      };
      await this.storage.setToken(token);
      return token;
    } catch (error) {
      console.error("[spotify] Error refreshing token", error);
      await this.storage.clearToken();
      return null;
    }
  }
}

