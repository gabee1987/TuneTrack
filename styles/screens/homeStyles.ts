import { StyleSheet } from "react-native";
import { getHomeColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const createHomeStyles = (mode: ThemeMode) => {
  const colors = getHomeColors(mode);
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      position: "relative",
      alignItems: "center",
    },
    statusBar: {
      width: "100%",
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    settingsButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    logoContainer: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
      height: "100%",
      width: "100%",
    },
    logoText: {
      fontSize: 60,
      color: colors.logoText,
      textAlign: "center",
      lineHeight: 60,
      textShadowColor: colors.logoShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
      width: "100%",
    },
    bottomContainer: {
      position: "absolute",
      bottom: 60,
      width: "100%",
      alignItems: "center",
    },
    menuButton: {
      paddingHorizontal: 10,
      width: "70%",
      marginBottom: 10,
    },
  });
};

export default createHomeStyles;
