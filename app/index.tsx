import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { getStoredSpotifyToken } from "@/services/spotifyAuthService";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function MainScreen() {
  const router = useRouter();
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  useEffect(() => {
    checkSpotifyConnection();
  }, []);

  async function checkSpotifyConnection() {
    const token = await getStoredSpotifyToken();
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
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <ThemedText type="title" style={styles.logoText}>
            TuneTrack
          </ThemedText>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <AppButton
          style={styles.menuButton}
          title="A játékszabály elolvasása"
          onPress={handleReadRules}
        />
        {isSpotifyConnected ? (
          <AppButton
            style={styles.menuButton}
            title="Játék indítása"
            onPress={handleStartGame}
          />
        ) : (
          <AppButton
            style={styles.menuButton}
            title="Csatlakozás a Spotify-hoz"
            onPress={handleSpotifyConnect}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  topRow: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
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
