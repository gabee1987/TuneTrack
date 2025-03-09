import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";
import AppButton from "@/components/AppButton";
import Constants from "expo-constants";

// Read environment variables
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId;
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "tunetrack",
  path: "redirect",
  preferLocalhost: true, // Ensures it works in Expo Go
});

const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";

// Spotify OAuth endpoints
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyConnectScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use `useAuthRequest` to handle authentication
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SPOTIFY_SCOPES,
      redirectUri: REDIRECT_URI, // Use the dynamically generated redirect URI
      responseType: "token",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && response.params?.access_token) {
      const tokenData = {
        access_token: response.params.access_token,
        token_type: response.params.token_type,
        expires_in: parseInt(response.params.expires_in, 10),
        expiration_time:
          Date.now() + parseInt(response.params.expires_in, 10) * 1000,
      };

      SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokenData));
      setIsLoggedIn(true);
    }
  }, [response]);

  async function handleSpotifyLogin() {
    console.log("Logging in to Spotify...");
    if (request) {
      console.log("Prompting user for Spotify login...");
      await promptAsync();
    }
  }

  async function checkTokenOnLoad() {
    const data = await SecureStore.getItemAsync(TOKEN_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.expiration_time > Date.now()) {
        setIsLoggedIn(true);
      }
    }
  }

  useEffect(() => {
    checkTokenOnLoad();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Vissza</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Csatlakozás a Spotify-hoz</Text>
      <Text style={styles.subtitle}>
        A továbblépés előtt telepítsd fel a Spotify Alkalmazás legfrissebb
        változatát erre az eszközre.
      </Text>

      {!isLoggedIn ? (
        <AppButton
          title="Csatlakozás a Spotify-hoz"
          onPress={handleSpotifyLogin}
          // disabled={!request} // Prevents clicking if request is not ready
        />
      ) : (
        <AppButton
          title="Már be vagy jelentkezve. Kattints ide a folytatáshoz."
          onPress={() => router.back()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  backButtonText: { color: "#fff" },
  title: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
});
