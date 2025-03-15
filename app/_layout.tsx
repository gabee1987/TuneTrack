// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { theme } from "@/themes/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <ThemeProvider>
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
          <Stack.Screen name="settings" />
          <Stack.Screen name="camera" />
          <Stack.Screen name="qr-result" />
          <Stack.Screen name="warning" />
          <Stack.Screen name="game-rules" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
