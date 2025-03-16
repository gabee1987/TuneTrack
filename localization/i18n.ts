import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translations
import en from "@/localization/locales/en.json";
import hu from "@/localization/locales/hu.json";

// Get the default device language
const defaultLocale = Localization.getLocales()[0]?.languageCode || "en";

// Load translations
const resources = { en: { translation: en }, hu: { translation: hu } };

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Custom `t()` function for simpler import
export const t = (key: string, options?: any) => i18n.t(key, options);

// Function to set locale
export async function setLocale(lang: string) {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem("userLocale", lang);
}

// Function to load saved language
export async function initLocale() {
  const savedLocale = await AsyncStorage.getItem("userLocale");
  if (savedLocale) {
    await i18n.changeLanguage(savedLocale);
  }
}

export default i18n;
