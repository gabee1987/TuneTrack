import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { playSpotifyURI } from "@/services/spotifyService";

export default function QrResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Ensure qrData is a string
  const qrData = Array.isArray(params.qrData)
    ? params.qrData[0]
    : params.qrData || "";

  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        router.back();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (qrData) {
      playSpotifyURI(qrData);
    } else {
      Alert.alert("Error", "No Spotify URI found in QR Code.");
    }
  }, [qrData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Vissza</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.swipeButton,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.swipeButtonText}>
          Húzd félre a következő kártya beolvasásához
        </Text>
      </Animated.View>
      <Text style={styles.qrDataText}>QR Code Data: {qrData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 50,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  backButtonText: { color: "#fff" },
  swipeButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  swipeButtonText: { fontWeight: "bold" },
  qrDataText: {
    position: "absolute",
    bottom: 150,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
  },
});
