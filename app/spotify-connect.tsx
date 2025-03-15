import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

// Retrieve your client ID from app.config.js via Constants.expoConfig.extra
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId;

// Generate the redirect URI (must match Spotify Developer Dashboard)
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "tunetrack",
  path: "redirect",
  native: "tunetrack://redirect",
  // useProxy: false,
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

  // Set up the PKCE flow: request an authorization code
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SPOTIFY_SCOPES,
      redirectUri: REDIRECT_URI,
      responseType: "code", // Request an authorization code
      usePKCE: true,
    },
    discovery
  );

  // When the auth response arrives, exchange the code for tokens.
  useEffect(() => {
    // Check if response is successful and has a code.
    // TypeScript doesn't know that `params` exists for success responses,
    // so we assert its type as 'any'.
    if (response?.type === "success") {
      const params = (response as any).params; // Type assertion
      if (params?.code) {
        async function exchangeCode() {
          try {
            const tokenResponse = await AuthSession.exchangeCodeAsync(
              {
                clientId: CLIENT_ID,
                code: params.code,
                redirectUri: REDIRECT_URI,
                extraParams: { code_verifier: request?.codeVerifier || "" },
              },
              discovery
            );
            // Provide a default value for expiresIn if undefined
            const expiresIn = tokenResponse.expiresIn ?? 3600;
            const tokenData = {
              access_token: tokenResponse.accessToken,
              refresh_token: tokenResponse.refreshToken, // Available in PKCE flow
              expires_in: expiresIn,
              expiration_time: Date.now() + expiresIn * 1000,
            };
            await SecureStore.setItemAsync(
              TOKEN_KEY,
              JSON.stringify(tokenData)
            );
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Error exchanging code:", error);
          }
        }
        exchangeCode();
      }
    }
  }, [response, request]);

  async function handleSpotifyLogin() {
    if (request) {
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

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="close-circle-outline" size={36} color="white" />
        </TouchableOpacity>
      </View>
      <ThemedText type="title" style={styles.title}>
        Csatlakozás a Spotify-hoz
      </ThemedText>
      <ThemedText type="default" style={styles.subtitle}>
        A továbblépés előtt telepítsd fel a Spotify Alkalmazás legfrissebb
        változatát erre az eszközre.
      </ThemedText>

      {!isLoggedIn ? (
        <View style={styles.buttonContainer}>
          <AppButton
            style={styles.menuButton}
            title="Csatlakozás a Spotify-hoz"
            onPress={handleSpotifyLogin}
          />
        </View>
      ) : (
        <AppButton
          style={styles.menuButton}
          title="Már be vagy jelentkezve. Kattints ide a folytatáshoz."
          onPress={() => router.back()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 26, marginBottom: 30, color: "#fff" },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: { width: "100%", alignItems: "center" },
  menuButton: { paddingHorizontal: 10, width: "70%", marginBottom: 20 },
});
