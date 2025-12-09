import React, { useMemo } from "react";
import type { ComponentProps } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { SpotifyTrackDetails } from "@/modules/spotify/domain/SpotifyTrack";
import { useAppTheme } from "@/design/theme/ThemeProvider";
import { useAnimationSettings } from "@/contexts/AnimationSettingsContext";
import { createSongDetailModalStyles } from "@/styles/components/songDetailModalStyles";
import { getSongDetailModalColors } from "@/styles/screenColors";

type TranslationFunction = ReturnType<typeof useTranslation>["t"];

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
  t: TranslationFunction;
}

const InfoRow = ({
  icon,
  label,
  value,
  iconColor,
  labelColor,
  valueColor,
  iconBackgroundColor,
  styles,
  lightColors,
  darkColors,
}: {
  icon: IoniconName;
  label: string;
  value?: string | null;
  iconColor: string;
  labelColor: string;
  valueColor: string;
  iconBackgroundColor: string;
  styles: ReturnType<typeof createSongDetailModalStyles>;
  lightColors: ReturnType<typeof getSongDetailModalColors>;
  darkColors: ReturnType<typeof getSongDetailModalColors>;
}) => {
  if (!value) {
    return null;
  }

  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon as ComponentProps<typeof Ionicons>["name"]}
        size={18}
        color={iconColor}
        style={[styles.infoIcon, { backgroundColor: iconBackgroundColor }]}
      />
      <View style={styles.infoTextWrapper}>
        <ThemedText
          style={styles.infoLabel}
          lightColor={lightColors.infoLabel}
          darkColor={darkColors.infoLabel}
        >
          {label}
        </ThemedText>
        <ThemedText
          style={styles.infoValue}
          lightColor={lightColors.infoValue}
          darkColor={darkColors.infoValue}
        >
          {value}
        </ThemedText>
      </View>
    </View>
  );
};

