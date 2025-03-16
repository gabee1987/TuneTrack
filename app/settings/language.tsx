// app/settings/language.tsx
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";
import { LanguageContext } from "@/localization/LanguageContext";
import GradientBackground from "@/components/ui/GradientBackground";
import { t } from "@/localization/i18n";

function LanguageSelectionScreen() {
  const router = useRouter();
  const { language, setLanguage } = useContext(LanguageContext);

  const selectLanguage = async (lang: string) => {
    await setLanguage(lang);
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <ThemedText type="title" style={styles.title}>
          {t("language_selection")}
        </ThemedText>
        <AppButton title="English" onPress={() => selectLanguage("en")} />
        <AppButton title="Magyar" onPress={() => selectLanguage("hu")} />
      </GradientBackground>
    </View>
  );
}

export default LanguageSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: "#fff",
  },
});
