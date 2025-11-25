import { ThemeMode } from "@/design/tokens/theme";

type ModeMap<T> = Record<ThemeMode, T>;

const cameraColorMap: ModeMap<{
  permissionText: string;
  controlButtonBackground: string;
  controlButtonBorder: string;
  controlButtonShadow: string;
  controlButtonText: string;
  scanFrameBorder: string;
  scanFrameBackground: string;
  scanFrameShadow: string;
  scanFrameInnerBorder: string;
  overlayText: string;
  overlayTextShadow: string;
}> = {
  light: {
    permissionText: "#5a6072",
    controlButtonBackground: "rgba(255, 255, 255, 0.82)",
    controlButtonBorder: "rgba(111, 202, 189, 0.75)",
    controlButtonShadow: "rgba(108, 123, 156, 0.35)",
    controlButtonText: "#1f2333",
    scanFrameBorder: "rgba(111, 202, 189, 0.95)",
    scanFrameBackground: "rgba(228, 247, 243, 0.75)",
    scanFrameShadow: "rgba(78, 94, 134, 0.3)",
    scanFrameInnerBorder: "rgba(111, 202, 189, 0.45)",
    overlayText: "#1d2030",
    overlayTextShadow: "rgba(255, 255, 255, 0.5)",
  },
  dark: {
    permissionText: "#d5dae9",
    controlButtonBackground: "rgba(15, 17, 28, 0.85)",
    controlButtonBorder: "rgba(125, 255, 203, 0.6)",
    controlButtonShadow: "rgba(0, 0, 0, 0.6)",
    controlButtonText: "#f8f9ff",
    scanFrameBorder: "rgba(125, 255, 203, 0.92)",
    scanFrameBackground: "rgba(6, 10, 18, 0.32)",
    scanFrameShadow: "rgba(0, 0, 0, 0.7)",
    scanFrameInnerBorder: "rgba(125, 255, 203, 0.35)",
    overlayText: "#f4fffe",
    overlayTextShadow: "rgba(0, 0, 0, 0.4)",
  },
};

const gameRulesColorMap: ModeMap<{
  headerText: string;
  headerShadow: string;
  cardBackground: string;
  cardBorder: string;
  cardTitle: string;
  cardText: string;
  cardShadow: string;
}> = {
  light: {
    headerText: "#1f2233",
    headerShadow: "rgba(149, 125, 168, 0.5)",
    cardBackground: "rgba(255, 255, 255, 0.95)",
    cardBorder: "rgba(51, 82, 114, 0.2)",
    cardTitle: "#1f2333",
    cardText: "#2a2d3f",
    cardShadow: "rgba(111, 202, 189, 0.25)",
  },
  dark: {
    headerText: "#ffffff",
    headerShadow: "#3535357d",
    cardBackground: "rgba(6, 10, 18, 0.85)",
    cardBorder: "rgba(125, 255, 203, 0.35)",
    cardTitle: "#f4fffe",
    cardText: "#e7f0ff",
    cardShadow: "rgba(125, 255, 203, 0.2)",
  },
};

const homeColorMap: ModeMap<{
  logoText: string;
  logoShadow: string;
}> = {
  light: {
    logoText: "#20243a",
    logoShadow: "rgba(255, 153, 209, 0.65)",
  },
  dark: {
    logoText: "#ffffff",
    logoShadow: "#ff009d",
  },
};

const languageColorMap: ModeMap<{
  titleText: string;
  titleShadow: string;
  selectedBackground: string;
}> = {
  light: {
    titleText: "#1f2233",
    titleShadow: "rgba(150, 135, 197, 0.5)",
    selectedBackground: "#6bd6a3",
  },
  dark: {
    titleText: "#ffffff",
    titleShadow: "#3535357d",
    selectedBackground: "#4CAF50",
  },
};

const loadingColorMap: ModeMap<{
  background: string;
  logoText: string;
}> = {
  light: {
    background: "#f4f6ff",
    logoText: "#1e2134",
  },
  dark: {
    background: "#222222",
    logoText: "#ffffff",
  },
};

