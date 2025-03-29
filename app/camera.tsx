import React, { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

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
        autofocus="on"
        focusable={true}
        style={styles.camera}
        facing={facing} // Front or back camera
        onBarcodeScanned={handleBarcodeScanned} // Barcode scanning callback
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }} // Only scan QR codes
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() =>
              setFacing((prev) => (prev === "back" ? "front" : "back"))
            }
          >
            <ThemedText style={styles.toggleButtonText}>
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
  toggleButton: {
    padding: 10,
    backgroundColor: "#00000080",
    borderRadius: 10,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
