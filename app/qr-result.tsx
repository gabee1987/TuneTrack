// app/qr-result.tsx
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
import { Ionicons } from "@expo/vector-icons";
import EqualizerAnimation from "@/components/EqualizerAnimation";
import { t } from "@/localization/i18n";

function QrResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const qrData = Array.isArray(params.qrData)
    ? params.qrData[0]
    : params.qrData || "";

  // Set up swipe animation for the "next" gesture
  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dx) > 50) {
        router.push("/camera"); // Navigate to Camera screen for next scan
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

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Top-right back button */}
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Ionicons name="close-circle-outline" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>{<EqualizerAnimation />}</View>

      {/* Swipe instruction container */}
      <Animated.View
        style={[
          styles.swipeContainer,
          { transform: pan.getTranslateTransform() },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.swipeContent}>
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
          <ThemedText style={styles.swipeText}>
            {t("qr_result_swipe_instruction")}
          </ThemedText>
          <Ionicons name="chevron-forward" size={28} color="#ffffff" />
        </View>
      </Animated.View>
    </View>
  );
}

export default QrResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 50,
    alignItems: "center",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeContainer: {
    position: "absolute",
    bottom: 60,
    width: "60%",
    // backgroundColor: "#fff",
    // borderRadius: 50,
    paddingVertical: 15,
    alignItems: "center",
  },
  swipeContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  swipeText: {
    marginHorizontal: 10,
    color: "#ffffff",
  },
});
