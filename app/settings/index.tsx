import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/ui/GradientBackground";

export default function SettingsScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeSpotifyMode = () => {
    router.push("/settings/spotify-mode");
  };

  const handleLanguageChange = () => {
    // Show the "Coming Soon" modal when the language change button is pressed.
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Beallítások
          </ThemedText>
        </View>

        <View style={styles.container}>
          <AppButton
            style={styles.menuButton}
            title="Spotify mód módosítása"
            onPress={handleChangeSpotifyMode}
          />
          <AppButton
            style={styles.menuButton}
            title="Nyelv módosítása"
            onPress={handleLanguageChange}
          />
        </View>

        {/* Modal for language change - Coming Soon */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={modalStyles.modalOverlay}>
            <View style={modalStyles.modalContent}>
              <ThemedText type="defaultSemiBold" style={modalStyles.modalTitle}>
                Hamarosan!
              </ThemedText>
              <AppButton title="Vissza" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  menuButton: {
    width: "70%",
    marginBottom: 20,
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 28,
    marginBottom: 20,
    color: "#fff",
    lineHeight: 30,
  },
});
