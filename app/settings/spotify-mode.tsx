// app/settings/spotify-mode.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";

function SpotifyModeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleFree = () => {
    // Logic: set app mode to "Spotify Free" here
    router.back();
  };

  const handlePremium = () => {
    // Logic: set app mode to "Spotify Premium" here
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {t("settings_spotify_mode_title")}
          </ThemedText>
        </View>

        <ThemedText type="default" style={styles.subtitle}>
          {t("settings_spotify_mode_subtitle")}
        </ThemedText>

        <View style={styles.container}>
          <AppButton
            title={t("settings_spotify_mode_free")}
            onPress={handleFree}
            style={styles.appButton}
          />
          <AppButton
            title={t("settings_spotify_mode_premium")}
            onPress={handlePremium}
            style={styles.appButton}
          />
        </View>
      </GradientBackground>
    </View>
  );
}

export default SpotifyModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
  title: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "#3535357d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  subtitle: {
    marginHorizontal: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  appButton: {
    width: "80%",
    marginVertical: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
