// components/DynamicEqualizer.tsx
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

// Configurable parameters for the equalizer:
const CONFIG = {
  BAR_COUNT: 14, // Number of vertical bars
  BASE_HEIGHT: 50, // Base height of each bar (bars are scaled from this height)
  BAR_WIDTH: 8, // Width of each bar
  BAR_GAP: 4, // Horizontal gap between bars
  ANIMATION_DURATION: 1600, // Duration for a full cycle (in ms)
  AMPLITUDE: 0.8, // Scale amplitude (bars will scale from 1 - AMPLITUDE to 1 + AMPLITUDE)
  MIN_COLOR: "#00ff9d", // Color when the sine value is at minimum (-1)
  MAX_COLOR: "#77ffcb", // Color when the sine value is at maximum (1)
};

// Generate an array of random phase offsets for each bar:
const phases = Array.from({ length: CONFIG.BAR_COUNT }).map(
  () => Math.random() * 2 * Math.PI
);

type EqualizerBarProps = {
  phase: number;
  time: Animated.SharedValue<number>;
};

function EqualizerBar({ phase, time }: EqualizerBarProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const sineValue = Math.sin(time.value + phase);
    const scaleY = 1 + CONFIG.AMPLITUDE * sineValue;
    const backgroundColor = interpolateColor(
      sineValue,
      [-1, 1],
      [CONFIG.MIN_COLOR, CONFIG.MAX_COLOR]
    );
    return {
      transform: [{ scaleY }],
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.bar, animatedStyle]} />;
}

export default function DynamicEqualizer() {
  // Shared time value that loops from 0 to 2π infinitely.
  const time = useSharedValue(0);

  useEffect(() => {
    time.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: CONFIG.ANIMATION_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false // no reset needed, sine is naturally periodic
    );
  }, [time]);

  return (
    <View style={styles.container}>
      {phases.map((phase, index) => (
        <EqualizerBar key={index} phase={phase} time={time} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Center bars vertically so scaling is symmetric
    justifyContent: "center",
  },
  bar: {
    width: CONFIG.BAR_WIDTH,
    height: CONFIG.BASE_HEIGHT, // Each bar starts with a fixed base height
    marginHorizontal: CONFIG.BAR_GAP / 2,
    borderRadius: 4,
  },
});
