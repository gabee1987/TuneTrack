import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import GradientBackground from "@/components/ui/GradientBackground";
import { useSpotifyAuth } from "@/modules/spotify/hooks/useSpotifyAuth";

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
    Alert.alert(t("spotify_connect_error_title", "Spotify login failed"), error, [
      {
        text: t("ok", "OK"),
        onPress: clearError,
      },
    ]);
  }, [clearError, error, t]);

  const handleBack = () => {
    router.back();
  };

  const isBusy = status === "prompt" || status === "exchanging";

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
          <AppButton
            style={styles.menuButton}
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
