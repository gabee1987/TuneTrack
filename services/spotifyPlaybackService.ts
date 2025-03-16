// services/spotifyPlaybackService.ts
import { Linking } from "react-native";
import { getStoredSpotifyToken } from "./spotifyAuthService";
import { getSpotifyMode } from "./spotifyModeService";

/**
 * Attempt to play a track using the Spotify Web API.
 * The user’s device must have the Spotify app open in background
 * (or have used it recently) for the "active device" to be recognized.
 *
 * If no active device is found, sometimes the user must manually
 * open Spotify once or pick a device from Spotify Connect UI.
 */
export async function playSpotifyTrack(uri: string): Promise<void> {
  try {
    const mode = await getSpotifyMode();
    
    if (mode === "free") {
      // For free users, open track in the Spotify app
      console.log("Opening track in Spotify (Free Mode) ->", uri);
      await Linking.openURL(uri);
      return;
    }

    // mode === 'premium': proceed with direct playback
    const tokenData = await getStoredSpotifyToken();
    if (!tokenData?.access_token) {
      console.warn("No Spotify access token found. User not logged in?");
      return;
    }

    const playResponse = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uri] }),
    });

    // Basic playback request
    if (playResponse.status === 403) {
      // This can happen if the user is on Spotify Free and your request is not allowed
      console.warn("Playback is restricted—Spotify Free or no active device?");
    } else if (playResponse.status === 401) {
      // Token may be expired or invalid, handle re-auth
      console.warn("Spotify token expired or invalid. Re-auth or refresh needed.");
    } else if (!playResponse.ok) {
      const errorDetails = await playResponse.text();
      console.warn("Failed to play track:", errorDetails);
    }
  } catch (err) {
    console.error("Error playing Spotify track:", err);
  }
}
