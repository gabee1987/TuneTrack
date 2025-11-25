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
    icon: palette.slate,
    tabIconDefault: palette.slate,
    tabIconSelected: palette.accentPink,
  },
  dark: {
    text: palette.snow,
    background: palette.obsidian,
    tint: palette.accentPeach,
    icon: palette.graphite,
    tabIconDefault: palette.graphite,
    tabIconSelected: palette.accentPeach,
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
export type ThemeColorName = keyof typeof colorRoles.light & keyof typeof colorRoles.dark;

