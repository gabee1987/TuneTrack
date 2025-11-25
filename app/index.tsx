import React, { useMemo } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSpotifyConnection } from "@/modules/spotify/hooks/useSpotifyConnection";
import createHomeStyles from "../styles/screens/homeStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";
import { useCurrentTrack } from "@/contexts/CurrentTrackContext";

function MainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isConnected, refresh } = useSpotifyConnection();
  const { mode } = useAppTheme();
  const { hasCurrentTrack, lastScannedQrData } = useCurrentTrack();
  const styles = useMemo(() => createHomeStyles(mode), [mode]);

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

  const handleViewCurrentTrack = () => {
    if (lastScannedQrData) {
      router.push({
        pathname: "/qr-result",
        params: { qrData: lastScannedQrData },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <AnimatedBlurredBlobs /> */}
        <View style={styles.statusBar}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}
          >
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <ThemedText type="title" style={styles.logoText}>
            {t("index_logo")}
          </ThemedText>
        </View>

        <View style={styles.bottomContainer}>
          {hasCurrentTrack && (
            <AppButton
              style={styles.menuButton}
              title={t("index_view_current_track", "View Current Track")}
              onPress={handleViewCurrentTrack}
            />
          )}
          <AppButton
            style={styles.menuButton}
            title={t("index_read_rules")}
            onPress={handleReadRules}
          />
          {isConnected ? (
            <AppButton
              style={styles.menuButton}
              title={t("index_start_game")}
              onPress={handleStartGame}
            />
          ) : (
            <AppButton
              style={styles.menuButton}
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