const DetailStat = ({
  label,
  value,
  styles,
  lightColors,
  darkColors,
}: {
  label: string;
  value?: string | null;
  styles: ReturnType<typeof createSongDetailModalStyles>;
  lightColors: ReturnType<typeof getSongDetailModalColors>;
  darkColors: ReturnType<typeof getSongDetailModalColors>;
}) => {
  if (!value) {
    return null;
  }

  return (
    <View style={styles.detailStat}>
      <ThemedText
        style={styles.detailStatValue}
        lightColor={lightColors.statValue}
        darkColor={darkColors.statValue}
      >
        {value}
      </ThemedText>
      <ThemedText
        style={styles.detailStatLabel}
        lightColor={lightColors.statLabel}
        darkColor={darkColors.statLabel}
      >
        {label}
      </ThemedText>
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
  const { mode } = useAppTheme();
  const { animationsEnabled } = useAnimationSettings();
  const styles = useMemo(() => createSongDetailModalStyles(mode), [mode]);
  const colors = useMemo(() => getSongDetailModalColors(mode), [mode]);
  const lightColors = useMemo(() => getSongDetailModalColors("light"), []);
  const darkColors = useMemo(() => getSongDetailModalColors("dark"), []);

  const hasQuickStats = Boolean(
    releaseDateLabel || durationLabel || popularityLabel
  );

  return (
    <Modal
      animationType={animationsEnabled ? "fade" : "none"}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <View style={styles.detailsScreen}>
        <LinearGradient
          colors={[
            colors.gradientStart,
            colors.gradientMiddle,
            colors.gradientEnd,
          ]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.detailsHeader}>
          <TouchableOpacity style={styles.detailsCloseButton} onPress={onClose}>
            <Ionicons
              name="close-circle-outline"
              size={36}
              color={colors.closeButtonIcon}
            />
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
                    color={colors.artPlaceholderIcon}
                  />
                </View>
              )}
            </View>
            {explicitTag ? (
              <View style={styles.modalTagRow}>
                <View style={styles.modalTag}>
                  <ThemedText
                    style={styles.modalTagText}
                    lightColor={lightColors.tagText}
                    darkColor={darkColors.tagText}
                  >
                    {explicitTag}
                  </ThemedText>
                </View>
              </View>
            ) : null}
            <ThemedText
              style={styles.detailsTitle}
              lightColor={lightColors.title}
              darkColor={darkColors.title}
            >
              {trackDetails?.name ||
                t("qr_result_details_title", "Spotify track")}
            </ThemedText>
            {trackDetails?.artistNames.length ? (
              <ThemedText
                style={styles.detailsSubtitle}
                lightColor={lightColors.subtitle}
                darkColor={darkColors.subtitle}
              >
                {trackDetails.artistNames.join(", ")}
              </ThemedText>
            ) : null}
            {albumYearLabel ? (
              <ThemedText
                style={styles.detailsAlbum}
                lightColor={lightColors.album}
                darkColor={darkColors.album}
              >
                {albumYearLabel}
              </ThemedText>
            ) : null}
          </View>

          {hasQuickStats ? (
            <View style={styles.detailsStatsRow}>
              <DetailStat
                label={t("qr_result_detail_release", "Release")}
                value={releaseDateLabel}
                styles={styles}
                lightColors={lightColors}
                darkColors={darkColors}
              />
              <DetailStat
                label={t("qr_result_detail_duration", "Duration")}
                value={durationLabel}
                styles={styles}
                lightColors={lightColors}
                darkColors={darkColors}
              />
              <DetailStat
                label={t("qr_result_detail_popularity", "Popularity")}
                value={popularityLabel}
                styles={styles}
                lightColors={lightColors}
                darkColors={darkColors}
              />
            </View>
          ) : null}

          <View style={styles.detailsSection}>
            <ThemedText
              style={styles.detailsSectionLabel}
              lightColor={lightColors.sectionLabel}
              darkColor={darkColors.sectionLabel}
            >
              {t("qr_result_detail_overview", "Overview")}
            </ThemedText>
            <InfoRow
              icon="disc-outline"
              label={t("qr_result_detail_album", "Album")}
              value={trackDetails?.albumName ?? null}
              iconColor={colors.infoIcon}
              labelColor={colors.infoLabel}
              valueColor={colors.infoValue}
              iconBackgroundColor={colors.infoIconBackground}
              styles={styles}
              lightColors={lightColors}
              darkColors={darkColors}
            />
            <InfoRow
              icon="musical-notes-outline"
              label={t("qr_result_detail_track_number", "Track")}
              value={trackPositionLabel}
              iconColor={colors.infoIcon}
              labelColor={colors.infoLabel}
              valueColor={colors.infoValue}
              iconBackgroundColor={colors.infoIconBackground}
              styles={styles}
              lightColors={lightColors}
              darkColors={darkColors}
            />
            <InfoRow
              icon="link-outline"
              label={t("qr_result_detail_link", "Spotify link")}
              value={trackUrl}
              iconColor={colors.infoIcon}
              labelColor={colors.infoLabel}
              valueColor={colors.infoValue}
              iconBackgroundColor={colors.infoIconBackground}
              styles={styles}
              lightColors={lightColors}
              darkColors={darkColors}
            />
          </View>

          <TouchableOpacity
            style={styles.modalSpotifyButton}
            onPress={onOpenInSpotify}
            disabled={!trackUrl}
            activeOpacity={0.9}
          >
            <ThemedText
              style={styles.modalSpotifyIcon}
              lightColor={lightColors.spotifyButtonIcon}
              darkColor={darkColors.spotifyButtonIcon}
            >
              ♪
            </ThemedText>
            <ThemedText
              style={styles.modalSpotifyLabel}
              lightColor={lightColors.spotifyButtonText}
              darkColor={darkColors.spotifyButtonText}
            >
              {t("qr_result_open_spotify_button", "Open in Spotify")}
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
