import Constants from "expo-constants";
import * as AuthSession from "expo-auth-session";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";

export interface SpotifyDiscoveryDocument {
  authorizationEndpoint: string;
  tokenEndpoint: string;
}

export interface SpotifyConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  discovery: SpotifyDiscoveryDocument;
}

const DEFAULT_DISCOVERY: SpotifyDiscoveryDocument = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function resolveClientId(): string {
  const extra = Constants.expoConfig?.extra ?? {};
  const envValue =
    process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ??
    process.env.SPOTIFY_CLIENT_ID ??
    "";
  return (
    (extra.spotifyClientId as string | undefined) ??
    (extra.spotify_client_id as string | undefined) ??
    envValue ??
    ""
  );
}

export function getSpotifyConfig(): SpotifyConfig {
  const clientId = resolveClientId();
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "tunetrack",
    path: "redirect",
  });

  if (!clientId) {
    console.warn(
      "[spotify] Missing client id. Set EXPO_PUBLIC_SPOTIFY_CLIENT_ID or expo.extra.spotifyClientId."
    );
  }

  return {
    clientId,
    redirectUri,
    scopes: SPOTIFY_SCOPES,
    discovery: DEFAULT_DISCOVERY,
  };
}

