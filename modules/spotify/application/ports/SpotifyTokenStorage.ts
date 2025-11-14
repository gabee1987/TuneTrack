import { SpotifyToken } from "@/modules/spotify/domain/SpotifyToken";

export interface SpotifyTokenStorage {
  getToken(): Promise<SpotifyToken | null>;
  setToken(token: SpotifyToken): Promise<void>;
  clearToken(): Promise<void>;
}

