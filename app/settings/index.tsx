import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const handleChangeSpotifyMode = () => {
    router.push("/settings/spotify-mode");
  };

  const handleLanguageChange = () => {
    console.log("Future language change functionality");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Ionicons name="close-circle-outline" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <ThemedText type="title" style={styles.title}>
            Settings
          </ThemedText>
        </View>
      </View>

      <AppButton
        style={styles.menuButton}
        title="Spotify mód módosítása"
        onPress={handleChangeSpotifyMode}
      />
      <AppButton
        style={styles.menuButton}
        title="Változtatás a nyelven"
        onPress={handleLanguageChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    color: "#fff",
  },
  menuButton: {
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 20,
  },
});
