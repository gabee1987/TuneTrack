import { remote, auth, ApiScope } from 'react-native-spotify-remote';
import * as SecureStore from "expo-secure-store";

// Replace with your actual values from Spotify Developer Console
const CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || "YOUR_CLIENT_ID";
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI || "YOUR_REDIRECT_URI";

/**
 * Authenticate and retrieve the access token from Spotify.
 */
export async function authenticateWithSpotify(): Promise<string | null> {
  try {
    console.log("Starting Spotify authentication...");
    
    const authResponse = await auth.authorize({
      clientID: CLIENT_ID,
      redirectURL: REDIRECT_URI,
      scopes: [
        ApiScope.UserReadEmailScope,
        ApiScope.UserReadPrivateScope,
        ApiScope.StreamingScope,
        ApiScope.AppRemoteControlScope,
        ApiScope.UserModifyPlaybackStateScope,
        ApiScope.UserReadPlaybackStateScope,
      ],
    });

    if (authResponse.accessToken) {
      console.log("Successfully authenticated with Spotify");
      await SecureStore.setItemAsync("spotifyAccessToken", authResponse.accessToken);
      return authResponse.accessToken;
    } else {
      console.error("Spotify authentication failed: No access token returned");
      return null;
    }
  } catch (error) {
    console.error("Error authenticating with Spotify:", error);
    return null;
  }
}

/**
 * Connect to Spotify Remote using the access token.
 */
export async function connectToSpotify(): Promise<boolean> {
  try {
    const token = await SecureStore.getItemAsync("spotifyAccessToken");

    if (!token) {
      console.error("No access token found. Please authenticate first.");
      return false;
    }

    await remote.connect(token);
    console.log("Successfully connected to Spotify Remote");
    return true;
  } catch (error) {
    console.error("Error connecting to Spotify Remote:", error);
    return false;
  }
}

/**
 * Play a Spotify URI using Spotify Remote.
 */
export async function playSpotifyURI(uri: string) {
  try {
    if (!remote.isConnectedAsync()) {
      console.warn("Spotify Remote is not connected, attempting to reconnect...");
      const connected = await connectToSpotify();
      if (!connected) {
        console.error("Could not reconnect to Spotify Remote.");
        return;
      }
    }

    await remote.playUri(uri);
    console.log(`Playing: ${uri}`);
  } catch (error) {
    console.error("Error playing Spotify URI:", error);
  }
}



/**
 * Refreshes the Spotify token using your backend.
 */
export async function refreshSpotifyToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch("https://your-backend.com/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const json = await response.json();
    if (json.accessToken) {
      await SecureStore.setItemAsync("spotifyAccessToken", json.accessToken);
      return json.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Token refresh error", error);
    return null;
  }
}
