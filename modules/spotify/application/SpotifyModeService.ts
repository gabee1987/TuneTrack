import { SpotifyMode } from "@/modules/spotify/domain/SpotifyMode";
import { SpotifyModeStorage } from "@/modules/spotify/application/ports/SpotifyModeStorage";

export class SpotifyModeService {
  constructor(private readonly storage: SpotifyModeStorage) {}

  async getMode(): Promise<SpotifyMode | null> {
    return this.storage.getMode();
  }

  async setMode(mode: SpotifyMode): Promise<void> {
    await this.storage.setMode(mode);
  }
}

