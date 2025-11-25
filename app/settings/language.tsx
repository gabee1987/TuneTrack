import React, { useContext, useMemo } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "@/localization/LanguageContext";
import createLanguageSettingsStyles from "../../styles/screens/languageSettingsStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const { mode, tokens } = useAppTheme();
  const styles = useMemo(() => createLanguageSettingsStyles(mode), [mode]);

  const languages = [
    { code: "en", name: t("language_name_english", "English") },
    { code: "hu", name: t("language_name_hungarian", "Magyar") },
  ];

  const handleLanguageChange = async (lang: string) => {
    await setLanguage(lang);
    router.back(); // Go back to settings after selecting a language
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons
              name="close-circle-outline"
              size={36}
              color={tokens.closeButtonIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {t("settings_language")}
          </ThemedText>
        </View>

        <FlatList
          contentContainerStyle={styles.flatList}
          data={languages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <AppButton
              title={item.name}
              onPress={() => handleLanguageChange(item.code)}
              style={{
                ...styles.languageButton,
                ...(item.code === language ? styles.selectedLanguage : {}),
              }}
            />
          )}
        />
      </GradientBackground>
    </View>
  );
}
