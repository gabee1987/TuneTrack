import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { playSpotifyTrack } from "@/services/spotifyPlaybackService";
import { ThemedText } from "@/components/ThemedText";

export default function QrResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Ensure qrData is a string (if multiple values, use the first one)
  const qrData = Array.isArray(params.qrData)
    ? params.qrData[0]
    : params.qrData || "";

  // Set up pan responder for swipe gesture
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
      if (qrData.startsWith("spotify:track:")) {
        playSpotifyTrack(qrData);
      } else if (qrData.includes("open.spotify.com/track/")) {
        const trackId = extractTrackIdFromUrl(qrData);
        if (trackId) {
          playSpotifyTrack(`spotify:track:${trackId}`);
        }
      } else {
        Alert.alert("QR Code", "Not recognized as a Spotify track URI");
      }
    } else {
      Alert.alert("Error", "No Spotify URI found in QR Code.");
    }
  }, [qrData]);

  function extractTrackIdFromUrl(url: string): string | null {
    const match = url.match(/\/track\/([A-Za-z0-9]+)/);
    return match ? match[1] : null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>Vissza</ThemedText>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.swipeButton,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      >
        <ThemedText style={styles.swipeButtonText}>
          Húzd félre a következő kártya beolvasásához
        </ThemedText>
      </Animated.View>
      <ThemedText style={styles.qrDataText}>QR Code Data: {qrData}</ThemedText>
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
