import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

type AnimationSettingsContextValue = {
  animationsEnabled: boolean;
  loading: boolean;
  setAnimationsEnabled: (enabled: boolean) => Promise<void>;
  toggleAnimations: () => Promise<void>;
};

const STORAGE_KEY = "tunetrack_animations_enabled";

const AnimationSettingsContext = createContext<AnimationSettingsContextValue>({
  animationsEnabled: true,
  loading: true,
  setAnimationsEnabled: async () => {},
  toggleAnimations: async () => {},
});

export function AnimationSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animationsEnabled, setAnimationsEnabledState] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(STORAGE_KEY);
        if (storedValue === "disabled") {
          if (!cancelled) {
            setAnimationsEnabledState(false);
          }
        }
      } catch (error) {
        console.warn("Failed to load animation preference", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistPreference = useCallback(async (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    try {
      if (enabled) {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
      } else {
        await SecureStore.setItemAsync(STORAGE_KEY, "disabled");
      }
    } catch (error) {
      console.warn("Failed to persist animation preference", error);
    }
  }, []);

  const handleSetAnimationsEnabled = useCallback(
    async (enabled: boolean) => {
      if (enabled === animationsEnabled) {
        return;
      }
      await persistPreference(enabled);
    },
    [animationsEnabled, persistPreference]
  );

  const toggleAnimations = useCallback(async () => {
    await persistPreference(!animationsEnabled);
  }, [animationsEnabled, persistPreference]);

  const value = useMemo(
    () => ({
      animationsEnabled,
      loading,
      setAnimationsEnabled: handleSetAnimationsEnabled,
      toggleAnimations,
    }),
    [animationsEnabled, loading, handleSetAnimationsEnabled, toggleAnimations]
  );

  return (
    <AnimationSettingsContext.Provider value={value}>
      {children}
    </AnimationSettingsContext.Provider>
  );
}

export const useAnimationSettings = () => useContext(AnimationSettingsContext);

