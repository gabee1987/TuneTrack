import { StyleSheet } from "react-native";
import { getSettingsColors } from "../screenColors";
import { borders, radii } from "../designTokens";
import { ThemeMode } from "@/design/tokens/theme";

const createSettingsStyles = (mode: ThemeMode) => {
  const colors = getSettingsColors(mode);
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
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
    logoContainer: {
      marginBottom: 30,
      alignItems: "center",
    },
    title: {
      fontSize: 36,
      lineHeight: 46,
      textAlign: "center",
      textShadowColor: colors.titleShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
    },
    menuButton: {
      width: "70%",
      marginBottom: 20,
    },
    sectionStack: {
      width: "100%",
      alignItems: "center",
      marginTop: 10,
      gap: 12,
    },
    sectionCard: {
      width: "85%",
      alignItems: "center",
    },
  });
};

export default createSettingsStyles;
