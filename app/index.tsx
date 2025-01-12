import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";

export default function MainScreen() {
  const router = useRouter();
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  const handleReadRules = () => {
    console.log("Read rules pressed");
  };

  const handleSpotifyConnect = () => {
    router.push({
      pathname: "/spotify-connect",
      params: { onConnect: "true" },
    });
  };

  const handleStartGame = () => {
    router.push("/warning");
  };

  const handleSettingsPress = () => {
    router.push("/settings?isSpotifyConnected=true");
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <View style={styles.topRow}>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.buttonText}>i</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>TuneTrack</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Text style={styles.buttonText}>⚙</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <AppButton
          title="A játékszabály elolvasása"
          onPress={handleReadRules}
        />
        {isSpotifyConnected ? (
          <AppButton title="Játék indítása" onPress={handleStartGame} />
        ) : (
          <AppButton
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
  },
  topRow: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  infoButton: {
    width: 30,
    height: 30,
    backgroundColor: "#00000080",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButton: {
    width: 30,
    height: 30,
    backgroundColor: "#00000080",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
