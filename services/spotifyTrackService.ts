import { getStoredSpotifyToken } from "./spotifyAuthService";

export interface SpotifyTrackDetails {
  id: string;
  name: string;
  artistNames: string[];
  albumName: string;
  albumArtUrl: string | null;
  externalUrl: string | null;
  previewUrl: string | null;
  durationMs: number;
  releaseDate: string | null;
  releaseYear: string | null;
  popularity: number | null;
  albumTotalTracks: number | null;
  trackNumber: number | null;
  explicit: boolean;
}

export async function fetchSpotifyTrackDetails(
  trackId: string
): Promise<SpotifyTrackDetails | null> {
  try {
    const tokenData = await getStoredSpotifyToken();
    if (!tokenData?.access_token) {
      console.warn(
        "Cannot fetch Spotify track details without an access token."
      );
      return null;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (response.status === 401 || response.status === 403) {
      console.warn(
        `Spotify track details request unauthorized (status ${response.status}).`
      );
      return null;
    }

    if (!response.ok) {
      const details = await response.text();
      console.warn("Failed to fetch Spotify track details:", details);
      return null;
    }

    const payload = await response.json();
    const releaseDate = payload.album?.release_date ?? null;
    const releaseYear = releaseDate ? releaseDate.slice(0, 4) : null;

    return {
      id: payload.id,
      name: payload.name,
      artistNames:
        payload.artists?.map((artist: { name: string }) => artist.name) || [],
      albumName: payload.album?.name ?? "",
      albumArtUrl: payload.album?.images?.[0]?.url ?? null,
      externalUrl: payload.external_urls?.spotify ?? null,
      previewUrl: payload.preview_url ?? null,
      durationMs: payload.duration_ms ?? 0,
      releaseDate,
      releaseYear,
      popularity:
        typeof payload.popularity === "number" ? payload.popularity : null,
      albumTotalTracks: payload.album?.total_tracks ?? null,
      trackNumber: payload.track_number ?? null,
      explicit: Boolean(payload.explicit),
    };
  } catch (error) {
    console.error("Error fetching Spotify track details:", error);
    return null;
  }
}
