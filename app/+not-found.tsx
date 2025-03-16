import React from "react"; // Added explicit import
import { Link, router, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { t } from "@/localization/i18n";
import AppButton from "@/components/AppButton";

function NotFoundScreen() {
  function goHome() {
    router.push("/");
  }
  return (
    <>
      <Stack.Screen />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t("not_found_message")}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
          <AppButton title={t("not_found_link")} onPress={goHome} />
        </Link>
      </ThemedView>
    </>
  );
}

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
