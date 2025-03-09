import AnimatedBackground from "@/components/AnimatedBackground";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Linking, View } from "react-native";
import "react-native-reanimated";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log("Deep link detected:", event.url);
    };

    // Event listener pattern
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Cleanup function (removes listener on component unmount)
    return () => {
      subscription.remove();
    };
  }, []);

  return (
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
      </Stack>
    </View>
  );
}
