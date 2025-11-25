import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
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
    padding: 20,
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
    color: "#fff",
    textAlign: "center",
    lineHeight: 60,
    textShadowColor: "#ff009d",
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

export default homeStyles;
