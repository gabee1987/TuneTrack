import { StyleSheet } from "react-native";
import { radii, spacing, shadowPresets } from "@/styles/designTokens";
import { ThemeMode } from "@/design/tokens/theme";
import { getGameRulesColors } from "../screenColors";

export const createRuleCardStyles = (mode: ThemeMode) => {
  const colors = getGameRulesColors(mode);
  return StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: radii.card,
      borderColor: colors.cardBorder,
      borderWidth: 1,
      padding: spacing.lg,
      marginBottom: spacing.jumbo,
      ...shadowPresets.soft,
      shadowColor: colors.cardShadow,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: spacing.sm,
    },
    cardText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: spacing.xs,
    },
  });
};
