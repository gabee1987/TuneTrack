import React from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSpotifyConnection } from "@/modules/spotify/hooks/useSpotifyConnection";
import homeStyles from "../styles/screens/homeStyles";

function MainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isConnected, refresh } = useSpotifyConnection();

  // Check connection status on mount and when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleReadRules = () => {
    router.push("/game-rules");
  };

  const handleSpotifyConnect = () => {
    router.push("/spotify-connect");
  };

  const handleStartGame = () => {
    router.push("/camera");
  };

  const handleSettingsPress = () => {
    router.push({
      pathname: "/settings",
      params: { isSpotifyConnected: isConnected.toString() },
    });
  };

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.container}>
        {/* <AnimatedBlurredBlobs /> */}
        <View style={homeStyles.statusBar}>
          <TouchableOpacity
            style={homeStyles.settingsButton}
            onPress={handleSettingsPress}
          >
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={homeStyles.logoContainer}>
          <ThemedText type="title" style={homeStyles.logoText}>
            {t("index_logo")}
          </ThemedText>
        </View>

        <View style={homeStyles.bottomContainer}>
          <AppButton
            style={homeStyles.menuButton}
            title={t("index_read_rules")}
            onPress={handleReadRules}
          />
          {isConnected ? (
            <AppButton
              style={homeStyles.menuButton}
              title={t("index_start_game")}
              onPress={handleStartGame}
            />
          ) : (
            <AppButton
              style={homeStyles.menuButton}
              title={t("index_connect_spotify")}
              onPress={handleSpotifyConnect}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;
