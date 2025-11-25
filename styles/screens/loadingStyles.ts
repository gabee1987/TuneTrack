import { StyleSheet } from "react-native";
import { getLoadingScreenColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const createLoadingStyles = (mode: ThemeMode) => {
  const colors = getLoadingScreenColors(mode);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      marginTop: 10,
      color: colors.logoText,
      fontSize: 24,
      fontWeight: "bold",
    },
  });
};

export default createLoadingStyles;
