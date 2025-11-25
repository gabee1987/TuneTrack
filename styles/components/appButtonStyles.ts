import { StyleSheet } from "react-native";
import { borders, radii, shadowPresets } from "@/styles/designTokens";

export const createAppButtonStyles = (palette: {
  background: string;
  border: string;
  text: string;
}) =>
  StyleSheet.create({
    button: {
      marginVertical: 10,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: radii.pill,
      borderWidth: borders.hairline,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.background,
      borderColor: palette.border,
      ...shadowPresets.soft,
    },
    buttonText: {
      fontSize: 16,
      color: palette.text,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonTextDisabled: {
      opacity: 0.7,
    },
  });

