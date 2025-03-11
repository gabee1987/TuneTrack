import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";
import AppButton from "@/components/AppButton";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

// Read environment variables
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId;

// Generate the correct Redirect URI dynamically
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "tunetrack",
  path: "redirect",
  native: "tunetrack://redirect",
  preferLocalhost: false, // Don't use localhost for native deep linking
  // useProxy: Constants.appOwnership === "expo", // Use Expo Go proxy only in Expo
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

  console.log("Using REDIRECT_URI:", REDIRECT_URI); // Debugging

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

  const testDeepLink = () => {
    Linking.openURL("tunetrack://redirect");
  };

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
            // disabled={!request} // Prevents clicking if request is not ready
          />

          <AppButton
            style={styles.menuButton}
            title="Test Deep Link"
            onPress={testDeepLink}
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
  container: {
    flex: 1,
    alignItems: "center",
  },
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
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuButton: {
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 20,
  },
});
