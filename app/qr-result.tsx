// app/qr-result.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ComponentProps } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Share,
  Linking,
  Animated,
  Easing,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import { spotifyServices } from "@/modules/spotify/di/spotifyServiceLocator";
import { SpotifyTrackDetails } from "@/modules/spotify/domain/SpotifyTrack";
import AudioBackdrop from "@/components/AudioBackdrop";
import SongDetailModal from "@/components/SongDetailModal";

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
  const infoReveal = useRef(new Animated.Value(0)).current;
  const playbackTrackRef = useRef<string | null>(null);

  useEffect(() => {
    Animated.timing(infoReveal, {
      toValue: showHeaderDetails ? 1 : 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [showHeaderDetails, infoReveal]);

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
      if (playbackTrackRef.current === trackUri) {
        return;
      }
      playbackTrackRef.current = trackUri;
      spotifyServices.playbackService
        .playTrack(trackUri)
        .catch((error) =>
          console.error("Failed to start Spotify playback", error)
        );
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
    spotifyServices.trackService
      .fetchDetails(trackId)
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
  const detailsAvailable = Boolean(trackDetails);
  const infoContainerAnimatedStyle = {
    maxHeight: infoReveal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 260],
    }),
    opacity: infoReveal,
    transform: [
      {
        translateY: infoReveal.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };
  const nowPlayingPointerEvents = showHeaderDetails ? "auto" : "none";

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
    await spotifyServices.playbackService.stopPlayback();
    router.push("/camera");
  }, [router]);

  type IoniconName =
    | Exclude<ComponentProps<typeof Ionicons>["name"], undefined>
    | "logo-spotify";

  type ActionButtonVariant = "primary" | "secondary" | "ghost";

  const ActionButton = ({
    icon,
    label,
    onPress,
    disabled,
    variant = "primary",
  }: {
    icon?: IoniconName;
    label: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: ActionButtonVariant;
  }) => {
    const iconColor =
      variant === "primary"
        ? "#7dffcb"
        : variant === "ghost"
        ? "#f4fffe"
        : "#e2f7ff";

    const isSpotifyIcon = icon === "logo-spotify";

    return (
      <TouchableOpacity
        style={[
          styles.actionButton,
          variant === "secondary" && styles.actionButtonSecondary,
          variant === "ghost" && styles.actionButtonGhost,
          disabled && styles.actionButtonDisabled,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.86}
      >
        {icon ? (
          isSpotifyIcon ? (
            <ThemedText
              style={[
                styles.actionButtonIcon,
                styles.actionButtonIconText,
                { color: iconColor },
              ]}
            >
              ♪
            </ThemedText>
          ) : (
            <Ionicons
              name={icon as ComponentProps<typeof Ionicons>["name"]}
              size={20}
              color={iconColor}
              style={styles.actionButtonIcon}
            />
          )
        ) : null}
        <ThemedText
          style={[
            styles.actionButtonLabel,
            variant !== "primary" && styles.actionButtonLabelSecondary,
          ]}
          numberOfLines={1}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AudioBackdrop />
      <View style={styles.statusBar}>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Ionicons name="close-circle-outline" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[styles.songInfoWrapper, infoContainerAnimatedStyle]}
          pointerEvents={nowPlayingPointerEvents}
        >
          <View style={styles.songInfoCard}>
            {trackDetails?.albumArtUrl ? (
              <Image
                source={{ uri: trackDetails.albumArtUrl }}
                style={styles.songArt}
              />
            ) : (
              <View style={styles.songArtPlaceholder}>
                <Ionicons
                  name="musical-notes-outline"
                  size={42}
                  color="#7dffcb"
                />
              </View>
            )}
            <View style={styles.songTextBlock}>
              <ThemedText style={styles.songTitle} numberOfLines={1}>
                {trackDetails?.name ||
                  t("qr_result_playing_now", "Playing now")}
              </ThemedText>
              <ThemedText style={styles.songArtists} numberOfLines={1}>
                {trackDetails?.artistNames.join(", ") ||
                  t("qr_result_artist_unknown", "Spotify Track")}
              </ThemedText>
              <ThemedText style={styles.songMeta} numberOfLines={1}>
                {albumYearLabel || durationLabel || "-"}
              </ThemedText>
              {explicitTag ? (
                <View style={styles.songBadge}>
                  <ThemedText style={styles.songBadgeText}>
                    {explicitTag}
                  </ThemedText>
                </View>
              ) : null}
            </View>
          </View>
        </Animated.View>

        <ActionButton
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

        <View style={styles.actionStack}>
          <ActionButton
            icon="information-circle-outline"
            label={t("qr_result_details_button", "Song details")}
            onPress={handleShowDetails}
            disabled={!detailsAvailable && !isFetchingDetails}
          />
          <ActionButton
            variant="secondary"
            icon="copy-outline"
            label={t("qr_result_copy_button", "Copy link")}
            onPress={handleCopyLink}
            disabled={!trackUrl}
          />
          <ActionButton
            variant="secondary"
            icon="share-social-outline"
            label={t("qr_result_share_button", "Share link")}
            onPress={handleShareLink}
            disabled={!trackUrl}
          />
          <ActionButton
            icon="logo-spotify"
            label={t("qr_result_open_spotify_button", "Open in Spotify")}
            onPress={handleOpenInSpotify}
            disabled={!trackUrl}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <ActionButton
          variant="ghost"
          icon="scan-outline"
          label={t("qr_result_next_scan_button", "Scan next QR")}
          onPress={handleStopAndScan}
        />
        <ThemedText style={styles.nextScanHint}>
          {t("qr_result_next_scan_hint", "Stops playback and opens the camera")}
        </ThemedText>
      </View>

      <SongDetailModal
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        trackDetails={trackDetails}
        trackUrl={trackUrl}
        explicitTag={explicitTag}
        albumYearLabel={albumYearLabel}
        releaseDateLabel={releaseDateLabel}
        durationLabel={durationLabel}
        popularityLabel={popularityLabel}
        trackPositionLabel={trackPositionLabel}
        onOpenInSpotify={handleOpenInSpotify}
        t={t}
      />
    </View>
  );
}

export default QrResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(4, 7, 15, 0.96)",
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    gap: 18,
  },
  songInfoWrapper: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 30,
  },
  songInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 19, 32, 0.9)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.3)",
    padding: 20,
    gap: 16,
  },
  songArt: {
    width: 86,
    height: 86,
    borderRadius: 20,
  },
  songArtPlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 20,
    backgroundColor: "rgba(125, 255, 203, 0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  songTextBlock: {
    flex: 1,
    gap: 4,
  },
  songTitle: {
    color: "#f5fbff",
    fontSize: 20,
    fontWeight: "700",
  },
  songArtists: {
    color: "#c5d9e2",
    fontSize: 15,
  },
  songMeta: {
    color: "#8aa5b5",
    fontSize: 13,
  },
  songBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: "rgba(125, 255, 203, 0.16)",
  },
  songBadgeText: {
    color: "#7dffcb",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  actionStack: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(125, 255, 203, 0.35)",
    backgroundColor: "rgba(5, 8, 18, 0.95)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 56,
    width: "100%",
  },
  actionButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  actionButtonGhost: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  actionButtonIconText: {
    fontSize: 18,
  },
  actionButtonLabel: {
    color: "#f4fffe",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  actionButtonLabelSecondary: {
    color: "#dbe4f0",
  },
  footer: {
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginTop: 12,
  },
  nextScanHint: {
    color: "#baced9",
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
