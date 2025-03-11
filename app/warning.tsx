// src/screens/WarnNetworkScreen.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedBackground from "../components/AnimatedBackground";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const WarnNetworkScreen = () => {
  const router = useRouter();

  const handleOk = () => {
    // Request camera permissions next
    router.push("/camera");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ThemedText style={styles.backButtonText}>Vissza</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={styles.warningTitle}>
        FIGYELEM!
      </ThemedText>
      <ThemedText style={styles.warningText}>
        A Tunetrack alkalmazás internet kapcsolatot igényel, hogy zenét
        streameljen az eszközödre. Bizonyosodj meg róla, hogy biztonságos Wi-Fi
        kapcsolatot használsz, hogy elkerüld a plusz költségek felszámítását a
        szolgáltatód részéről.
      </ThemedText>

      <TouchableOpacity style={styles.okButton} onPress={handleOk}>
        <ThemedText style={styles.okButtonText}>Értem</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default WarnNetworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
  },
  warningTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  warningText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  okButton: {
    backgroundColor: "#ff6666",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignSelf: "center",
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
