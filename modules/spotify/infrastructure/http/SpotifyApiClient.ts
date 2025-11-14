import { SpotifyAuthService } from "@/modules/spotify/application/SpotifyAuthService";

export interface SpotifyApiResult<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class SpotifyApiClient {
  private readonly baseUrl = "https://api.spotify.com/v1";

  constructor(
    private readonly authService: SpotifyAuthService,
    private readonly fetchFn: typeof fetch = fetch
  ) {}

  get<T>(path: string) {
    return this.request<T>("GET", path);
  }

  put<T>(path: string, body?: unknown) {
    return this.request<T>("PUT", path, body);
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown
  ): Promise<SpotifyApiResult<T>> {
    const token = await this.authService.getValidAccessToken();
    if (!token) {
      return { ok: false, status: 401, error: "Missing Spotify token" };
    }

    try {
      const response = await this.fetchFn(`${this.baseUrl}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body ? { "Content-Type": "application/json" } : null),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const contentType = response.headers.get("content-type") || "";
      const isJsonResponse = contentType.includes("application/json");
      
      const text = await response.text();
      let payload: T | undefined;
      
      // Only try to parse JSON if the content type indicates JSON
      // 204 No Content responses are expected to be empty
      if (text && isJsonResponse) {
        try {
          payload = JSON.parse(text) as T;
        } catch (error) {
          // Only warn if we expected JSON but failed to parse
          console.warn("[spotify] Failed to parse JSON response body", error);
        }
      } else if (text && !isJsonResponse && response.status !== 204) {
        // Non-JSON response that's not a 204 - might be an error page
        // Only log if it's an error status
        if (!response.ok) {
          console.warn(
            `[spotify] Non-JSON response (${contentType}): ${text.substring(0, 100)}`
          );
        }
      }

      if (!response.ok) {
        return { ok: false, status: response.status, error: text || "error" };
      }

      return { ok: true, status: response.status, data: payload };
    } catch (error) {
      console.error("[spotify] API request failed", error);
      return { ok: false, status: 0, error: (error as Error).message };
    }
  }
}

