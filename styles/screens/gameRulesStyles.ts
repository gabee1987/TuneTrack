import { StyleSheet } from "react-native";
import { getGameRulesColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const createGameRulesStyles = (mode: ThemeMode) => {
  const colors = getGameRulesColors(mode);
  return StyleSheet.create({
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
      color: colors.headerText,
      textAlign: "center",
      textShadowColor: colors.headerShadow,
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
};

export default createGameRulesStyles;
