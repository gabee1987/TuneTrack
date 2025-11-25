import { StyleSheet } from "react-native";
import { getSpotifyConnectColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const createSpotifyConnectStyles = (mode: ThemeMode) => {
  const colors = getSpotifyConnectColors(mode);
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
    logoContainer: {
      marginBottom: 30,
      alignItems: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 36,
      lineHeight: 46,
      textAlign: "center",
      color: colors.title,
      textShadowColor: colors.titleShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 14,
      color: colors.subtitle,
      textAlign: "center",
      marginBottom: 30,
    },
    menuButton: {
      paddingHorizontal: 10,
      width: "70%",
      marginBottom: 20,
    },
  });
};

export default createSpotifyConnectStyles;
