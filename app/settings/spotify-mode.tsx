// app/settings/spotify-mode.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import AppButton from "@/components/AppButton";

export default function SpotifyModeScreen() {
  const router = useRouter();

  const handleFree = () => {
    // Logic: set app mode to "Spotify Free" here
    router.back();
  };

  const handlePremium = () => {
    // Logic: set app mode to "Spotify Premium" here
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />
      <Text style={styles.title}>Spotify Premium?</Text>
      <Text style={styles.subtitle}>
        Válaszd a Spotify Free-t, ha nincs fizetős Spotify fiókod. Más esetben a
        még jobb élmény érdekében válaszd a Spotify Premium-ot. További
        tájékoztatásért lépj be a spotify.com-ra
      </Text>

      <AppButton
        title="Spotify Free"
        onPress={handleFree}
        style={styles.appButton}
      />
      <AppButton
        title="Spotify Premium"
        onPress={handlePremium}
        style={styles.appButton}
      />
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
    marginBottom: 20,
  },
  subtitle: {
    marginHorizontal: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  appButton: {
    width: "80%",
    marginVertical: 10,
  },
});
