import { StyleSheet } from "react-native";
import { getWarningColors } from "../screenColors";
import { radii } from "../designTokens";
import { ThemeMode } from "@/design/tokens/theme";

const createWarningStyles = (mode: ThemeMode) => {
  const colors = getWarningColors(mode);
  return StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      padding: 20,
      justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      top: 50,
      right: 20,
      backgroundColor: colors.backButtonBackground,
      padding: 10,
      borderRadius: radii.xs,
    },
    backButtonText: {
      color: colors.textLight,
    },
    warningTitle: {
      fontSize: 24,
      color: colors.textLight,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    warningText: {
      fontSize: 16,
      color: colors.textLight,
      textAlign: "center",
      marginHorizontal: 20,
      marginBottom: 40,
    },
    okButton: {
      backgroundColor: colors.okButtonBackground,
      borderRadius: radii.card,
      paddingVertical: 15,
      paddingHorizontal: 40,
      alignSelf: "center",
    },
    okButtonText: {
      color: colors.textLight,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
};

export default createWarningStyles;
