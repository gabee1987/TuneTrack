import { StyleSheet } from "react-native";

const qrResultStyles = StyleSheet.create({
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

export default qrResultStyles;
