import React, { useState, useRef } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import cameraStyles from "../styles/screens/cameraStyles";

function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back"); // Default to back camera
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const router = useRouter();
  const { t } = useTranslation();
  const lastScannedRef = useRef<string | null>(null);
  const isNavigatingRef = useRef(false);

  // Handle barcode scanning
  const handleBarcodeScanned = (scanningResult: {
    data: string;
    type: string;
  }) => {
    // Prevent multiple scans of the same code
    if (
      isNavigatingRef.current ||
      lastScannedRef.current === scanningResult.data
    ) {
      return;
    }

    console.log(
      `Scanned Data: ${scanningResult.data}, Type: ${scanningResult.type}`
    );
    lastScannedRef.current = scanningResult.data;
    isNavigatingRef.current = true;

    router.push({
      pathname: "/qr-result",
      params: { qrData: scanningResult.data },
    });
  };

  // If permissions are loading
  if (!permission) {
    return (
      <View style={cameraStyles.loadingContainer}>
        <ThemedText type="default">
          {t("camera_loading_permissions")}
        </ThemedText>
      </View>
    );
  }

  // If permissions are not granted
  if (!permission.granted) {
    return (
      <View style={cameraStyles.container}>
        <ThemedText type="default" style={cameraStyles.permissionText}>
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
    <View style={cameraStyles.container}>
      <CameraView
        // autofocus={isRefreshing ? "off" : "on"}
        autofocus="on"
        focusable={true}
        style={cameraStyles.camera}
        facing={facing} // Front or back camera
        onBarcodeScanned={handleBarcodeScanned} // Barcode scanning callback
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }} // Only scan QR codes
      >
        <View style={cameraStyles.overlay} pointerEvents="none">
          <View style={cameraStyles.scanFrame}>
            <View style={cameraStyles.scanFrameInner} />
          </View>
          <View style={cameraStyles.overlayContent}>
            <ThemedText style={cameraStyles.overlayText}>
              {t(
                "camera_align_instruction",
                "Align the QR code inside the frame"
              )}
            </ThemedText>
          </View>
        </View>
        <View style={cameraStyles.buttonContainer}>
          <TouchableOpacity
            style={cameraStyles.controlButton}
            onPress={() =>
              setFacing((prev) => (prev === "back" ? "front" : "back"))
            }
          >
            <Ionicons
              name="camera-reverse-outline"
              size={20}
              color="#7dffcb"
              style={cameraStyles.controlButtonIcon}
            />
            <ThemedText style={cameraStyles.controlButtonText}>
              {t("camera_flip_camera")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default CameraScreen;
