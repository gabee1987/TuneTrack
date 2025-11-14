import React from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { animationsEnabled, toggleAnimations, loading } = useAnimationSettings();

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
          <View style={styles.toggleCard}>
            <View style={styles.toggleTextWrapper}>
              <ThemedText style={styles.toggleTitle}>
                {t("settings_animation_toggle_label", "Animated backgrounds")}
              </ThemedText>
              <ThemedText style={styles.toggleSubtitle}>
                {t(
                  "settings_animation_toggle_hint",
                  "Turn this off to reduce motion and save battery."
                )}
              </ThemedText>
            </View>
            <Switch
              value={animationsEnabled}
              onValueChange={() => {
                toggleAnimations();
              }}
              disabled={loading}
              thumbColor={animationsEnabled ? "#0f1320" : "#fafafa"}
              trackColor={{ false: "#c8d1d9", true: "#7dffcb" }}
            />
          </View>
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
  toggleCard: {
    width: "80%",
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleTextWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  toggleTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 4,
  },
});
