import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "@/localization/LanguageContext";

const { width } = Dimensions.get("window");

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: "en", name: "English" },
    { code: "hu", name: "Magyar" },
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
            <Ionicons name="close-circle-outline" size={36} color="white" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "#3535357d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  flatList: {
    flexGrow: 1,
    padding: 20,
    alignItems: "stretch",
    width: width,
  },
  languageButton: {
    width: "70%",
    alignSelf: "center",
  },
  selectedLanguage: {
    backgroundColor: "#4CAF50", // Green highlight for selected language
  },
  buttonContainer: {
    paddingBottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    width: "70%",
  },
});
