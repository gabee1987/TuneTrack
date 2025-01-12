import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type RenderBubbleProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  size: SharedValue<number>;
};

const RenderBubble = ({ x, y, size }: RenderBubbleProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
  }));

  return <Animated.View style={[styles.bubble, animatedStyle]} />;
};

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    opacity: 0.7,
  },
});

export default RenderBubble;
