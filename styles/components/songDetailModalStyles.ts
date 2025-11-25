import { StyleSheet } from "react-native";
import { radii, spacing, borders } from "@/styles/designTokens";
import { ThemeMode } from "@/design/tokens/theme";
import { getSongDetailModalColors } from "../screenColors";

export const createSongDetailModalStyles = (mode: ThemeMode) => {
  const colors = getSongDetailModalColors(mode);
  return StyleSheet.create({
    detailsScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    detailsHeader: {
      paddingTop: spacing.sm,
      paddingHorizontal: spacing.sm,
      alignItems: "flex-end",
      borderBottomWidth: borders.hairline,
      borderColor: colors.headerBorder,
    },
    detailsCloseButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    detailsContent: {
      alignItems: "center",
      paddingHorizontal: spacing.jumbo,
      paddingBottom: spacing.hero,
      gap: spacing.xl,
    },
    detailsHero: {
      width: "100%",
      alignItems: "center",
      gap: spacing.md,
    },
    detailsArtWrapper: {},
    detailsArt: {
      width: 300,
      height: 300,
      borderRadius: radii.lg,
      marginTop: spacing.jumbo,
      borderWidth: borders.hairline,
      borderColor: colors.artBorder,
    },
    detailsArtPlaceholder: {
      width: 300,
      height: 300,
      borderRadius: radii.xl,
      backgroundColor: colors.artPlaceholderBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    detailsTitle: {
      fontSize: 26,
      fontWeight: "700",
      textAlign: "center",
    },
    detailsSubtitle: {
      fontSize: 18,
      textAlign: "center",
    },
    detailsAlbum: {
      fontSize: 15,
      textAlign: "center",
    },
    modalTagRow: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    modalTag: {
      backgroundColor: colors.tagBackground,
      borderRadius: radii.lg,
      paddingHorizontal: spacing.mdPlus,
      paddingVertical: spacing.xs,
    },
    modalTagText: {
      fontWeight: "600",
      fontSize: 12,
      letterSpacing: 0.4,
    },
    detailsStatsRow: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      gap: spacing.md,
    },
    detailStat: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.statBackground,
      borderRadius: radii.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.mdPlus,
      borderWidth: borders.hairline,
      borderColor: colors.statBorder,
    },
    detailStatValue: {
      fontSize: 16,
      fontWeight: "600",
    },
    detailStatLabel: {
      fontSize: 11,
      marginTop: spacing.micro,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    detailsSection: {
      width: "100%",
      borderRadius: radii.lg,
      backgroundColor: colors.sectionBackground,
      borderWidth: borders.hairline,
      borderColor: colors.sectionBorder,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      gap: spacing.mdPlus,
    },
    detailsSectionLabel: {
      fontSize: 13,
      letterSpacing: 0.6,
      textTransform: "uppercase",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    infoIcon: {
      padding: spacing.xs,
      borderRadius: radii.lg,
      backgroundColor: colors.infoIconBackground,
    },
    infoTextWrapper: {
      flex: 1,
      gap: spacing.micro,
    },
    infoLabel: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "600",
    },
    modalSpotifyButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.spotifyButtonBackground,
      borderRadius: radii.pill,
      paddingHorizontal: spacing.jumbo,
      paddingVertical: spacing.mdPlus,
    },
    modalSpotifyIcon: {
      marginRight: spacing.sm,
      fontSize: 18,
    },
    modalSpotifyLabel: {
      fontWeight: "700",
      letterSpacing: 0.2,
    },
  });
};

