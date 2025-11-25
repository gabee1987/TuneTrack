import { StyleSheet } from "react-native";

const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    marginBottom: 30,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "rgba(14, 14, 20, 0.78)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  controlButtonIcon: {
    marginRight: 10,
  },
  controlButtonText: {
    color: "#f8f9ff",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  scanFrame: {
    width: "70%",
    aspectRatio: 1,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "rgba(125, 255, 203, 0.9)",
    backgroundColor: "rgba(6, 10, 18, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    overflow: "hidden",
  },
  scanFrameInner: {
    position: "absolute",
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(125, 255, 203, 0.35)",
  },
  overlayContent: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: "15%",
    alignItems: "center",
  },
  overlayText: {
    color: "#f4fffe",
    fontSize: 16,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default cameraStyles;
