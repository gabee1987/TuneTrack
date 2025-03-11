import * as SecureStore from "expo-secure-store";

// Secure store key for token storage
const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";

interface SpotifyTokenData {
  access_token: string;
  expiration_time: number;
}

/**
 * Extracts the Spotify token from the redirect URL and stores it.
 */
export async function storeSpotifyTokenFromUrl(url: string) {
  const urlParams = new URLSearchParams(url.split("#")[1]); // Extract from fragment
  const accessToken = urlParams.get("access_token");
  const expiresIn = urlParams.get("expires_in");

  if (accessToken && expiresIn) {
    const tokenData: SpotifyTokenData = {
      access_token: accessToken,
      expiration_time: Date.now() + parseInt(expiresIn, 10) * 1000,
    };

    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokenData));
    console.log("Spotify token stored successfully");
  }
}

/**
 * Retrieves stored Spotify token.
 */
export async function getStoredSpotifyToken(): Promise<SpotifyTokenData | null> {
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
