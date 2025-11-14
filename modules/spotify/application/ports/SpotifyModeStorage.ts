import { SpotifyMode } from "@/modules/spotify/domain/SpotifyMode";

export interface SpotifyModeStorage {
  getMode(): Promise<SpotifyMode | null>;
  setMode(mode: SpotifyMode): Promise<void>;
}

