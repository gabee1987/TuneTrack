import { StyleSheet } from "react-native";
import { getSpotifyModeColors } from "../screenColors";
import { ThemeMode } from "@/design/tokens/theme";

const createSpotifyModeStyles = (mode: ThemeMode) => {
  const colors = getSpotifyModeColors(mode);
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
    title: {
      fontSize: 36,
      lineHeight: 46,
      textAlign: "center",
      color: colors.title,
      textShadowColor: colors.titleShadow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 16,
    },
    subtitle: {
      marginHorizontal: 30,
      textAlign: "center",
      marginBottom: 40,
    },
    appButton: {
      width: "70%",
      marginVertical: 10,
    },
    closeButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export default createSpotifyModeStyles;
