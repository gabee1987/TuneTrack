export interface SpotifyToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expirationTime: number;
}

export function serializeToken(token: SpotifyToken) {
  return JSON.stringify({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    expires_in: token.expiresIn,
    expiration_time: token.expirationTime,
  });
}

export function deserializeToken(raw: string): SpotifyToken {
  const payload = JSON.parse(raw);
  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresIn: payload.expires_in,
    expirationTime: payload.expiration_time,
  };
}

