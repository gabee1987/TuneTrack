import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleChangeSpotifyMode = () => {
    router.push("/settings/spotify-mode");
  };

  // Handle language change
  const handleLanguageChange = () => {
    router.push("/settings/language");
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
            {t("settings_title")}
          </ThemedText>
        </View>

        <View style={styles.container}>
          <AppButton
            style={styles.menuButton}
            title={t("settings_spotify_mode")}
            onPress={handleChangeSpotifyMode}
          />
          <AppButton
            style={styles.menuButton}
            title={t("settings_language")}
            onPress={handleLanguageChange}
          />
        </View>
      </GradientBackground>
    </View>
  );
}

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
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  menuButton: {
    width: "70%",
    marginBottom: 20,
  },
});
