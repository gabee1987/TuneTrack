import * as SecureStore from "expo-secure-store";
import {
  deserializeToken,
  serializeToken,
  SpotifyToken,
} from "@/modules/spotify/domain/SpotifyToken";
import { SpotifyTokenStorage } from "@/modules/spotify/application/ports/SpotifyTokenStorage";

const TOKEN_STORAGE_KEY = "SPOTIFY_TOKEN_DATA";

export class SecureStoreTokenStorage implements SpotifyTokenStorage {
  async getToken(): Promise<SpotifyToken | null> {
    try {
      const stored = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
      if (!stored) {
        return null;
      }
      return deserializeToken(stored);
    } catch (error) {
      console.error("[spotify] Failed to load token from secure storage", error);
      return null;
    }
  }

  async setToken(token: SpotifyToken): Promise<void> {
    await SecureStore.setItemAsync(
      TOKEN_STORAGE_KEY,
      serializeToken(token)
    );
  }

  async clearToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  }
}

