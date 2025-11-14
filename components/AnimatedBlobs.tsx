// components/AnimatedBlurredBlobs.tsx
import React, { useEffect, useMemo } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Svg, { Defs, Filter, FeGaussianBlur, Circle } from "react-native-svg";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Define several color sets for our background animation
const COLOR_SETS = [
  ["#ff8c42", "#f3d250", "#ff616f", "#a3e4db"],
  ["#8ac6d1", "#ffaaa7", "#ff8c94", "#d6a2e8"],
  ["#ffd166", "#06d6a0", "#118ab2", "#ef476f"],
  ["#f72585", "#7209b7", "#3a0ca3", "#4cc9f0"],
];

const BLOB_COUNT = 3;
const BLOB_MIN_SIZE = 300;
const BLOB_MAX_SIZE = 500;

// Create an animated version of the SVG Circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedBlobProps = {
  fill: string;
};

function AnimatedBlob({ fill }: AnimatedBlobProps) {
  const initialMetrics = useMemo(
    () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: BLOB_MIN_SIZE + Math.random() * (BLOB_MAX_SIZE - BLOB_MIN_SIZE),
      durationX: 30000 + Math.random() * 10000,
      durationY: 30000 + Math.random() * 10000,
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
        BLOB_MIN_SIZE + Math.random() * (BLOB_MAX_SIZE - BLOB_MIN_SIZE),
        { duration: durationSize, easing: Easing.linear }
      ),
      -1,
      true
    );
  }, [durationX, durationY, durationSize, size, x, y]);

  // Animate the Circle's properties
  const animatedProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value,
    r: size.value / 2,
  }));

  return <AnimatedCircle animatedProps={animatedProps} fill={fill} />;
}

export default function AnimatedBlurredBlobs() {
  // Pick a random color set on mount
  const colorSet = useMemo(
    () => COLOR_SETS[Math.floor(Math.random() * COLOR_SETS.length)],
    []
  );

  // Animate the background color progress
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 30000, easing: Easing.linear }),
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
      {/* Animated background color */}
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]} />

      {/* Render the SVG with animated, blurred blobs */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <Filter id="blur" x="0" y="0" width="200%" height="200%">
            <FeGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </Filter>
        </Defs>
        {Array.from({ length: BLOB_COUNT }).map((_, index) => (
          <AnimatedBlob key={index} fill={colorSet[index % colorSet.length]} />
        ))}
      </Svg>

      {/* Overlay a BlurView on top of the SVG */}
      <BlurView style={StyleSheet.absoluteFill} intensity={80} tint="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
