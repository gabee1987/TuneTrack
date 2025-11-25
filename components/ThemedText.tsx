// components/ThemedText.tsx
import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { appTheme, palette } from "@/design/tokens/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: appTheme.fonts.default,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: appTheme.fonts.semiBold,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: appTheme.fonts.title,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: appTheme.fonts.bold,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    fontFamily: appTheme.fonts.default,
    color: palette.accentPink,
  },
});
