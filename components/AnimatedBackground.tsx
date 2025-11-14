import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolateColor,
} from "react-native-reanimated";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";

// Screen size
const { width, height } = Dimensions.get("window");

// New vibrant, friendly color sets
const COLOR_SETS = [
  ["#ff8c42", "#f3d250", "#ff616f", "#a3e4db"], // Vibrant warm colors
  ["#8ac6d1", "#ffaaa7", "#ff8c94", "#d6a2e8"], // Soft pastels
  ["#ffd166", "#06d6a0", "#118ab2", "#ef476f"], // Fun and friendly
  ["#f72585", "#7209b7", "#3a0ca3", "#4cc9f0"], // Bold and striking
];

// Configurable constants
const BUBBLE_COUNT = 4; // Allow fewer bubbles
const BUBBLE_MIN_SIZE = 100; // Larger circles for a more noticeable effect
const BUBBLE_MAX_SIZE = 800; // Max size increased for better bokeh effect

function AnimatedCircle() {
  const initialMetrics = useMemo(
    () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size:
        BUBBLE_MIN_SIZE + Math.random() * (BUBBLE_MAX_SIZE - BUBBLE_MIN_SIZE),
      durationX: 25000 + Math.random() * 10000,
      durationY: 25000 + Math.random() * 10000,
      durationSize: 20000 + Math.random() * 10000,
    }),
    []
  );

  const x = useSharedValue(initialMetrics.x);
  const y = useSharedValue(initialMetrics.y);
  const size = useSharedValue(initialMetrics.size);

  const { durationX, durationY, durationSize } = initialMetrics;

  useEffect(() => {
    x.value = withRepeat(
      withTiming(Math.random() * width, {
        duration: durationX,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    y.value = withRepeat(
      withTiming(Math.random() * height, {
        duration: durationY,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    size.value = withRepeat(
      withTiming(
        BUBBLE_MIN_SIZE + Math.random() * (BUBBLE_MAX_SIZE - BUBBLE_MIN_SIZE),
        { duration: durationSize, easing: Easing.linear }
      ),
      -1,
      true
    );
  }, [durationSize, durationX, durationY, x, y, size]);

  const circleStyle = useAnimatedStyle(() => ({
    left: x.value - size.value / 2,
    top: y.value - size.value / 2,
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
  }));

  return <Animated.View style={[styles.circle, circleStyle]} />;
}

export default function AnimatedBackground() {
  const { animationsEnabled } = useAnimationSettings();

  if (!animationsEnabled) {
    return <View style={[styles.container, styles.disabledBackground]} />;
  }

  // 1) Pick a random color set on mount
  const colorSet = useMemo(
    () => COLOR_SETS[Math.floor(Math.random() * COLOR_SETS.length)],
    []
  );

  // 2) Animate progress
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 20000, easing: Easing.linear }), // Slower transition
      -1,
      true
    );
  }, [progress]);

  const backgroundStyle = useAnimatedStyle(() => {
    const floatIndex = progress.value * (colorSet.length - 1);
    const idxStart = Math.floor(floatIndex);
    const idxEnd = Math.min(idxStart + 1, colorSet.length - 1);
    const localT = floatIndex - idxStart;

    const colorA = colorSet[idxStart];
    const colorB = colorSet[idxEnd];
    const currentColor = interpolateColor(
      localT,
      [0, 1],
      [colorA, colorB],
      "RGB"
    );

    return {
      backgroundColor: currentColor,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]} />
      {Array.from({ length: BUBBLE_COUNT }).map((_, index) => (
        <AnimatedCircle key={index} />
      ))}
      <BlurView style={styles.blurContainer} intensity={30} tint="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  disabledBackground: {
    backgroundColor: "#0f1320",
  },
  circle: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
