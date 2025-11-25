import React, { useEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import GradientBackground from "@/components/ui/GradientBackground";
import { useSpotifyAuth } from "@/modules/spotify/hooks/useSpotifyAuth";
import spotifyConnectStyles from "../styles/screens/spotifyConnectStyles";

function SpotifyConnectScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { authorize, status, error, isAuthenticated, clearError } =
    useSpotifyAuth();

  useEffect(() => {
    if ((status === "authenticated" || isAuthenticated) && !error) {
      router.replace("/");
    }
  }, [error, isAuthenticated, router, status]);

  useEffect(() => {
    if (!error) {
      return;
    }
    Alert.alert(
      t("spotify_connect_error_title", "Spotify login failed"),
      error,
      [
        {
          text: t("ok", "OK"),
          onPress: clearError,
        },
      ]
    );
  }, [clearError, error, t]);

  const handleBack = () => {
    router.back();
  };

  const isBusy = status === "prompt" || status === "exchanging";

  return (
    <View style={spotifyConnectStyles.container}>
      <GradientBackground>
        <View style={spotifyConnectStyles.statusBar}>
          <TouchableOpacity
            style={spotifyConnectStyles.backButton}
            onPress={handleBack}
          >
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <View style={spotifyConnectStyles.logoContainer}>
          <ThemedText type="default" style={spotifyConnectStyles.title}>
            {t("spotify_connect_title")}
          </ThemedText>
          <ThemedText type="default" style={spotifyConnectStyles.subtitle}>
            {t("spotify_connect_subtitle")}
          </ThemedText>
        </View>

        <View style={spotifyConnectStyles.container}>
          <AppButton
            style={spotifyConnectStyles.menuButton}
            title={
              isAuthenticated
                ? t("spotify_connect_already", "You're connected")
                : isBusy
                ? t("spotify_connect_connecting", "Connecting...")
                : t("spotify_connect_connect", "Connect to Spotify")
            }
            disabled={isBusy || !!error}
            onPress={isAuthenticated ? () => router.back() : authorize}
          />
        </View>
      </GradientBackground>
    </View>
  );
}

export default SpotifyConnectScreen;
