import * as SecureStore from "expo-secure-store";

const MODE_KEY = "SPOTIFY_MODE"; // e.g. 'free' or 'premium'

export async function setSpotifyMode(mode: "free" | "premium") {
  await SecureStore.setItemAsync(MODE_KEY, mode);
}

export async function getSpotifyMode(): Promise<"free" | "premium" | null> {
  const storedMode = await SecureStore.getItemAsync(MODE_KEY);
  if (!storedMode) return null;
  return storedMode as "free" | "premium";
}
