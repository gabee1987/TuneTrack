import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the "X" icon

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function BackButton({ onPress, style }: BackButtonProps) {
  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={onPress}>
      <Ionicons name="close-circle" size={32} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});
