// app/spotify-connect.tsx
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import BackButton from "@/components/BackButton";

export default function SpotifyConnectionScreen() {
  const router = useRouter();

  const handleConnect = () => {
    // Suppose user logs into Spotify...
    Alert.alert("Connected!", "You are now connected to Spotify", [
      {
        text: "OK",
        onPress: () => {
          // After connecting, let's jump to the camera, or just go back:
          router.push("/camera");
        },
      },
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />
      <Text style={styles.title}>Csatlakozás a Spotify-hoz</Text>
      <Text style={styles.subtitle}>
        A továbblépés előtt telepítsd fel a Spotify alkalmazás legfrissebb
        változatát erre az eszközre
      </Text>

      <AppButton title="Csatlakozás a Spotify-hoz" onPress={handleConnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
