import React, { useMemo } from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useAppTheme } from "@/design/theme/ThemeProvider";
import { getAppButtonPalette } from "@/styles/components/appButtonTokens";
import { createAppButtonStyles } from "@/styles/components/appButtonStyles";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}: AppButtonProps) {
  const { mode } = useAppTheme();
  const palette = useMemo(() => getAppButtonPalette(mode), [mode]);
  const styles = useMemo(() => createAppButtonStyles(palette), [palette]);

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
