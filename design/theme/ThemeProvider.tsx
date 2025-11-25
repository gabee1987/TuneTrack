import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import {
  ThemeMode,
  appTheme,
  colorRoles,
  palette,
  themeTokens,
  ThemeTokens,
} from "../tokens/theme";

type ThemeContextValue = {
  mode: ThemeMode;
  colors: (typeof colorRoles)[ThemeMode];
  tokens: ThemeTokens;
  palette: typeof palette;
  fonts: typeof appTheme.fonts;
  setMode: (mode: ThemeMode) => void;
};

const STORAGE_KEY = "tunetrack_theme_mode";

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  colors: colorRoles.dark,
  tokens: themeTokens.dark,
  palette,
  fonts: appTheme.fonts,
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemPreference = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(
    (systemPreference as ThemeMode) ?? "dark"
  );

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted) {
          return;
        }
        if (storedMode === "light" || storedMode === "dark") {
          setModeState(storedMode);
          return;
        }
        if (systemPreference === "light" || systemPreference === "dark") {
          setModeState(systemPreference);
        }
      } catch (error) {
        console.warn("Failed to load theme preference", error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [systemPreference]);

  const handleSetMode = useCallback((nextMode: ThemeMode) => {
    setModeState((current) => {
      if (current === nextMode) {
        return current;
      }
      return nextMode;
    });
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch((error) =>
      console.warn("Failed to persist theme mode", error)
    );
  }, []);

  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      colors: colorRoles[mode],
      tokens: themeTokens[mode],
      palette,
      fonts: appTheme.fonts,
      setMode: handleSetMode,
    };
  }, [handleSetMode, mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

