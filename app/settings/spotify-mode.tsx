// app/settings/spotify-mode.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function SpotifyModeScreen() {
  const router = useRouter();

  const handleFree = () => {
    // Logic: set app mode to "Spotify Free" here
    router.back();
  };

  const handlePremium = () => {
    // Logic: set app mode to "Spotify Premium" here
    router.back();
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

      <ThemedText type="title" style={styles.title}>
        Spotify Premium?
      </ThemedText>
      <ThemedText type="default" style={styles.subtitle}>
        Válaszd a Spotify Free-t, ha nincs fizetős Spotify fiókod. Más esetben a
        még jobb élmény érdekében válaszd a Spotify Premium-ot. További
        tájékoztatásért lépj be a spotify.com-ra
      </ThemedText>

      <AppButton
        title="Spotify Free"
        onPress={handleFree}
        style={styles.appButton}
      />
      <AppButton
        title="Spotify Premium"
        onPress={handlePremium}
        style={styles.appButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    marginHorizontal: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  appButton: {
    width: "80%",
    marginVertical: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
