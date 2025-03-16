import React, { createContext, useState, useEffect, ReactNode } from "react";
import { initLocale, setLocale } from "@/localization/i18n";
import i18n from "@/localization/i18n";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: i18n.language,
  setLanguage: async () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>(i18n.language);

  useEffect(() => {
    async function loadLocale() {
      await initLocale();
      setLanguageState(i18n.language);
    }
    loadLocale();
  }, []);

  const changeLanguage = async (lang: string) => {
    await setLocale(lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
