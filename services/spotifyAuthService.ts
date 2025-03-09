// services/spotifyAuthService.ts

import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";
import Constants from "expo-constants";

// Read environment variables
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId 
  || process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = Constants.expoConfig?.extra?.spotifyRedirectUri
  || process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI;

// Secure store key for token storage
const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";

interface SpotifyTokenData {
  access_token: string;
  token_type: string;
  expires_in: number; // in seconds
  refresh_token?: string;
  scope?: string;
  expiration_time?: number; // (Date.now() + expires_in*1000)
}

// Spotify authorization endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

/**
 * Initiates the Spotify login using AuthSession.useAuthRequest.
 */
// export async function loginToSpotify(): Promise<SpotifyTokenData | null> {
//   try {
//     const scopes = SPOTIFY_SCOPES.join(" ");
    
//     const authRequest = await AuthSession.startAsync({
//       authUrl: `${discovery.authorizationEndpoint}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`,
//     });

//     if (authRequest.type === "success" && authRequest.params?.access_token) {
//       const tokenData: SpotifyTokenData = {
//         access_token: authRequest.params.access_token,
//         token_type: authRequest.params.token_type,
//         expires_in: parseInt(authRequest.params.expires_in, 10),
//         scope: authRequest.params.scope,
//         refresh_token: authRequest.params.refresh_token,
//         expiration_time: Date.now() + parseInt(authRequest.params.expires_in, 10) * 1000,
//       };

//       await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokenData));
//       return tokenData;
//     } else {
//       console.warn("Spotify login failed or canceled.");
//       return null;
//     }
//   } catch (err) {
//     console.error("Spotify login error:", err);
//     return null;
//   }
// }

/**
 * Retrieves stored Spotify token.
 */
export async function getStoredSpotifyToken() {
    try {
      const data = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!data) return null;
      const token = JSON.parse(data);
      if (token.expiration_time && Date.now() > token.expiration_time) {
        return null; // Token expired
      }
      return token;
    } catch (err) {
      console.error("Error retrieving Spotify token:", err);
      return null;
    }
  }

/**
 * Clears stored token (logout).
 */
export async function clearSpotifyToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
