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
import { useTranslation } from "react-i18next";
import GradientBackground from "@/components/ui/GradientBackground";

// Retrieve your client ID from app.config.js via Constants.expoConfig.extra
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId;

// Generate the redirect URI (must match Spotify Developer Dashboard)
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "tunetrack",
  path: "redirect",
  // path: "tunetrack://redirect",
  // native: "tunetrack://spotify-connect",
  // useProxy: false,
});

const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";

// Spotify OAuth endpoints
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function SpotifyConnectScreen() {
  const router = useRouter();
  const { t } = useTranslation();
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
    console.log("Auth request:", request);
    console.log("Auth response:", response);
    console.log("Redirect URI:", REDIRECT_URI);
    console.log("Client ID:", CLIENT_ID);

    // Check if response is successful and has a code.
    if (response?.type === "success") {
      const params = (response as any).params; // Type assertion
      console.log("Response params:", params);

      if (params?.code) {
        async function exchangeCode() {
          try {
            console.log("Exchanging code for token...");
            const tokenResponse = await AuthSession.exchangeCodeAsync(
              {
                clientId: CLIENT_ID,
                code: params.code,
                redirectUri: REDIRECT_URI,
                extraParams: { code_verifier: request?.codeVerifier || "" },
              },
              discovery
            );
            console.log("Token response:", tokenResponse);

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
            console.log("Token successfully saved to SecureStore.");
            setIsLoggedIn(true);
            router.replace("/");
          } catch (error) {
            console.error("Error exchanging code:", error);
          }
        }
        exchangeCode();
      }
    } else if (response?.type === "error") {
      console.error("Auth session error:", response.error);
    } else {
      console.log("No valid auth response yet.");
    }
  }, [response, request]);

  async function handleSpotifyLogin() {
    console.log("Prompting Spotify login...");
    if (request) {
      await promptAsync();
    } else {
      console.warn("Auth request not ready yet.");
    }
  }

  async function checkTokenOnLoad() {
    console.log("Checking existing Spotify token in SecureStore...");
    const data = await SecureStore.getItemAsync(TOKEN_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      console.log("Stored token data:", parsed);
      if (parsed.expiration_time > Date.now()) {
        setIsLoggedIn(true);
        console.log("Token is still valid.");
      } else {
        console.log("Token has expired.");
      }
    } else {
      console.log("No token found.");
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
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <ThemedText type="default" style={styles.title}>
            {t("spotify_connect_title")}
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            {t("spotify_connect_subtitle")}
          </ThemedText>
        </View>

        <View style={styles.container}>
          {!isLoggedIn ? (
            <AppButton
              style={styles.menuButton}
              title={t("spotify_connect_connect")}
              onPress={handleSpotifyLogin}
            />
          ) : (
            <AppButton
              style={styles.menuButton}
              title={t("spotify_connect_already")}
              onPress={() => router.back()}
            />
          )}
        </View>
      </GradientBackground>
    </View>
  );
}

export default SpotifyConnectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "#3535357d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    marginBottom: 30,
  },
  menuButton: { paddingHorizontal: 10, width: "70%", marginBottom: 20 },
});
