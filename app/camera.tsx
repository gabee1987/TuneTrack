import React, { useState, useRef, useMemo } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import createCameraStyles from "../styles/screens/cameraStyles";
import { useAppTheme } from "@/design/theme/ThemeProvider";

function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back"); // Default to back camera
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const router = useRouter();
  const { t } = useTranslation();
  const lastScannedRef = useRef<string | null>(null);
  const isNavigatingRef = useRef(false);
  const { mode } = useAppTheme();
  const styles = useMemo(() => createCameraStyles(mode), [mode]);

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
      <View style={styles.loadingContainer}>
        <ThemedText type="default">
          {t("camera_loading_permissions")}
        </ThemedText>
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
          <View style={styles.scanFrame}>
            <View style={styles.scanFrameInner} />
          </View>
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
