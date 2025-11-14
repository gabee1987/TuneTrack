// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { LanguageProvider } from "@/localization/LanguageContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimationSettingsProvider } from "@/contexts/AnimationSettingsContext";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  // Load local fonts from assets/fonts
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    NeonLux: require("../assets/fonts/Neonlux-Demo.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <LanguageProvider>
          <AnimationSettingsProvider>
            <View style={{ flex: 1 }}>
              <AnimatedBackground />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" },
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="spotify-connect" />
                <Stack.Screen name="settings/index" />
                <Stack.Screen name="camera" />
                <Stack.Screen name="qr-result" />
                <Stack.Screen name="warning" />
                <Stack.Screen name="game-rules" />
              </Stack>
            </View>
          </AnimationSettingsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
