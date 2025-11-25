import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import loadingStyles from "../styles/screens/loadingStyles";

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
    <View style={loadingStyles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <ThemedText style={loadingStyles.logoText}>{t("index_logo")}</ThemedText>
    </View>
  );
}

export default LoadingScreen;
