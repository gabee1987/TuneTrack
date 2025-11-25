import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/design/theme/ThemeProvider";

const gradientPresets = {
  light: ["#fdf6ff", "#f4fbff", "#f2fdf9"],
  dark: ["#090c16", "#12162c", "#1b1f3a"],
};

export default function GradientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useAppTheme();
  const colors = useMemo(() => gradientPresets[mode], [mode]);
  return (
    <LinearGradient colors={colors} style={styles.gradientBackground}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
