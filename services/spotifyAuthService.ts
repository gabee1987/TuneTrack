// services/spotifyAuthService.ts
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId || "";

export interface SpotifyTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expiration_time: number;
}

/**
 * Retrieves the stored Spotify token.
 * If expired, attempts to refresh it using the refresh token.
 */
export async function getStoredSpotifyToken(): Promise<SpotifyTokenData | null> {
  try {
    const data = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!data) return null;
    const token: SpotifyTokenData = JSON.parse(data);
    if (token.expiration_time && Date.now() > token.expiration_time) {
      // Token expired: attempt refresh
      const refreshed = await refreshSpotifyToken(token.refresh_token);
      return refreshed;
    }
    return token;
  } catch (error) {
    console.error("Error retrieving Spotify token:", error);
    return null;
  }
}

/**
 * Refreshes the Spotify token using the stored refresh token.
 */
export async function refreshSpotifyToken(refreshToken: string): Promise<SpotifyTokenData | null> {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      }).toString(),
    });
    const result = await response.json();
    if (result.access_token) {
      const expiresIn = result.expires_in ?? 3600;
      const tokenData: SpotifyTokenData = {
        access_token: result.access_token,
        refresh_token: refreshToken, // Usually stays the same
        expires_in: expiresIn,
        expiration_time: Date.now() + expiresIn * 1000,
      };
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokenData));
      return tokenData;
    } else {
      // Refresh failed—clear token and force re-login.
      console.error("Failed to refresh token:", result);
      await clearSpotifyToken();
      return null;
    }
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    await clearSpotifyToken();
    return null;
  }
}



/**
 * Clears the stored Spotify token (logout).
 */
export async function clearSpotifyToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
