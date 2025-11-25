import { StyleSheet } from "react-native";
import { getQrResultColors } from "../screenColors";
import { borders, radii } from "../designTokens";
import { ThemeMode } from "@/design/tokens/theme";

const createQrResultStyles = (mode: ThemeMode) => {
  const qrResultColors = getQrResultColors(mode);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: qrResultColors.backdrop,
      paddingTop: 70,
      paddingHorizontal: 24,
      paddingBottom: 28,
      justifyContent: "space-between",
    },
    statusBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
      flexDirection: "row",
      justifyContent: "flex-end",
      zIndex: 10,
    },
    closeButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
      gap: 18,
      marginTop: 30,
    },
    songInfoWrapper: {
      width: "100%",
      overflow: "hidden",
      borderRadius: radii.card,
    },
    songInfoCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: qrResultColors.songInfoCardBackground,
      borderRadius: radii.card,
      borderWidth: borders.hairline,
      borderColor: qrResultColors.songInfoCardBorder,
      padding: 20,
      gap: 16,
    },
    songArt: {
      width: 86,
      height: 86,
      borderRadius: radii.md,
    },
    songArtPlaceholder: {
      width: 86,
      height: 86,
      borderRadius: radii.md,
      backgroundColor: qrResultColors.songArtPlaceholder,
      alignItems: "center",
      justifyContent: "center",
    },
    songTextBlock: {
      flex: 1,
      gap: 4,
    },
    songTitle: {
      color: qrResultColors.songTitle,
      fontSize: 20,
      fontWeight: "700",
    },
    songArtists: {
      color: qrResultColors.songArtists,
      fontSize: 15,
    },
    songMeta: {
      color: qrResultColors.songMeta,
      fontSize: 13,
    },
    songBadge: {
      marginTop: 8,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radii.badge,
      backgroundColor: qrResultColors.songBadgeBackground,
    },
    songBadgeText: {
      color: qrResultColors.songBadgeText,
      fontSize: 11,
      letterSpacing: 0.4,
    },
    actionStack: {
      width: "100%",
      gap: 12,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radii.card,
      borderWidth: borders.hairline,
      borderColor: qrResultColors.actionButtonBorder,
      backgroundColor: qrResultColors.actionButtonBackground,
      paddingVertical: 16,
      paddingHorizontal: 20,
      minHeight: 56,
      width: "100%",
    },
    actionButtonSecondary: {
      backgroundColor: qrResultColors.actionButtonSecondaryBackground,
      borderColor: qrResultColors.actionButtonSecondaryBorder,
    },
    actionButtonGhost: {
      backgroundColor: "transparent",
      borderColor: qrResultColors.actionButtonGhostBorder,
    },
    actionButtonDisabled: {
      opacity: 0.4,
    },
    actionButtonIcon: {
      marginRight: 10,
    },
    actionButtonIconText: {
      fontSize: 18,
    },
    actionButtonLabel: {
      color: qrResultColors.actionButtonLabel,
      fontWeight: "600",
      letterSpacing: 0.3,
    },
    actionButtonLabelSecondary: {
      color: qrResultColors.actionButtonLabelSecondary,
    },
    footer: {
      alignItems: "center",
      width: "100%",
      gap: 10,
      marginTop: 12,
    },
    nextScanHint: {
      color: qrResultColors.nextScanHint,
      fontSize: 13,
      letterSpacing: 0.2,
    },
  });
};

export default createQrResultStyles;
