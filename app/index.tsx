import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { getStoredSpotifyToken } from "@/services/spotifyAuthService";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { getSpotifyMode } from "@/services/spotifyModeService";

function MainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  useEffect(() => {
    checkSpotifyConnection();
  }, []);

  async function checkSpotifyConnection() {
    const token = await getStoredSpotifyToken();
    const mode = await getSpotifyMode();

    const connected = !!token || mode === "free";
    setIsSpotifyConnected(!!token);
  }

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
      params: { isSpotifyConnected: isSpotifyConnected.toString() },
    });
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
            TuneTrack
          </ThemedText>
        </View>

        <View style={styles.bottomContainer}>
          <AppButton
            style={styles.menuButton}
            title={t("index_read_rules")}
            onPress={handleReadRules}
          />
          {isSpotifyConnected ? (
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    height: "100%",
    width: "100%",
  },
  logoText: {
    fontSize: 60,
    color: "#fff",
    textAlign: "center",
    lineHeight: 60,
    textShadowColor: "#ff009d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    width: "100%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  menuButton: {
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 10,
  },
});
