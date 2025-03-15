// components/AnimatedBlurredBlobs.tsx
import React, { useEffect, useRef, useMemo } from "react";
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

type BlobType = {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  size: Animated.SharedValue<number>;
};

type AnimatedBlobProps = {
  blob: BlobType;
  fill: string;
};

function AnimatedBlob({ blob, fill }: AnimatedBlobProps) {
  // Animate the Circle's properties
  const animatedProps = useAnimatedProps(() => ({
    cx: blob.x.value,
    cy: blob.y.value,
    r: blob.size.value / 2,
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

  // Create a stable array of blob objects with shared values for position and size
  const blobsRef = useRef<BlobType[]>(
    Array.from({ length: BLOB_COUNT }).map(() => ({
      x: useSharedValue(Math.random() * width),
      y: useSharedValue(Math.random() * height),
      size: useSharedValue(
        BLOB_MIN_SIZE + Math.random() * (BLOB_MAX_SIZE - BLOB_MIN_SIZE)
      ),
    }))
  );

  // Animate each blob's position and size
  useEffect(() => {
    blobsRef.current.forEach((blob) => {
      const durX = 30000 + Math.random() * 10000;
      const durY = 30000 + Math.random() * 10000;
      const durSize = 20000 + Math.random() * 10000;
      blob.x.value = withRepeat(
        withTiming(Math.random() * width, {
          duration: durX,
          easing: Easing.linear,
        }),
        -1,
        true
      );
      blob.y.value = withRepeat(
        withTiming(Math.random() * height, {
          duration: durY,
          easing: Easing.linear,
        }),
        -1,
        true
      );
      blob.size.value = withRepeat(
        withTiming(
          BLOB_MIN_SIZE + Math.random() * (BLOB_MAX_SIZE - BLOB_MIN_SIZE),
          { duration: durSize, easing: Easing.linear }
        ),
        -1,
        true
      );
    });
  }, []);

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
        {blobsRef.current.map((blob, index) => (
          <AnimatedBlob
            key={index}
            blob={blob}
            fill={colorSet[index % colorSet.length]}
          />
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
