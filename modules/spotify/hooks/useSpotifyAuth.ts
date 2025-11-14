import { useCallback, useEffect, useMemo, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { Alert } from "react-native";
import { spotifyServices } from "@/modules/spotify/di/spotifyServiceLocator";

type AuthStatus =
  | "idle"
  | "prompt"
  | "exchanging"
  | "authenticated"
  | "error";

export function useSpotifyAuth() {
  const { config, authService } = spotifyServices;
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    authService
      .hasValidAccessToken()
      .then(setIsAuthenticated)
      .catch((err) => {
        console.error("[spotify] Failed to check token state", err);
      });
  }, [authService]);

  const authRequestConfig = useMemo(
    () => ({
      clientId: config.clientId,
      scopes: config.scopes,
      redirectUri: config.redirectUri,
      responseType: "code" as const,
      usePKCE: true,
    }),
    [config.clientId, config.redirectUri, config.scopes]
  );

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    authRequestConfig,
    config.discovery
  );

  useEffect(() => {
    let isMounted = true;
    async function exchangeCode() {
      if (response?.type !== "success" || !request) {
        return;
      }

      const code = (response as AuthSession.AuthSessionResult & {
        params: { code?: string };
      }).params.code;

      if (!code) {
        setStatus("error");
        setError("Spotify did not return an authorization code.");
        return;
      }

      setStatus("exchanging");

      try {
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: config.clientId,
            code,
            redirectUri: config.redirectUri,
            extraParams: { code_verifier: request.codeVerifier ?? "" },
          },
          config.discovery
        );

        await authService.persistTokenResponse({
          accessToken: tokenResponse.accessToken ?? "",
          refreshToken: tokenResponse.refreshToken ?? "",
          expiresIn: tokenResponse.expiresIn ?? undefined,
        });
        if (!isMounted) {
          return;
        }
        setStatus("authenticated");
        setIsAuthenticated(true);
      } catch (err) {
        console.error("[spotify] Token exchange failed", err);
        if (!isMounted) {
          return;
        }
        setStatus("error");
        setError((err as Error).message ?? "Failed to exchange token");
      }
    }

    exchangeCode();
    return () => {
      isMounted = false;
    };
  }, [authService, config, request, response]);

  useEffect(() => {
    if (response?.type === "error") {
      setStatus("error");
      const message =
        response.error?.message ||
        response.error?.description ||
        response.params?.error_description ||
        "Authentication failed.";
      setError(message);
    }
  }, [response]);

  const authorize = useCallback(async () => {
    if (!config.clientId) {
      setStatus("error");
      const message =
        "Spotify Client ID is missing. Please configure it before logging in.";
      setError(message);
      Alert.alert("Configuration error", message);
      return;
    }
    if (!request) {
      setStatus("error");
      setError("Spotify authorization request is not ready yet.");
      return;
    }

    setStatus("prompt");
    try {
      const result = await promptAsync();
      if (result.type === "dismiss" || result.type === "cancel") {
        setStatus("idle");
      }
    } catch (err) {
      setStatus("error");
      setError((err as Error).message ?? "Failed to open Spotify login");
    }
  }, [config.clientId, promptAsync, request]);

  return {
    authorize,
    status,
    error,
    isRequestReady: Boolean(request),
    isAuthenticated,
    clearError: () => setError(null),
  };
}

