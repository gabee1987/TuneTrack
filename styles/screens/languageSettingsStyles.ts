import { StyleSheet, Dimensions } from "react-native";
import { getLanguageSettingsColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const { width } = Dimensions.get("window");

const createLanguageSettingsStyles = (mode: ThemeMode) => {
  const colors = getLanguageSettingsColors(mode);
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
    },
    statusBar: {
      width: "100%",
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
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
      color: colors.titleText,
      textShadowColor: colors.titleShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
    },
    flatList: {
      flexGrow: 1,
      padding: 20,
      alignItems: "stretch",
      width,
    },
    languageButton: {
      width: "70%",
      alignSelf: "center",
    },
    selectedLanguage: {
      backgroundColor: colors.selectedBackground,
    },
    buttonContainer: {
      paddingBottom: 20,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    menuButton: {
      width: "70%",
    },
  });
};

export default createLanguageSettingsStyles;
