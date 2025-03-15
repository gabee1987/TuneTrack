// components/ThemedText.tsx
import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { theme } from "@/themes/theme";

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
    fontFamily: theme.fonts.default,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: theme.fonts.semiBold,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: theme.fonts.title,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    fontFamily: theme.fonts.default,
    color: "#0a7ea4",
  },
});
