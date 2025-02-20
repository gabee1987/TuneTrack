import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import BackButton from "@/components/BackButton";
import { connectToSpotify } from "@/services/spotifyService";

// Replace with your actual Spotify Client ID
const SPOTIFY_CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";

// Required scopes for your app.
const SPOTIFY_SCOPES = [
  "user-read-email",
  "user-read-private",
  "streaming",
  "app-remote-control",
  "user-modify-playback-state",
  "user-read-playback-state",
];

// Generate the redirect URI. Ensure it matches your Spotify Developer Dashboard settings.
const redirectUri = AuthSession.makeRedirectUri({ scheme: "tunetrack" });

// Discovery document for Spotify (only used for constructing the auth request)
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyConnectionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Create an auth request using expo-auth-session
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: SPOTIFY_SCOPES,
      redirectUri,
      responseType: "token",
    },
    discovery
  );

  // Handle the authentication response
  useEffect(() => {
    if (response?.type === "success" && response.params.access_token) {
      (async () => {
        const token = response.params.access_token;
        await SecureStore.setItemAsync("spotifyAccessToken", token);

        // Connect to Spotify Remote
        const connected = await connectToSpotify();
        if (connected) {
          Alert.alert("Connected!", "You are now connected to Spotify", [
            { text: "OK", onPress: () => router.push("/camera") },
          ]);
        } else {
          Alert.alert("Error", "Could not connect to Spotify Remote");
        }
      })();
    }
  }, [response]);

  const handleConnect = async () => {
    if (!request) {
      Alert.alert("Error", "Authentication request could not be created");
      return;
    }
    setLoading(true);
    await promptAsync();
    setLoading(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />
      <Text style={styles.title}>Csatlakozás a Spotify-hoz</Text>
      <Text style={styles.subtitle}>
        A továbblépés előtt telepítsd fel a Spotify alkalmazás legfrissebb
        változatát erre az eszközre.
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" />
      ) : (
        <AppButton title="Csatlakozás a Spotify-hoz" onPress={handleConnect} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  subtitle: { textAlign: "center", marginHorizontal: 30, marginBottom: 40 },
});
