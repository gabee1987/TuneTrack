import React, { useContext } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "@/localization/LanguageContext";
import languageSettingsStyles from "../../styles/screens/languageSettingsStyles";

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

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
    <View style={languageSettingsStyles.container}>
      <GradientBackground>
        <View style={languageSettingsStyles.statusBar}>
          <TouchableOpacity
            style={languageSettingsStyles.closeButton}
            onPress={handleBack}
          >
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={languageSettingsStyles.logoContainer}>
          <ThemedText
            type="defaultSemiBold"
            style={languageSettingsStyles.title}
          >
            {t("settings_language")}
          </ThemedText>
        </View>

        <FlatList
          contentContainerStyle={languageSettingsStyles.flatList}
          data={languages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <AppButton
              title={item.name}
              onPress={() => handleLanguageChange(item.code)}
              style={{
                ...languageSettingsStyles.languageButton,
                ...(item.code === language
                  ? languageSettingsStyles.selectedLanguage
                  : {}),
              }}
            />
          )}
        />
      </GradientBackground>
    </View>
  );
}
