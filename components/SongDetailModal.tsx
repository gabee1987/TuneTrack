import React from "react";
import type { ComponentProps } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { TFunction } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { SpotifyTrackDetails } from "@/modules/spotify/domain/SpotifyTrack";

type IoniconName =
  | Exclude<ComponentProps<typeof Ionicons>["name"], undefined>
  | "logo-spotify";

interface SongDetailModalProps {
  visible: boolean;
  onClose: () => void;
  trackDetails: SpotifyTrackDetails | null;
  trackUrl: string | null;
  explicitTag: string | null;
  albumYearLabel: string | null;
  releaseDateLabel: string | null;
  durationLabel: string | null;
  popularityLabel: string | null;
  trackPositionLabel: string | null;
  onOpenInSpotify: () => void;
  t: TFunction<"translation", undefined>;
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: IoniconName;
  label: string;
  value?: string | null;
}) => {
  if (!value) {
    return null;
  }
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon as ComponentProps<typeof Ionicons>["name"]}
        size={18}
        color="#7dffcb"
        style={styles.infoIcon}
      />
      <View style={styles.infoTextWrapper}>
        <ThemedText style={styles.infoLabel}>{label}</ThemedText>
        <ThemedText style={styles.infoValue}>{value}</ThemedText>
      </View>
    </View>
  );
};

const DetailStat = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  if (!value) {
    return null;
  }
  return (
    <View style={styles.detailStat}>
      <ThemedText style={styles.detailStatValue}>{value}</ThemedText>
      <ThemedText style={styles.detailStatLabel}>{label}</ThemedText>
    </View>
  );
};

export default function SongDetailModal({
  visible,
  onClose,
  trackDetails,
  trackUrl,
  explicitTag,
  albumYearLabel,
  releaseDateLabel,
  durationLabel,
  popularityLabel,
  trackPositionLabel,
  onOpenInSpotify,
  t,
}: SongDetailModalProps) {
  const hasQuickStats = Boolean(
    releaseDateLabel || durationLabel || popularityLabel
  );

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <View style={styles.detailsScreen}>
        <LinearGradient
          colors={["#04070f", "#0f1320", "#0b172d"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.detailsHeader}>
          <TouchableOpacity style={styles.detailsCloseButton} onPress={onClose}>
            <Ionicons name="close-circle-outline" size={36} color="#f4fffe" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.detailsHero}>
            <View style={styles.detailsArtWrapper}>
              {trackDetails?.albumArtUrl ? (
                <Image
                  source={{ uri: trackDetails.albumArtUrl }}
                  style={styles.detailsArt}
                />
              ) : (
                <View style={styles.detailsArtPlaceholder}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={84}
                    color="#7dffcb"
                  />
                </View>
              )}
            </View>
            {explicitTag ? (
              <View style={styles.modalTagRow}>
                <View style={styles.modalTag}>
                  <ThemedText style={styles.modalTagText}>
                    {explicitTag}
                  </ThemedText>
                </View>
              </View>
            ) : null}
            <ThemedText style={styles.detailsTitle}>
              {trackDetails?.name ||
                t("qr_result_details_title", "Spotify track")}
            </ThemedText>
            {trackDetails?.artistNames.length ? (
              <ThemedText style={styles.detailsSubtitle}>
                {trackDetails.artistNames.join(", ")}
              </ThemedText>
            ) : null}
            {albumYearLabel ? (
              <ThemedText style={styles.detailsAlbum}>
                {albumYearLabel}
              </ThemedText>
            ) : null}
          </View>

          {hasQuickStats ? (
            <View style={styles.detailsStatsRow}>
              <DetailStat
                label={t("qr_result_detail_release", "Release")}
                value={releaseDateLabel}
              />
              <DetailStat
                label={t("qr_result_detail_duration", "Duration")}
                value={durationLabel}
              />
              <DetailStat
                label={t("qr_result_detail_popularity", "Popularity")}
                value={popularityLabel}
              />
            </View>
          ) : null}

          <View style={styles.detailsSection}>
            <ThemedText style={styles.detailsSectionLabel}>
              {t("qr_result_detail_overview", "Overview")}
            </ThemedText>
            <InfoRow
              icon="disc-outline"
              label={t("qr_result_detail_album", "Album")}
              value={trackDetails?.albumName ?? null}
            />
            <InfoRow
              icon="musical-notes-outline"
              label={t("qr_result_detail_track_number", "Track")}
              value={trackPositionLabel}
            />
            <InfoRow
              icon="link-outline"
              label={t("qr_result_detail_link", "Spotify link")}
              value={trackUrl}
            />
          </View>

          <TouchableOpacity
            style={styles.modalSpotifyButton}
            onPress={onOpenInSpotify}
            disabled={!trackUrl}
            activeOpacity={0.9}
          >
            <Ionicons
              name={"logo-spotify" as ComponentProps<typeof Ionicons>["name"]}
              size={20}
              color="#0f1320"
              style={styles.modalSpotifyIcon}
            />
            <ThemedText style={styles.modalSpotifyLabel}>
              {t("qr_result_open_spotify_button", "Open in Spotify")}
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  detailsScreen: {
    flex: 1,
    backgroundColor: "#02040a",
  },
  detailsHeader: {
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.18)",
  },
  detailsCloseButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContent: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
    gap: 22,
  },
  detailsHero: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  detailsArtWrapper: {},
  detailsArt: {
    width: 300,
    height: 300,
    borderRadius: 26,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.18)",
  },
  detailsArtPlaceholder: {
    width: 300,
    height: 300,
    borderRadius: 36,
    backgroundColor: "rgba(125, 255, 203, 0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#f4fffe",
    textAlign: "center",
  },
  detailsSubtitle: {
    fontSize: 18,
    color: "#d0e7ff",
    textAlign: "center",
  },
  detailsAlbum: {
    fontSize: 15,
    color: "#9fb5cc",
    textAlign: "center",
  },
  modalTagRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  modalTag: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  modalTagText: {
    color: "#f4fffe",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  detailsStatsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
  detailStat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(8, 17, 35, 0.85)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.18)",
  },
  detailStatValue: {
    color: "#f4fffe",
    fontSize: 16,
    fontWeight: "600",
  },
  detailStatLabel: {
    color: "#9fb5cc",
    fontSize: 11,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailsSection: {
    width: "100%",
    borderRadius: 26,
    backgroundColor: "rgba(5, 10, 22, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 14,
  },
  detailsSectionLabel: {
    color: "#7dffcb",
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: {
    padding: 6,
    borderRadius: 18,
    backgroundColor: "rgba(125, 255, 203, 0.2)",
  },
  infoTextWrapper: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    color: "#9fb5cc",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  infoValue: {
    color: "#f5fbff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalSpotifyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7dffcb",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  modalSpotifyIcon: {
    marginRight: 10,
  },
  modalSpotifyLabel: {
    color: "#0f1320",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
