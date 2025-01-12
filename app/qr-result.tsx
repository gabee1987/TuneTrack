import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function QrResultScreen() {
  const router = useRouter();
  const { qrData } = useLocalSearchParams(); // 'qrData' is a string if passed as param
  const [isPlaying, setIsPlaying] = useState(true);

  // Basic swipe handling
  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        // On swipe, go back to the camera screen
        router.back();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Vissza</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pauseIconContainer}
        onPress={handlePausePlay}
      >
        <Text style={styles.pauseIcon}>{isPlaying ? "⏸" : "▶"}</Text>
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
  backButtonText: {
    color: "#fff",
  },
  pauseIconContainer: {
    marginTop: 100,
  },
  pauseIcon: {
    fontSize: 64,
    color: "#fff",
  },
  swipeButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  swipeButtonText: {
    fontWeight: "bold",
  },
  qrDataText: {
    position: "absolute",
    bottom: 150,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
  },
});
