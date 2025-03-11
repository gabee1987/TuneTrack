import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LinearGradient
      colors={["#ff9a9e", "#fad0c4", "#fad0c4", "#fbc2eb"]}
      style={styles.gradientBackground}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
});
