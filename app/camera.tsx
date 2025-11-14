import React, { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back"); // Default to back camera
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const router = useRouter();
  const { t } = useTranslation();

  // Handle barcode scanning
  const handleBarcodeScanned = (scanningResult: {
    data: string;
    type: string;
  }) => {
    console.log(
      `Scanned Data: ${scanningResult.data}, Type: ${scanningResult.type}`
    );
    router.push({
      pathname: "/qr-result",
      params: { qrData: scanningResult.data },
    });
  };

  // If permissions are loading
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText type="default">Loading permissions...</ThemedText>
      </View>
    );
  }

  // If permissions are not granted
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText type="default" style={styles.permissionText}>
          {t("camera_permission_text")}
        </ThemedText>
        <Button
          title={t("camera_grant_permission")}
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        // autofocus={isRefreshing ? "off" : "on"}
        autofocus="on"
        focusable={true}
        style={styles.camera}
        facing={facing} // Front or back camera
        onBarcodeScanned={handleBarcodeScanned} // Barcode scanning callback
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }} // Only scan QR codes
      >
        <View style={styles.overlay} pointerEvents="none">
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <View style={styles.overlayContent}>
            <ThemedText style={styles.overlayText}>
              {t(
                "camera_align_instruction",
                "Align the QR code inside the frame"
              )}
            </ThemedText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() =>
              setFacing((prev) => (prev === "back" ? "front" : "back"))
            }
          >
            <Ionicons
              name="camera-reverse-outline"
              size={20}
              color="#7dffcb"
              style={styles.controlButtonIcon}
            />
            <ThemedText style={styles.controlButtonText}>
              {t("camera_flip_camera")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
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
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    bottom: "25%",
    borderRadius: 24,
  },
  overlayContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -50,
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
  corner: {
    position: "absolute",
    width: 46,
    height: 46,
    borderColor: "#7dffcb",
    borderWidth: 4,
    borderRadius: 12,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});
