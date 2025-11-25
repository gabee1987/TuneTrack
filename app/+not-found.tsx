import React from "react"; // Added explicit import
import { Link, router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AppButton from "@/components/AppButton";
import notFoundStyles from "../styles/screens/notFoundStyles";

function NotFoundScreen() {
  const { t } = useTranslation();

  function goHome() {
    router.push("/");
  }
  return (
    <>
      <Stack.Screen />
      <ThemedView style={notFoundStyles.container}>
        <ThemedText type="title">{t("not_found_title")}</ThemedText>
        <ThemedText type="subtitle">{t("not_found_message")}</ThemedText>
        <Link href="/" style={notFoundStyles.link}>
          <AppButton title={t("not_found_link")} onPress={goHome} />
        </Link>
      </ThemedView>
    </>
  );
}

export default NotFoundScreen;
