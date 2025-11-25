import { ThemeMode } from "@/design/tokens/theme";

type ButtonPalette = {
  background: string;
  border: string;
  text: string;
};

const paletteMap: Record<ThemeMode, ButtonPalette> = {
  light: {
    background: "#ffffff",
    border: "rgba(31, 35, 55, 0.12)",
    text: "#22263d",
  },
  dark: {
    background: "rgba(10, 13, 23, 0.9)",
    border: "rgba(125, 255, 203, 0.4)",
    text: "#f8f9ff",
  },
};

export const getAppButtonPalette = (mode: ThemeMode) => paletteMap[mode];

