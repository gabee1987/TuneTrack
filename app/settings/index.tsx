import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import BackButton from "@/components/BackButton";

export default function SettingsScreen() {
  const router = useRouter();

  const handleChangeSpotifyMode = () => {
    router.push("/settings/spotify-mode");
  };

  const handleLanguageChange = () => {
    console.log("Future language change functionality");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />
      <Text style={styles.title}>Settings</Text>

      <AppButton
        title="Spotify mód módosítása"
        onPress={handleChangeSpotifyMode}
      />
      <AppButton title="Változtatás a nyelven" onPress={handleLanguageChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
  },
});
