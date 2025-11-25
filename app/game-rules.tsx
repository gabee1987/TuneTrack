// app/game-rules.tsx
import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import AppButton from "@/components/AppButton";
import RuleCard from "@/components/RuleCard";
import { router } from "expo-router";
import GradientBackground from "@/components/ui/GradientBackground";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import gameRulesStyles from "../styles/screens/gameRulesStyles";

function GameRulesScreen() {
  const { t } = useTranslation();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={gameRulesStyles.container}>
      <GradientBackground>
        <View style={gameRulesStyles.statusBar}>
          <TouchableOpacity
            style={gameRulesStyles.closeButton}
            onPress={handleBack}
          >
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        {/* A scrollable view for all the rule cards */}
        <ScrollView
          style={gameRulesStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={gameRulesStyles.headerTitle}>
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

          {/* BACK BUTTON or some navigation button */}
          <View style={gameRulesStyles.footer}>
            <AppButton
              style={gameRulesStyles.menuButton}
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
