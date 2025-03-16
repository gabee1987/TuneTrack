// app/game-rules.tsx
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppButton from "@/components/AppButton";
import RuleCard from "@/components/RuleCard";
import { router } from "expo-router";
import GradientBackground from "@/components/ui/GradientBackground";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { t } from "@/localization/i18n";

function GameRulesScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
    textShadowColor: "#3535357d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    width: "100%",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  menuButton: {
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 20,
  },
});
