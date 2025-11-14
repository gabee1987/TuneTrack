import { Linking } from "react-native";
import { SpotifyApiClient } from "@/modules/spotify/infrastructure/http/SpotifyApiClient";
import { SpotifyModeService } from "@/modules/spotify/application/SpotifyModeService";

export class SpotifyPlaybackService {
  constructor(
    private readonly apiClient: SpotifyApiClient,
    private readonly modeService: SpotifyModeService,
    private readonly openUrl: (url: string) => Promise<void> = Linking.openURL
  ) {}

  async playTrack(uri: string): Promise<void> {
    const mode = await this.modeService.getMode();
    if (mode !== "premium") {
      console.log("[spotify] Free mode - opening track in Spotify", uri);
      await this.openUrl(uri);
      return;
    }

    const result = await this.apiClient.put("/me/player/play", {
      uris: [uri],
    });

    if (!result.ok) {
      if (result.status === 403) {
        console.warn(
          "[spotify] Playback restricted. User may not have an active device or premium."
        );
      } else if (result.status === 401) {
        console.warn("[spotify] Token invalid when attempting playback.");
      } else {
        console.warn("[spotify] Failed to play track", result.error);
      }
    }
  }

  async stopPlayback(): Promise<void> {
    const mode = await this.modeService.getMode();
    if (mode !== "premium") {
      console.log("[spotify] Stop playback ignored for non-premium mode.");
      return;
    }

    const result = await this.apiClient.put("/me/player/pause");
    if (!result.ok && result.status !== 204) {
      // 403 errors are common when device restrictions prevent pausing
      // These are expected in some scenarios and don't need to be logged as warnings
      if (result.status !== 403) {
        console.warn("[spotify] Failed to pause playback", result.error);
      }
    }
  }
}

