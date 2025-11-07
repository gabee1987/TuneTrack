// app/qr-result.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Share,
  Linking,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  playSpotifyTrack,
  stopSpotifyPlayback,
} from "@/services/spotifyPlaybackService";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import EqualizerAnimation from "@/components/EqualizerAnimation";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import {
  fetchSpotifyTrackDetails,
  SpotifyTrackDetails,
} from "@/services/spotifyTrackService";

function QrResultScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const qrData = Array.isArray(params.qrData)
    ? params.qrData[0]
    : params.qrData || "";

  const [trackDetails, setTrackDetails] = useState<SpotifyTrackDetails | null>(
    null
  );
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [showHeaderDetails, setShowHeaderDetails] = useState(false);

  const trackId = useMemo(() => {
    if (!qrData) {
      return null;
    }
    if (qrData.startsWith("spotify:track:")) {
      return qrData.split("spotify:track:")[1];
    }
    if (qrData.includes("open.spotify.com/track/")) {
      const match = qrData.match(/track\/([A-Za-z0-9]+)/);
      return match ? match[1] : null;
    }
    return null;
  }, [qrData]);

  const trackUri = useMemo(() => {
    if (trackId) {
      return `spotify:track:${trackId}`;
    }
    return qrData && qrData.startsWith("spotify:track:") ? qrData : null;
  }, [qrData, trackId]);

  const trackUrl = useMemo(() => {
    if (trackId) {
      return `https://open.spotify.com/track/${trackId}`;
    }
    if (qrData && qrData.includes("open.spotify.com/track/")) {
      const urlMatch = qrData.match(
        /(https?:\/\/open\.spotify\.com\/track\/[^?\s]+)/
      );
      return urlMatch ? urlMatch[1] : qrData;
    }
    return null;
  }, [qrData, trackId]);

  useEffect(() => {
    if (!qrData) {
      Alert.alert("Error", "No Spotify URI found in QR Code.");
      return;
    }

    if (trackUri) {
      playSpotifyTrack(trackUri);
      return;
    }

    Alert.alert("QR Code", "Not recognized as a Spotify track URI");
  }, [qrData, trackUri]);

  useEffect(() => {
    let cancelled = false;
    if (!trackId) {
      setTrackDetails(null);
      return () => {
        cancelled = true;
      };
    }

    setIsFetchingDetails(true);
    fetchSpotifyTrackDetails(trackId)
      .then((details) => {
        if (!cancelled) {
          setTrackDetails(details);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsFetchingDetails(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [trackId]);

  const hasTrack = Boolean(trackUri);

  useEffect(() => {
    if (!hasTrack && showHeaderDetails) {
      setShowHeaderDetails(false);
    }
  }, [hasTrack, showHeaderDetails]);

  const releaseDateLabel = useMemo(() => {
    if (!trackDetails?.releaseDate) {
      return trackDetails?.releaseYear ?? null;
    }

    const dateString = trackDetails.releaseDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const date = new Date(`${dateString}T00:00:00Z`);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    }
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }
    return dateString;
  }, [trackDetails?.releaseDate, trackDetails?.releaseYear]);

  const durationLabel = useMemo(() => {
    if (!trackDetails?.durationMs) {
      return null;
    }
    const totalSeconds = Math.round(trackDetails.durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [trackDetails?.durationMs]);

  const trackPositionLabel = useMemo(() => {
    if (!trackDetails?.trackNumber) {
      return null;
    }
    if (trackDetails.albumTotalTracks) {
      return `Track ${trackDetails.trackNumber} of ${trackDetails.albumTotalTracks}`;
    }
    return `Track ${trackDetails.trackNumber}`;
  }, [trackDetails?.trackNumber, trackDetails?.albumTotalTracks]);

  const popularityLabel = useMemo(() => {
    if (typeof trackDetails?.popularity !== "number") {
      return null;
    }
    return `${trackDetails.popularity}/100`;
  }, [trackDetails?.popularity]);

  const albumYearLabel = useMemo(() => {
    const parts: string[] = [];
    if (trackDetails?.releaseYear) {
      parts.push(trackDetails.releaseYear);
    }
    if (trackDetails?.albumName) {
      parts.push(trackDetails.albumName);
    }
    return parts.length ? parts.join(" · ") : null;
  }, [trackDetails?.releaseYear, trackDetails?.albumName]);

  const explicitTag = trackDetails?.explicit
    ? t("qr_result_explicit_tag", "Explicit")
    : null;

  const handleToggleHeaderDetails = useCallback(() => {
    if (!hasTrack) {
      return;
    }
    setShowHeaderDetails((prev) => !prev);
  }, [hasTrack]);

  const handleShowDetails = useCallback(() => {
    if (trackDetails) {
      setDetailsVisible(true);
    } else if (isFetchingDetails) {
      Alert.alert(
        t("qr_result_details_loading", "Loading details"),
        t("please_wait", "Please wait a moment")
      );
    } else {
      Alert.alert(
        t("qr_result_details_unavailable_title", "Song details unavailable"),
        t(
          "qr_result_details_unavailable_message",
          "We could not fetch more info from Spotify just yet."
        )
      );
    }
  }, [isFetchingDetails, t, trackDetails]);

  const handleCopyLink = useCallback(async () => {
    if (!trackUrl) {
      return;
    }
    try {
      await Clipboard.setStringAsync(trackUrl);
      Alert.alert(
        t("qr_result_copy_success_title", "Link copied"),
        t(
          "qr_result_copy_success_message",
          "The Spotify link is ready to paste."
        )
      );
    } catch (error) {
      console.error("Failed to copy Spotify link", error);
      Alert.alert(
        t("qr_result_copy_error_title", "Copy failed"),
        t(
          "qr_result_copy_error_message",
          "We could not copy the link. Please try again."
        )
      );
    }
  }, [t, trackUrl]);

  const handleShareLink = useCallback(async () => {
    if (!trackUrl) {
      return;
    }
    try {
      const trackLine = trackDetails
        ? `${trackDetails.name} – ${trackDetails.artistNames.join(", ")}`
        : "";
      await Share.share({
        message: [trackLine, trackUrl].filter(Boolean).join("\n"),
      });
    } catch (error) {
      console.error("Failed to share Spotify link", error);
    }
  }, [trackDetails, trackUrl]);

  const handleOpenInSpotify = useCallback(() => {
    if (!trackUrl) {
      return;
    }
    Linking.openURL(trackUrl);
  }, [trackUrl]);

  const handleBack = () => {
    router.navigate("/");
  };

  const handleStopAndScan = useCallback(async () => {
    setShowHeaderDetails(false);
    await stopSpotifyPlayback();
    router.push("/camera");
  }, [router]);

  type IoniconName =
    | Exclude<ComponentProps<typeof Ionicons>["name"], undefined>
    | "logo-spotify";

  const ControlButton = ({
    icon,
    label,
    onPress,
    disabled,
  }: {
    icon: IoniconName;
    label: string;
    onPress: () => void;
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.controlButton, disabled && styles.controlButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Ionicons
        name={icon as ComponentProps<typeof Ionicons>["name"]}
        size={20}
        color="#7dffcb"
        style={styles.controlIcon}
      />
      <ThemedText style={styles.controlLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Ionicons name="close-circle-outline" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.middleContainer}>
        <ControlButton
          icon={
            showHeaderDetails ? "chevron-up-outline" : "musical-notes-outline"
          }
          label={
            showHeaderDetails
              ? t("qr_result_hide_now_playing", "Hide now playing")
              : t("qr_result_show_now_playing", "Show now playing")
          }
          onPress={handleToggleHeaderDetails}
          disabled={!hasTrack}
        />

        {showHeaderDetails ? (
          <View style={styles.albumCard}>
            {trackDetails?.albumArtUrl ? (
              <Image
                source={{ uri: trackDetails.albumArtUrl }}
                style={styles.albumArt}
              />
            ) : (
              <View style={styles.albumPlaceholder}>
                <Ionicons
                  name="musical-notes-outline"
                  size={48}
                  color="#7dffcb"
                />
              </View>
            )}
            <View style={styles.trackInfo}>
              <ThemedText style={styles.trackTitle} numberOfLines={1}>
                {trackDetails?.name ||
                  t("qr_result_playing_now", "Playing now")}
              </ThemedText>
              <ThemedText style={styles.trackSubtitle} numberOfLines={1}>
                {trackDetails?.artistNames.join(", ") ||
                  t("qr_result_artist_unknown", "Spotify Track")}
              </ThemedText>
              {albumYearLabel ? (
                <ThemedText style={styles.trackMeta} numberOfLines={1}>
                  {albumYearLabel}
                </ThemedText>
              ) : null}
            </View>
          </View>
        ) : null}

        <View style={styles.equalizerContainer}>
          <EqualizerAnimation />
        </View>

        <View style={styles.controlsRow}>
          <ControlButton
            icon="information-circle-outline"
            label={t("qr_result_details_button", "Song details")}
            onPress={handleShowDetails}
            disabled={!trackDetails && !isFetchingDetails}
          />
          <ControlButton
            icon="copy-outline"
            label={t("qr_result_copy_button", "Copy link")}
            onPress={handleCopyLink}
            disabled={!trackUrl}
          />
        </View>
        <View style={styles.controlsRow}>
          <ControlButton
            icon="share-social-outline"
            label={t("qr_result_share_button", "Share link")}
            onPress={handleShareLink}
            disabled={!trackUrl}
          />
          <ControlButton
            icon="logo-spotify"
            label={t("qr_result_open_spotify_button", "Open in Spotify")}
            onPress={handleOpenInSpotify}
            disabled={!trackUrl}
          />
        </View>
      </View>

      <View style={styles.nextScanContainer}>
        <ControlButton
          icon="scan-outline"
          label={t("qr_result_next_scan_button", "Scan next QR")}
          onPress={handleStopAndScan}
        />
        <ThemedText style={styles.nextScanHint}>
          {t("qr_result_next_scan_hint", "Stops playback and opens the camera")}
        </ThemedText>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setDetailsVisible(false)}
              >
                <Ionicons name="close" size={24} color="#0f1320" />
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {trackDetails?.albumArtUrl ? (
                <Image
                  source={{ uri: trackDetails.albumArtUrl }}
                  style={styles.modalArt}
                />
              ) : (
                <View style={styles.modalArtPlaceholder}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={72}
                    color="#7dffcb"
                  />
                </View>
              )}
              <ThemedText style={styles.modalTitle}>
                {trackDetails?.name ||
                  t("qr_result_details_title", "Spotify track")}
              </ThemedText>
              {trackDetails?.artistNames.length ? (
                <ThemedText style={styles.modalSubtitle}>
                  {trackDetails.artistNames.join(", ")}
                </ThemedText>
              ) : null}
              {albumYearLabel ? (
                <ThemedText style={styles.modalAlbum}>
                  {albumYearLabel}
                </ThemedText>
              ) : null}
              {explicitTag ? (
                <View style={styles.modalTagRow}>
                  <View style={styles.modalTag}>
                    <ThemedText style={styles.modalTagText}>
                      {explicitTag}
                    </ThemedText>
                  </View>
                </View>
              ) : null}

              <View style={styles.modalInfoGroup}>
                <InfoRow
                  icon="calendar-outline"
                  label={t("qr_result_detail_release", "Release")}
                  value={releaseDateLabel}
                />
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
                  icon="time-outline"
                  label={t("qr_result_detail_duration", "Duration")}
                  value={durationLabel}
                />
                <InfoRow
                  icon="stats-chart-outline"
                  label={t("qr_result_detail_popularity", "Popularity")}
                  value={popularityLabel}
                />
              </View>

              <TouchableOpacity
                style={styles.modalSpotifyButton}
                onPress={handleOpenInSpotify}
                disabled={!trackUrl}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={
                    "logo-spotify" as ComponentProps<typeof Ionicons>["name"]
                  }
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
        </View>
      </Modal>
    </View>
  );
}

export default QrResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 50,
    justifyContent: "space-between", // Push top & bottom content
    alignItems: "center",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    gap: 28,
  },
  nextScanContainer: {
    paddingBottom: 36,
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  nextScanHint: {
    color: "#baced9",
    fontSize: 13,
    letterSpacing: 0.2,
  },
  albumCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 19, 32, 0.78)",
    padding: 16,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.3)",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  albumArt: {
    width: 86,
    height: 86,
    borderRadius: 18,
    marginRight: 16,
  },
  albumPlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 18,
    marginRight: 16,
    backgroundColor: "rgba(125, 255, 203, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  trackInfo: {
    flex: 1,
    gap: 4,
  },
  trackTitle: {
    color: "#f5fbff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  trackSubtitle: {
    color: "#c5d9e2",
    fontSize: 14,
  },
  trackMeta: {
    color: "#9bb7c5",
    fontSize: 13,
  },
  equalizerContainer: {
    paddingVertical: 18,
    paddingHorizontal: 26,
    backgroundColor: "rgba(15, 19, 32, 0.7)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(119, 255, 203, 0.28)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 16,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "rgba(15, 19, 32, 0.78)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.4)",
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  controlIcon: {
    marginRight: 10,
  },
  controlLabel: {
    color: "#f4fffe",
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(5, 7, 12, 0.85)",
    justifyContent: "flex-end",
  },
  modalCard: {
    width: "100%",
    maxHeight: "92%",
    backgroundColor: "#f4fffe",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: "stretch",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  modalClose: {
    padding: 8,
  },
  modalContent: {
    paddingBottom: 40,
    alignItems: "center",
    gap: 16,
  },
  modalArt: {
    width: 220,
    height: 220,
    borderRadius: 28,
  },
  modalArtPlaceholder: {
    width: 220,
    height: 220,
    borderRadius: 28,
    backgroundColor: "rgba(125, 255, 203, 0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f1320",
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#283247",
    textAlign: "center",
  },
  modalAlbum: {
    fontSize: 14,
    color: "#4d5870",
    textAlign: "center",
  },
  modalTagRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalTag: {
    backgroundColor: "rgba(15, 19, 32, 0.08)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalTagText: {
    color: "#0f1320",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  modalInfoGroup: {
    width: "100%",
    gap: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: "rgba(125, 255, 203, 0.18)",
  },
  infoTextWrapper: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    color: "#4d5870",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  infoValue: {
    color: "#0f1320",
    fontSize: 16,
    fontWeight: "600",
  },
  modalSpotifyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7dffcb",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignSelf: "center",
  },
  modalSpotifyIcon: {
    marginRight: 8,
  },
  modalSpotifyLabel: {
    color: "#0f1320",
    fontWeight: "600",
  },
});
