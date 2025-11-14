import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";

const WAVE_COUNT = 3;

function useLoopingAnimation(duration: number) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue, duration]);

  return animatedValue;
}

function WaveRing({ index }: { index: number }) {
  const progress = useLoopingAnimation(2600 + index * 400);
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8 + index * 0.2],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.waveRing,
        {
          transform: [{ scale }],
          opacity,
          borderColor: WAVE_COLORS[index % WAVE_COLORS.length],
        },
      ]}
    />
  );
}

const WAVE_COLORS = ["rgba(125,255,203,0.45)", "rgba(123,198,255,0.35)"];

export default function AudioBackdrop() {
  const { animationsEnabled } = useAnimationSettings();
  const rings = useMemo(() => Array.from({ length: WAVE_COUNT }), []);

  if (!animationsEnabled) {
    return <View pointerEvents="none" style={styles.staticBackdrop} />;
  }

  return (
    <View pointerEvents="none" style={styles.container}>
      {rings.map((_, index) => (
        <WaveRing key={`wave-${index}`} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.65,
  },
  staticBackdrop: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    backgroundColor: "rgba(15, 19, 32, 0.45)",
  },
  waveRing: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    borderWidth: 2,
  },
});

