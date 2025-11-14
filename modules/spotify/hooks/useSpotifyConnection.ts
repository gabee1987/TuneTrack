import { useCallback, useEffect, useState } from "react";
import { spotifyServices } from "@/modules/spotify/di/spotifyServiceLocator";
import { SpotifyMode } from "@/modules/spotify/domain/SpotifyMode";

interface ConnectionState {
  loading: boolean;
  isConnected: boolean;
  mode: SpotifyMode | null;
}

export function useSpotifyConnection() {
  const [state, setState] = useState<ConnectionState>({
    loading: true,
    isConnected: false,
    mode: null,
  });

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const [hasToken, mode] = await Promise.all([
      spotifyServices.authService.hasValidAccessToken(),
      spotifyServices.modeService.getMode(),
    ]);
    const isConnected = Boolean(hasToken) || mode === "free" || mode === null;
    setState({ loading: false, isConnected, mode: mode ?? null });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}

