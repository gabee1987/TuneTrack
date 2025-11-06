import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { SPOTIFY_SCOPES } from "@/constants/spotifyScopes";
import AppButton from "@/components/AppButton";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import GradientBackground from "@/components/ui/GradientBackground";

// Retrieve your client ID from app.config.js via Constants.expoConfig.extra
const CLIENT_ID = Constants.expoConfig?.extra?.spotifyClientId;

// Generate the redirect URI (must match Spotify Developer Dashboard)
// For native builds, this will use tunetrack://redirect
// The scheme property automatically handles native redirects
const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "tunetrack",
  path: "redirect",
});

// Debug logging on module load
console.log("=== SPOTIFY AUTH CONFIGURATION ===");
console.log(
  "CLIENT_ID:",
  CLIENT_ID ? `${CLIENT_ID.substring(0, 10)}...` : "MISSING"
);
console.log("CLIENT_ID length:", CLIENT_ID?.length || 0);
console.log("REDIRECT_URI:", REDIRECT_URI);
console.log(
  "Constants.expoConfig?.extra:",
  JSON.stringify(Constants.expoConfig?.extra, null, 2)
);
console.log("===================================");

const TOKEN_KEY = "SPOTIFY_TOKEN_DATA";

// Spotify OAuth endpoints
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function SpotifyConnectScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set up the PKCE flow: request an authorization code
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SPOTIFY_SCOPES,
      redirectUri: REDIRECT_URI,
      responseType: "code", // Request an authorization code
      usePKCE: true,
    },
    discovery
  );

  // Debug: Log request configuration when it's ready
  useEffect(() => {
    if (request) {
      console.log("=== AUTH REQUEST CONFIGURATION ===");
      console.log("Request ready:", !!request);
      console.log(
        "Client ID in request:",
        request.clientId ? `${request.clientId.substring(0, 10)}...` : "MISSING"
      );
      console.log("Redirect URI in request:", request.redirectUri);
      console.log("Scopes:", request.scopes);
      console.log(
        "Code challenge:",
        request.codeChallenge ? "Present" : "Missing"
      );
      console.log(
        "Code verifier:",
        request.codeVerifier ? "Present" : "Missing"
      );

      // Log the full authorization URL that would be generated
      if (request.url) {
        console.log("Authorization URL:", request.url);
        console.log("URL breakdown:");
        try {
          const url = new URL(request.url);
          console.log("  - Protocol:", url.protocol);
          console.log("  - Host:", url.host);
          console.log("  - Path:", url.pathname);
          console.log(
            "  - Client ID param:",
            url.searchParams.get("client_id")
              ? `${url.searchParams.get("client_id")?.substring(0, 10)}...`
              : "MISSING"
          );
          console.log(
            "  - Redirect URI param:",
            url.searchParams.get("redirect_uri")
          );
          console.log(
            "  - Response type:",
            url.searchParams.get("response_type")
          );
          console.log("  - Scope:", url.searchParams.get("scope"));
          console.log(
            "  - Code challenge:",
            url.searchParams.get("code_challenge") ? "Present" : "Missing"
          );
        } catch (e) {
          console.log("  - Could not parse URL:", e);
        }
      }
      console.log("===================================");
    }
  }, [request]);

  // When the auth response arrives, exchange the code for tokens.
  useEffect(() => {
    console.log("=== AUTH RESPONSE HANDLER ===");
    console.log("Response type:", response?.type);
    console.log("Response:", JSON.stringify(response, null, 2));
    console.log("Request:", request ? "Present" : "Missing");
    console.log("Redirect URI:", REDIRECT_URI);
    console.log(
      "Client ID:",
      CLIENT_ID ? `${CLIENT_ID.substring(0, 10)}...` : "MISSING"
    );

    // Check if client ID is configured
    if (!CLIENT_ID) {
      console.error(
        "Spotify Client ID is not configured. Please set EXPO_PUBLIC_SPOTIFY_CLIENT_ID in your .env file."
      );
      Alert.alert(
        "Configuration Error",
        "Spotify Client ID is missing. Please configure EXPO_PUBLIC_SPOTIFY_CLIENT_ID in your environment variables."
      );
      return;
    }

    // Check if response is successful and has a code.
    if (response?.type === "success") {
      const params = (response as any).params; // Type assertion
      console.log("Response params:", params);

      if (params?.code) {
        async function exchangeCode() {
          try {
            console.log("=== TOKEN EXCHANGE START ===");
            console.log(
              "Authorization code received:",
              params.code ? `${params.code.substring(0, 20)}...` : "MISSING"
            );
            console.log(
              "Client ID:",
              CLIENT_ID ? `${CLIENT_ID.substring(0, 10)}...` : "MISSING"
            );
            console.log("Redirect URI:", REDIRECT_URI);
            console.log(
              "Code verifier:",
              request?.codeVerifier ? "Present" : "Missing"
            );
            console.log("Token endpoint:", discovery.tokenEndpoint);

            const exchangeParams = {
              clientId: CLIENT_ID,
              code: params.code,
              redirectUri: REDIRECT_URI,
              extraParams: { code_verifier: request?.codeVerifier || "" },
            };
            console.log("Exchange params (sanitized):", {
              clientId: CLIENT_ID
                ? `${CLIENT_ID.substring(0, 10)}...`
                : "MISSING",
              code: params.code
                ? `${params.code.substring(0, 20)}...`
                : "MISSING",
              redirectUri: REDIRECT_URI,
              codeVerifier: request?.codeVerifier ? "Present" : "Missing",
            });

            console.log("Calling AuthSession.exchangeCodeAsync...");
            const tokenResponse = await AuthSession.exchangeCodeAsync(
              exchangeParams,
              discovery
            );
            console.log("=== TOKEN EXCHANGE SUCCESS ===");
            console.log(
              "Token response received:",
              tokenResponse ? "Yes" : "No"
            );
            console.log(
              "Access token:",
              tokenResponse?.accessToken ? "Present" : "Missing"
            );
            console.log(
              "Refresh token:",
              tokenResponse?.refreshToken ? "Present" : "Missing"
            );
            console.log("Expires in:", tokenResponse?.expiresIn);

            // Provide a default value for expiresIn if undefined
            const expiresIn = tokenResponse.expiresIn ?? 3600;
            const tokenData = {
              access_token: tokenResponse.accessToken,
              refresh_token: tokenResponse.refreshToken, // Available in PKCE flow
              expires_in: expiresIn,
              expiration_time: Date.now() + expiresIn * 1000,
            };
            await SecureStore.setItemAsync(
              TOKEN_KEY,
              JSON.stringify(tokenData)
            );
            console.log("Token successfully saved to SecureStore.");
            setIsLoggedIn(true);
            router.replace("/");
          } catch (error: any) {
            console.error("Error exchanging code:", error);
            const errorMessage =
              error?.message || error?.error || "Unknown error";
            console.error("=== TOKEN EXCHANGE ERROR ===");
            console.error("Full error:", JSON.stringify(error, null, 2));
            console.error("Error message:", errorMessage);
            console.error(
              "Client ID used:",
              CLIENT_ID ? `${CLIENT_ID.substring(0, 10)}...` : "MISSING"
            );
            console.error("Redirect URI used:", REDIRECT_URI);
            console.error(
              "Code verifier:",
              request?.codeVerifier ? "Present" : "Missing"
            );

            if (
              errorMessage.includes("INVALID_CLIENT") ||
              errorMessage.includes("invalid_client")
            ) {
              Alert.alert(
                "Token Exchange Error - INVALID_CLIENT",
                `Invalid client during token exchange.\n\n` +
                  `Debug Info:\n` +
                  `- Client ID: ${
                    CLIENT_ID
                      ? "Set (" + CLIENT_ID.length + " chars)"
                      : "MISSING"
                  }\n` +
                  `- Redirect URI: ${REDIRECT_URI}\n` +
                  `- Error: ${errorMessage}\n\n` +
                  `This usually means:\n` +
                  `1. Client ID doesn't match Spotify Dashboard\n` +
                  `2. Redirect URI doesn't match exactly\n` +
                  `3. Client secret is required (but PKCE shouldn't need it)`,
                [{ text: "OK" }]
              );
            } else {
              Alert.alert(
                "Token Exchange Error",
                `Failed to exchange authorization code:\n\n${errorMessage}\n\nFull error logged to console.`,
                [{ text: "OK" }]
              );
            }
          }
        }
        exchangeCode();
      }
    } else if (response?.type === "error") {
      console.error("=== AUTH ERROR DETECTED ===");
      console.error(
        "Full error object:",
        JSON.stringify(response.error, null, 2)
      );
      console.error("Error code:", response.error?.code);
      console.error("Error message:", response.error?.message);
      console.error("Error description:", response.error?.description);
      console.error("Error params:", JSON.stringify(response.params, null, 2));

      const errorCode = response.error?.code;
      const errorMessage =
        response.error?.message ||
        response.error?.description ||
        response.params?.error ||
        "Unknown error";

      const errorDetails = response.params?.error_description || "";

      console.error("=== ERROR DIAGNOSTICS ===");
      console.error(
        "Client ID being used:",
        CLIENT_ID
          ? `${CLIENT_ID.substring(0, 10)}... (length: ${CLIENT_ID.length})`
          : "MISSING"
      );
      console.error("Redirect URI being used:", REDIRECT_URI);
      console.error(
        "Expected redirect URI in Spotify Dashboard: tunetrack://redirect"
      );
      console.error(
        "Do they match?",
        REDIRECT_URI === "tunetrack://redirect"
          ? "YES"
          : `NO - Got: ${REDIRECT_URI}`
      );
      console.error("===========================");

      if (
        errorCode === "INVALID_CLIENT" ||
        errorMessage.includes("INVALID_CLIENT") ||
        errorMessage.includes("invalid_client")
      ) {
        Alert.alert(
          "Authentication Error - INVALID_CLIENT",
          `Invalid client configuration detected.\n\n` +
            `Debug Info:\n` +
            `- Client ID: ${
              CLIENT_ID ? "Set (" + CLIENT_ID.length + " chars)" : "MISSING"
            }\n` +
            `- Redirect URI: ${REDIRECT_URI}\n` +
            `- Error: ${errorMessage}\n` +
            `- Details: ${errorDetails}\n\n` +
            `Please check:\n` +
            `1. Client ID in .env matches Spotify Dashboard\n` +
            `2. Add this exact redirect URI to Spotify:\n   ${REDIRECT_URI}\n` +
            `3. Ensure app is not in development mode restrictions`,
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Authentication Error",
          `Failed to authenticate with Spotify:\n\n${errorMessage}\n\nDetails: ${errorDetails}`,
          [{ text: "OK" }]
        );
      }
    } else {
      console.log("No valid auth response yet.");
    }
  }, [response, request]);

  async function handleSpotifyLogin() {
    console.log("=== LOGIN BUTTON PRESSED ===");
    console.log("Request ready:", !!request);
    console.log(
      "Client ID:",
      CLIENT_ID ? `${CLIENT_ID.substring(0, 10)}...` : "MISSING"
    );
    console.log("Redirect URI:", REDIRECT_URI);

    if (!CLIENT_ID) {
      console.error("ERROR: Client ID is missing!");
      Alert.alert(
        "Configuration Error",
        "Spotify Client ID is not configured.\n\nPlease set EXPO_PUBLIC_SPOTIFY_CLIENT_ID in your .env file and restart the app."
      );
      return;
    }

    if (!request) {
      console.warn("WARNING: Auth request not ready yet.");
      Alert.alert(
        "Not Ready",
        "Authentication request is not ready. Please wait a moment and try again."
      );
      return;
    }

    console.log("Calling promptAsync()...");
    try {
      const result = await promptAsync();
      console.log("promptAsync result:", result);
    } catch (error) {
      console.error("Error calling promptAsync:", error);
      Alert.alert("Error", `Failed to open authentication: ${error}`);
    }
  }

  async function checkTokenOnLoad() {
    console.log("Checking existing Spotify token in SecureStore...");
    const data = await SecureStore.getItemAsync(TOKEN_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      console.log("Stored token data:", parsed);
      if (parsed.expiration_time > Date.now()) {
        setIsLoggedIn(true);
        console.log("Token is still valid.");
      } else {
        console.log("Token has expired.");
      }
    } else {
      console.log("No token found.");
    }
  }

  useEffect(() => {
    checkTokenOnLoad();
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <ThemedText type="default" style={styles.title}>
            {t("spotify_connect_title")}
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            {t("spotify_connect_subtitle")}
          </ThemedText>
        </View>

        <View style={styles.container}>
          {!isLoggedIn ? (
            <AppButton
              style={styles.menuButton}
              title={t("spotify_connect_connect")}
              onPress={handleSpotifyLogin}
            />
          ) : (
            <AppButton
              style={styles.menuButton}
              title={t("spotify_connect_already")}
              onPress={() => router.back()}
            />
          )}
        </View>
      </GradientBackground>
    </View>
  );
}

export default SpotifyConnectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    lineHeight: 46,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "#3535357d",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    marginBottom: 30,
  },
  menuButton: { paddingHorizontal: 10, width: "70%", marginBottom: 20 },
});
