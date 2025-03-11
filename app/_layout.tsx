import AnimatedBackground from "@/components/AnimatedBackground";
import { storeSpotifyTokenFromUrl } from "@/services/spotifyAuthService";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ThemeProvider } from "@/themes/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  // Add a state to track splash screen visibility
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setAppReady(true); // Mark the app as ready after fonts load
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      console.log("Deep link detected:", event.url);
      if (event.url.includes("access_token=")) {
        await storeSpotifyTokenFromUrl(event.url);
        router.replace("/");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  // Only render UI when fonts are loaded
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