const qrResultColorMap: ModeMap<{
  backdrop: string;
  songInfoCardBackground: string;
  songInfoCardBorder: string;
  songArtPlaceholder: string;
  songTitle: string;
  songArtists: string;
  songMeta: string;
  songBadgeBackground: string;
  songBadgeText: string;
  actionButtonBorder: string;
  actionButtonBackground: string;
  actionButtonSecondaryBackground: string;
  actionButtonSecondaryBorder: string;
  actionButtonGhostBorder: string;
  actionButtonLabel: string;
  actionButtonLabelSecondary: string;
  nextScanHint: string;
}> = {
  light: {
    backdrop: "#f8fbff",
    songInfoCardBackground: "#ffffff",
    songInfoCardBorder: "rgba(111, 202, 189, 0.35)",
    songArtPlaceholder: "rgba(111, 202, 189, 0.2)",
    songTitle: "#1e2136",
    songArtists: "#5c6784",
    songMeta: "#8b95ad",
    songBadgeBackground: "rgba(111, 202, 189, 0.3)",
    songBadgeText: "#327e6f",
    actionButtonBorder: "rgba(51, 82, 114, 0.2)",
    actionButtonBackground: "rgba(255, 255, 255, 0.9)",
    actionButtonSecondaryBackground: "rgba(83, 87, 111, 0.08)",
    actionButtonSecondaryBorder: "rgba(83, 87, 111, 0.2)",
    actionButtonGhostBorder: "rgba(83, 87, 111, 0.35)",
    actionButtonLabel: "#1f2233",
    actionButtonLabelSecondary: "#4c5674",
    nextScanHint: "#6d7899",
  },
  dark: {
    backdrop: "rgba(4, 7, 15, 0.96)",
    songInfoCardBackground: "rgba(15, 19, 32, 0.9)",
    songInfoCardBorder: "rgba(125, 255, 203, 0.3)",
    songArtPlaceholder: "rgba(125, 255, 203, 0.14)",
    songTitle: "#f5fbff",
    songArtists: "#c5d9e2",
    songMeta: "#8aa5b5",
    songBadgeBackground: "rgba(125, 255, 203, 0.16)",
    songBadgeText: "#7dffcb",
    actionButtonBorder: "rgba(125, 255, 203, 0.35)",
    actionButtonBackground: "rgba(5, 8, 18, 0.95)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
    actionButtonSecondaryBorder: "rgba(255, 255, 255, 0.18)",
    actionButtonGhostBorder: "rgba(255, 255, 255, 0.4)",
    actionButtonLabel: "#f4fffe",
    actionButtonLabelSecondary: "#dbe4f0",
    nextScanHint: "#baced9",
  },
};

const settingsColorMap: ModeMap<{
  titleShadow: string;
}> = {
  light: {
    titleShadow: "rgba(152, 132, 188, 0.45)",
  },
  dark: {
    titleShadow: "#3535357d",
  },
};

const spotifyConnectColorMap: ModeMap<{
  title: string;
  titleShadow: string;
  subtitle: string;
}> = {
  light: {
    title: "#1f2233",
    titleShadow: "rgba(150, 135, 197, 0.5)",
    subtitle: "#4b4f5f",
  },
  dark: {
    title: "#ffffff",
    titleShadow: "#3535357d",
    subtitle: "#000000",
  },
};

const spotifyModeColorMap: ModeMap<{
  title: string;
  titleShadow: string;
}> = {
  light: {
    title: "#1f2233",
    titleShadow: "rgba(150, 135, 197, 0.5)",
  },
  dark: {
    title: "#ffffff",
    titleShadow: "#3535357d",
  },
};

const warningColorMap: ModeMap<{
  backButtonBackground: string;
  textLight: string;
  okButtonBackground: string;
}> = {
  light: {
    backButtonBackground: "rgba(91, 101, 130, 0.2)",
    textLight: "#21263a",
    okButtonBackground: "#ffa6a6",
  },
  dark: {
    backButtonBackground: "#00000080",
    textLight: "#ffffff",
    okButtonBackground: "#ff6666",
  },
};

export const getCameraColors = (mode: ThemeMode) => cameraColorMap[mode];
export const getGameRulesColors = (mode: ThemeMode) => gameRulesColorMap[mode];
export const getHomeColors = (mode: ThemeMode) => homeColorMap[mode];
export const getLanguageSettingsColors = (mode: ThemeMode) =>
  languageColorMap[mode];
export const getLoadingScreenColors = (mode: ThemeMode) =>
  loadingColorMap[mode];
export const getQrResultColors = (mode: ThemeMode) => qrResultColorMap[mode];
export const getSettingsColors = (mode: ThemeMode) => settingsColorMap[mode];
export const getSpotifyConnectColors = (mode: ThemeMode) =>
  spotifyConnectColorMap[mode];
export const getSpotifyModeColors = (mode: ThemeMode) =>
  spotifyModeColorMap[mode];
export const getWarningColors = (mode: ThemeMode) => warningColorMap[mode];
