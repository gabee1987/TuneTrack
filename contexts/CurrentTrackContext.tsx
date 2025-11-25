import React, { createContext, useCallback, useContext, useState } from "react";

type CurrentTrackContextValue = {
  lastScannedQrData: string | null;
  setLastScannedQrData: (qrData: string | null) => void;
  hasCurrentTrack: boolean;
  playbackStarted: boolean;
  setPlaybackStarted: (started: boolean) => void;
  hasOpenedSpotify: boolean;
  setHasOpenedSpotify: (opened: boolean) => void;
};

const CurrentTrackContext = createContext<CurrentTrackContextValue>({
  lastScannedQrData: null,
  setLastScannedQrData: () => {},
  hasCurrentTrack: false,
  playbackStarted: false,
  setPlaybackStarted: () => {},
  hasOpenedSpotify: false,
  setHasOpenedSpotify: () => {},
});

export function CurrentTrackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastScannedQrData, setLastScannedQrDataState] = useState<
    string | null
  >(null);
  const [playbackStarted, setPlaybackStartedState] = useState(false);
  const [hasOpenedSpotify, setHasOpenedSpotifyState] = useState(false);

  const setLastScannedQrData = useCallback((qrData: string | null) => {
    setLastScannedQrDataState(qrData);
    // Reset playback started flag and Spotify opened flag when QR data changes
    if (qrData === null) {
      setPlaybackStartedState(false);
      setHasOpenedSpotifyState(false);
    }
  }, []);

  const setPlaybackStarted = useCallback((started: boolean) => {
    setPlaybackStartedState(started);
  }, []);

  const setHasOpenedSpotify = useCallback((opened: boolean) => {
    setHasOpenedSpotifyState(opened);
  }, []);

  const hasCurrentTrack = lastScannedQrData !== null;

  const value = {
    lastScannedQrData,
    setLastScannedQrData,
    hasCurrentTrack,
    playbackStarted,
    setPlaybackStarted,
    hasOpenedSpotify,
    setHasOpenedSpotify,
  };

  return (
    <CurrentTrackContext.Provider value={value}>
      {children}
    </CurrentTrackContext.Provider>
  );
}

export const useCurrentTrack = () => useContext(CurrentTrackContext);
