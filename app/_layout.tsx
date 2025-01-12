import AnimatedBackground from "@/components/AnimatedBackground";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedBackground />
      <Stack
        screenOptions={{
          headerShown: false, // Hides the default top navbar
          contentStyle: { backgroundColor: "transparent" }, // Ensures screens are transparent
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
