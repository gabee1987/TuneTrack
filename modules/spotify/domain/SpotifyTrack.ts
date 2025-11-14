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

