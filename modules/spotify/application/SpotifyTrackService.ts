import { SpotifyApiClient } from "@/modules/spotify/infrastructure/http/SpotifyApiClient";
import { SpotifyTrackDetails } from "@/modules/spotify/domain/SpotifyTrack";

interface SpotifyTrackApiResponse {
  id: string;
  name: string;
  artists?: { name: string }[];
  album?: {
    name?: string;
    release_date?: string;
    images?: { url: string }[];
    total_tracks?: number;
  };
  external_urls?: { spotify?: string };
  preview_url?: string | null;
  duration_ms?: number;
  popularity?: number;
  track_number?: number;
  explicit?: boolean;
}

function mapTrack(payload: SpotifyTrackApiResponse): SpotifyTrackDetails {
  const releaseDate = payload.album?.release_date ?? null;
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : null;

  return {
    id: payload.id,
    name: payload.name,
    artistNames: payload.artists?.map((artist) => artist.name) ?? [],
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
}

export class SpotifyTrackService {
  constructor(private readonly apiClient: SpotifyApiClient) {}

  async fetchDetails(trackId: string): Promise<SpotifyTrackDetails | null> {
    const result = await this.apiClient.get<SpotifyTrackApiResponse>(
      `/tracks/${trackId}`
    );

    if (!result.ok || !result.data) {
      if (result.status === 401 || result.status === 403) {
        console.warn("[spotify] Track request unauthorized", result.error);
      } else {
        console.warn("[spotify] Failed to fetch track details", result.error);
      }
      return null;
    }

    return mapTrack(result.data);
  }
}

