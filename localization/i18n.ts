// localization/i18n.ts
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load your translations
const en = require("@/localization/locales/en.json");
const hu = require("@/localization/locales/hu.json");

// Use type assertions to bypass outdated types:
(i18n as any).translations = { en, hu };
(i18n as any).fallbacks = true;

const defaultLocale = Localization.locale.split("-")[0] || "en";
(i18n as any).locale = defaultLocale;

// Export a helper function for translation
export const t = (key: string, config?: any) => (i18n as any).t(key, config);

// Function to change the locale and persist it
export async function setLocale(locale: string) {
  (i18n as any).locale = locale;
  await AsyncStorage.setItem("userLocale", locale);
}

// Function to initialize the locale from storage (if available)
export async function initLocale() {
  const storedLocale = await AsyncStorage.getItem("userLocale");
  if (storedLocale) {
    (i18n as any).locale = storedLocale;
  } else {
    (i18n as any).locale = defaultLocale;
  }
}

export default i18n;
