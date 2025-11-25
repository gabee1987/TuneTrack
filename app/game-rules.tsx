// app/game-rules.tsx
import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import AppButton from "@/components/AppButton";
import RuleCard from "@/components/RuleCard";
import { router } from "expo-router";
import GradientBackground from "@/components/ui/GradientBackground";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import createGameRulesStyles from "../styles/screens/gameRulesStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

function GameRulesScreen() {
  const { t } = useTranslation();
  const { mode, tokens } = useAppTheme();
  const styles = useMemo(() => createGameRulesStyles(mode), [mode]);

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons
              name="close-circle-outline"
              size={36}
              color={tokens.closeButtonIcon}
            />
          </TouchableOpacity>
        </View>

        {/* A scrollable view for all the rule cards */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={styles.headerTitle}>
            {t("game_rules_header")}
          </ThemedText>

          {/* INTRO / BEVEZETŐ */}
          <RuleCard
            title={t("game_rules_intro_title")}
            content={[
              t("game_rules_intro_content"),
              t("game_rules_intro_additional"),
            ]}
          />

          {/* NEHÉZSÉGI SZINTEK */}
          <RuleCard
            title={t("game_rules_difficulty_title")}
            content={[
              t("game_rules_difficulty_instant"),
              t("game_rules_difficulty_original"),
              t("game_rules_difficulty_pro"),
              t("game_rules_difficulty_expert"),
              t("game_rules_difficulty_cooperative"),
            ]}
          />

          {/* ORIGINAL JÁTÉKMENET */}
          <RuleCard
            title={t("game_rules_original_title")}
            content={[
              t("game_rules_original_step1"),
              t("game_rules_original_step2"),
              t("game_rules_original_step3"),
              t("game_rules_original_step4"),
              t("game_rules_original_step5"),
            ]}
          />

          {/* PRO */}
          <RuleCard
            title={t("game_rules_pro_title")}
            content={[
              t("game_rules_pro_content1"),
              t("game_rules_pro_content2"),
              t("game_rules_pro_content3"),
            ]}
          />

          {/* EXPERT */}
          <RuleCard
            title={t("game_rules_expert_title")}
            content={[
              t("game_rules_expert_content1"),
              t("game_rules_expert_content2"),
              t("game_rules_expert_content3"),
            ]}
          />

          {/* KOOPERATÍV */}
          <RuleCard
            title={t("game_rules_cooperative_title")}
            content={[
              t("game_rules_cooperative_content1"),
              t("game_rules_cooperative_content2"),
              t("game_rules_cooperative_content3"),
            ]}
          />

          {/* TUNETRACK TOKENS */}
          <RuleCard
            title={t("game_rules_tokens_title")}
            content={[
              t("game_rules_tokens_intro"),
              t("game_rules_tokens_own_turn_title"),
              t("game_rules_tokens_own_turn"),
              t("game_rules_tokens_opponent_turn_title"),
              t("game_rules_tokens_opponent_turn"),
              t("game_rules_tokens_opponent_note"),
              t("game_rules_tokens_anytime_title"),
              t("game_rules_tokens_anytime"),
              t("game_rules_tokens_earning_title"),
              t("game_rules_tokens_earning"),
            ]}
          />

          {/* BACK BUTTON or some navigation button */}
          <View style={styles.footer}>
            <AppButton
              style={styles.menuButton}
              title={t("button_generic_back")}
              onPress={handleBack}
            />
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}

export default GameRulesScreen;

// -- STYLES --
