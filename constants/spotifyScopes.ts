// constants/spotifyScopes.ts

// For controlling playback, we need 'user-modify-playback-state'.
// If we want to see currently playing info or device info, also include
// 'user-read-playback-state', 'user-read-currently-playing' etc.
export const SPOTIFY_SCOPES = [
    "user-modify-playback-state",
    // "user-read-playback-state",
    // "user-read-currently-playing",
  ];
  