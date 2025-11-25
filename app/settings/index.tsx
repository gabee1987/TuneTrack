import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";
import createSettingsStyles from "../../styles/screens/settingsStyles";
import TogglePill from "@/components/TogglePill";
import { ThemeMode } from "@/design/tokens/theme";
import { useAppTheme } from "@/design/theme/ThemeProvider";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { animationsEnabled, loading, setAnimationsEnabled } =
    useAnimationSettings();
  const {
    mode: themeMode,
    setMode: setThemeMode,
    tokens: themeTokens,
  } = useAppTheme();
  const styles = useMemo(() => createSettingsStyles(themeMode), [themeMode]);

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
            <Ionicons
              name="close-circle-outline"
              size={36}
              color={themeTokens.closeButtonIcon}
            />
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
          <View style={styles.sectionStack}>
            <View style={styles.sectionCard}>
              <TogglePill<ThemeMode>
                caption={t("settings_theme_label", "App appearance")}
                options={[
                  { label: t("settings_theme_light", "Light"), value: "light" },
                  { label: t("settings_theme_dark", "Dark"), value: "dark" },
                ]}
                value={themeMode}
                onChange={(nextMode) => {
                  // Immediately update theme - no delays
                  setThemeMode(nextMode);
                }}
              />
            </View>

            <View style={styles.sectionCard}>
              <TogglePill<"on" | "off">
                caption={t(
                  "settings_animation_toggle_label",
                  "Animated backgrounds"
                )}
                options={[
                  { label: t("settings_toggle_on", "On"), value: "on" },
                  { label: t("settings_toggle_off", "Off"), value: "off" },
                ]}
                value={animationsEnabled ? "on" : "off"}
                onChange={(selection) =>
                  setAnimationsEnabled(selection === "on")
                }
                disabled={loading}
              />
            </View>
          </View>
        </View>
      </GradientBackground>
    </View>
  );
}
