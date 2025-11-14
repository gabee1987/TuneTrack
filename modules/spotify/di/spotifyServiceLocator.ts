import { getSpotifyConfig } from "@/modules/spotify/config/spotifyConfig";
import { SecureStoreTokenStorage } from "@/modules/spotify/infrastructure/storage/SecureStoreTokenStorage";
import { SecureStoreModeStorage } from "@/modules/spotify/infrastructure/storage/SecureStoreModeStorage";
import { SpotifyAuthService } from "@/modules/spotify/application/SpotifyAuthService";
import { SpotifyModeService } from "@/modules/spotify/application/SpotifyModeService";
import { SpotifyApiClient } from "@/modules/spotify/infrastructure/http/SpotifyApiClient";
import { SpotifyTrackService } from "@/modules/spotify/application/SpotifyTrackService";
import { SpotifyPlaybackService } from "@/modules/spotify/application/SpotifyPlaybackService";

const config = getSpotifyConfig();
const tokenStorage = new SecureStoreTokenStorage();
const modeStorage = new SecureStoreModeStorage();
const authService = new SpotifyAuthService(tokenStorage, config);
const modeService = new SpotifyModeService(modeStorage);
const apiClient = new SpotifyApiClient(authService);
const trackService = new SpotifyTrackService(apiClient);
const playbackService = new SpotifyPlaybackService(apiClient, modeService);

export const spotifyServices = {
  config,
  authService,
  modeService,
  trackService,
  playbackService,
};

export type SpotifyServices = typeof spotifyServices;

