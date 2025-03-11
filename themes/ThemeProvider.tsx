import React, { createContext, useContext } from "react";
import { theme } from "./theme";

const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
