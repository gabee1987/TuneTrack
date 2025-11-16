import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

function LoadingScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <ThemedText style={styles.logoText}>{t("index_logo")}</ThemedText>
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
