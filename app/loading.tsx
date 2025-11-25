import React, { useEffect, useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import createLoadingStyles from "../styles/screens/loadingStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

function LoadingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { mode } = useAppTheme();
  const styles = useMemo(() => createLoadingStyles(mode), [mode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7dffcb" />
      <ThemedText style={styles.logoText}>{t("index_logo")}</ThemedText>
    </View>
  );
}

export default LoadingScreen;
