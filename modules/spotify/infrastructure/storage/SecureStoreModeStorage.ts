import * as SecureStore from "expo-secure-store";
import { SpotifyMode } from "@/modules/spotify/domain/SpotifyMode";
import { SpotifyModeStorage } from "@/modules/spotify/application/ports/SpotifyModeStorage";

const MODE_STORAGE_KEY = "SPOTIFY_MODE";

export class SecureStoreModeStorage implements SpotifyModeStorage {
  async getMode(): Promise<SpotifyMode | null> {
    const stored = await SecureStore.getItemAsync(MODE_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return stored as SpotifyMode;
  }

  async setMode(mode: SpotifyMode): Promise<void> {
    await SecureStore.setItemAsync(MODE_STORAGE_KEY, mode);
  }
}

