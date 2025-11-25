export const palette = {
  neonMint: "#7dffcb",
  neonMintSoft: "rgba(125, 255, 203, 0.35)",
  neonMintBold: "rgba(125, 255, 203, 0.9)",
  midnight: "#060a12",
  charcoal: "#0e0e14",
  obsidian: "#151718",
  onyx: "#11181C",
  slate: "#687076",
  graphite: "#9BA1A6",
  snow: "#f8f9ff",
  mist: "#f4fffe",
  accentPink: "#ff9a9e",
  accentPeach: "#fad0c4",
} as const;

export const colorRoles = {
  light: {
    text: palette.onyx,
    background: palette.snow,
    tint: palette.accentPink,
    icon: "#6d7684",
    tabIconDefault: "#6d7684",
    tabIconSelected: palette.accentPink,
  },
  dark: {
    text: palette.mist,
    background: palette.obsidian,
    tint: palette.accentPeach,
    icon: palette.graphite,
    tabIconDefault: palette.graphite,
    tabIconSelected: palette.accentPeach,
  },
} as const;

export const themeTokens = {
  light: {
    cardBackground: "rgba(255, 255, 255, 0.92)",
    cardBorder: "rgba(6, 10, 18, 0.08)",
    mutedText: "rgba(16, 18, 28, 0.65)",
    pillTrack: "rgba(6, 10, 18, 0.05)",
    pillBorder: "rgba(6, 10, 18, 0.08)",
    pillActiveBackground: "rgba(125, 255, 203, 0.22)",
    pillActiveBorder: "rgba(125, 255, 203, 0.4)",
    pillActiveText: palette.charcoal,
    pillInactiveText: "rgba(21, 24, 33, 0.7)",
    pillShadow: "rgba(15, 18, 25, 0.15)",
    pillCaptionText: "rgba(21, 24, 33, 0.65)",
    closeButtonIcon: palette.onyx,
  },
  dark: {
    cardBackground: "rgba(9, 12, 22, 0.82)",
    cardBorder: "rgba(255, 255, 255, 0.08)",
    mutedText: "rgba(235, 244, 255, 0.72)",
    pillTrack: "rgba(255, 255, 255, 0.05)",
    pillBorder: "rgba(255, 255, 255, 0.1)",
    pillActiveBackground: "rgba(125, 255, 203, 0.2)",
    pillActiveBorder: "rgba(125, 255, 203, 0.45)",
    pillActiveText: palette.mist,
    pillInactiveText: "rgba(231, 240, 255, 0.7)",
    pillShadow: "rgba(0, 0, 0, 0.4)",
    pillCaptionText: "rgba(231, 240, 255, 0.72)",
    closeButtonIcon: palette.mist,
  },
} as const;

export const appTheme = {
  palette,
  colors: {
    primary: palette.accentPink,
    secondary: palette.accentPeach,
    background: palette.charcoal,
    text: palette.snow,
    accent: palette.neonMint,
  },
  fonts: {
    default: "PoppinsRegular",
    semiBold: "PoppinsSemiBold",
    bold: "PoppinsBold",
    title: "NeonLux",
  },
} as const;

export type ThemeMode = keyof typeof colorRoles;
export type ThemeColorName = keyof typeof colorRoles.light &
  keyof typeof colorRoles.dark;
export type ThemeTokens = typeof themeTokens.light | typeof themeTokens.dark;
