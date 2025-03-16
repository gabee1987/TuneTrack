import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // Navigate to the main screen (app/index.tsx -> '/')
      router.replace("/");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <ThemedText style={styles.logoText}>TuneTrack</ThemedText>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
