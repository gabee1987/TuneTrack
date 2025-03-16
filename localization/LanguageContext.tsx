// localization/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { initLocale, setLocale, t } from "@/localization/i18n";
import i18n from "@/localization/i18n";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: (i18n as any).locale,
  setLanguage: async () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>((i18n as any).locale);

  useEffect(() => {
    async function loadLocale() {
      await initLocale();
      setLanguageState((i18n as any).locale);
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
