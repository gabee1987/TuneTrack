import React, { useMemo } from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useAppTheme } from "@/design/theme/ThemeProvider";
import { createRuleCardStyles } from "@/styles/components/ruleCardStyles";
import { getGameRulesColors } from "@/styles/screenColors";

interface RuleCardProps {
  title: string;
  content: string[];
}

/**
 * A reusable card component for displaying game rules.
 */
export default function RuleCard({ title, content }: RuleCardProps) {
  const { mode } = useAppTheme();
  const styles = useMemo(() => createRuleCardStyles(mode), [mode]);
  const lightColors = useMemo(() => getGameRulesColors("light"), []);
  const darkColors = useMemo(() => getGameRulesColors("dark"), []);

  return (
    <View style={styles.cardContainer}>
      <ThemedText
        type="title"
        style={styles.cardTitle}
        lightColor={lightColors.cardTitle}
        darkColor={darkColors.cardTitle}
      >
        {title}
      </ThemedText>
      {content.map((paragraph, index) => (
        <ThemedText
          type="default"
          key={index}
          style={styles.cardText}
          lightColor={lightColors.cardText}
          darkColor={darkColors.cardText}
        >
          {paragraph}
        </ThemedText>
      ))}
    </View>
  );
}
