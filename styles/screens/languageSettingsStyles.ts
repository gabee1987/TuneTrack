import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const languageSettingsStyles = StyleSheet.create({
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
    color: "#fff",
    textShadowColor: "#3535357d",
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
    backgroundColor: "#4CAF50",
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

export default languageSettingsStyles;
