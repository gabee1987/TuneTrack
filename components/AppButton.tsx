import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  style,
  textStyle,
}: AppButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "#ff009d",

    // Android Shadow
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
});
