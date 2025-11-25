import React from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";
import settingsStyles from "../../styles/screens/settingsStyles";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { animationsEnabled, toggleAnimations, loading } =
    useAnimationSettings();

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
    <View style={settingsStyles.container}>
      <GradientBackground>
        <View style={settingsStyles.statusBar}>
          <TouchableOpacity
            style={settingsStyles.closeButton}
            onPress={handleBack}
          >
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={settingsStyles.logoContainer}>
          <ThemedText type="defaultSemiBold" style={settingsStyles.title}>
            {t("settings_title")}
          </ThemedText>
        </View>

        <View style={settingsStyles.container}>
          <AppButton
            style={settingsStyles.menuButton}
            title={t("settings_spotify_mode")}
            onPress={handleChangeSpotifyMode}
          />
          <AppButton
            style={settingsStyles.menuButton}
            title={t("settings_language")}
            onPress={handleLanguageChange}
          />
          <View style={settingsStyles.toggleCard}>
            <View style={settingsStyles.toggleTextWrapper}>
              <ThemedText style={settingsStyles.toggleTitle}>
                {t("settings_animation_toggle_label", "Animated backgrounds")}
              </ThemedText>
              <ThemedText style={settingsStyles.toggleSubtitle}>
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
