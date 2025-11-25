import React, { createContext, useContext } from "react";
import { appTheme } from "../tokens/theme";

const ThemeContext = createContext(appTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={appTheme}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

