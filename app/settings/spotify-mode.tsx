// app/settings/spotify-mode.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { spotifyServices } from "@/modules/spotify/di/spotifyServiceLocator";
import spotifyModeStyles from "../../styles/screens/spotifyModeStyles";

function SpotifyModeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

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
    <View style={spotifyModeStyles.container}>
      <GradientBackground>
        <View style={spotifyModeStyles.statusBar}>
          <TouchableOpacity
            style={spotifyModeStyles.closeButton}
            onPress={handleBack}
          >
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={spotifyModeStyles.logoContainer}>
          <ThemedText type="defaultSemiBold" style={spotifyModeStyles.title}>
            {t("settings_spotify_mode_title")}
          </ThemedText>
        </View>

        <ThemedText type="default" style={spotifyModeStyles.subtitle}>
          {t("settings_spotify_mode_subtitle")}
        </ThemedText>

        <View style={spotifyModeStyles.container}>
          <AppButton
            title={t("settings_spotify_mode_free")}
            onPress={handleFree}
            style={spotifyModeStyles.appButton}
          />
          <AppButton
            title={t("settings_spotify_mode_premium")}
            onPress={handlePremium}
            style={spotifyModeStyles.appButton}
          />
        </View>
      </GradientBackground>
    </View>
  );
}

export default SpotifyModeScreen;
