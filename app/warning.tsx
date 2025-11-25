// src/screens/WarnNetworkScreen.tsx
import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import AnimatedBackground from "../components/AnimatedBackground";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import createWarningStyles from "../styles/screens/warningStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

function WarnNetworkScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { mode } = useAppTheme();
  const warningStyles = useMemo(() => createWarningStyles(mode), [mode]);

  const handleOk = () => {
    // Request camera permissions next
    router.push("/camera");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={warningStyles.container}>
      <AnimatedBackground />
      <TouchableOpacity style={warningStyles.backButton} onPress={handleBack}>
        <ThemedText style={warningStyles.backButtonText}>
          {t("button_generic_back")}
        </ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={warningStyles.warningTitle}>
        {t("warning_title")}
      </ThemedText>
      <ThemedText style={warningStyles.warningText}>
        {t("warning_text")}
      </ThemedText>

      <TouchableOpacity style={warningStyles.okButton} onPress={handleOk}>
        <ThemedText style={warningStyles.okButtonText}>
          {t("warning_ok")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

export default WarnNetworkScreen;
