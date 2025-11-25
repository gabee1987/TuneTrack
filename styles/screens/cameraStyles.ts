import { StyleSheet } from "react-native";
import { getCameraColors } from "../screenColors";
import { borders, radii, shadowPresets } from "../designTokens";
import { ThemeMode } from "@/design/tokens/theme";

const createCameraStyles = (mode: ThemeMode) => {
  const cameraColors = getCameraColors(mode);
  return StyleSheet.create({
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
      color: cameraColors.permissionText,
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
      backgroundColor: cameraColors.controlButtonBackground,
      borderRadius: radii.pill,
      borderWidth: borders.hairline,
      borderColor: cameraColors.controlButtonBorder,
      shadowColor: cameraColors.controlButtonShadow,
      ...shadowPresets.soft,
    },
    controlButtonIcon: {
      marginRight: 10,
    },
    controlButtonText: {
      color: cameraColors.controlButtonText,
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
      borderRadius: radii.pill,
      borderWidth: borders.thick,
      borderColor: cameraColors.scanFrameBorder,
      backgroundColor: cameraColors.scanFrameBackground,
      shadowColor: cameraColors.scanFrameShadow,
      ...shadowPresets.deep,
      overflow: "hidden",
    },
    scanFrameInner: {
      position: "absolute",
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
      borderRadius: radii.lg,
      borderWidth: borders.thin,
      borderColor: cameraColors.scanFrameInnerBorder,
    },
    overlayContent: {
      position: "absolute",
      left: 32,
      right: 32,
      bottom: "15%",
      alignItems: "center",
    },
    overlayText: {
      color: cameraColors.overlayText,
      fontSize: 16,
      fontWeight: "500",
      textShadowColor: cameraColors.overlayTextShadow,
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
  });
};

export default createCameraStyles;
