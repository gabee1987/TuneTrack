// app/settings/spotify-mode.tsx
import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { spotifyServices } from "@/modules/spotify/di/spotifyServiceLocator";
import createSpotifyModeStyles from "../../styles/screens/spotifyModeStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

function SpotifyModeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { mode, tokens } = useAppTheme();
  const styles = useMemo(() => createSpotifyModeStyles(mode), [mode]);

  const handleFree = async () => {
    await spotifyServices.modeService.setMode("free"); // Store 'free' in local storage
    router.replace("/");
  };

  const handlePremium = async () => {
    await spotifyServices.modeService.setMode("premium"); // Store 'premium' in local storage
    router.replace("/");
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
              color={tokens.closeButtonIcon}
            />
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
