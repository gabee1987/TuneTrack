import "dotenv/config";

const spotifyClientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const isEASBuild = process.env.EAS_BUILD === "true";

// Validate Spotify Client ID (only for local builds, EAS secrets are injected during build)
if (!spotifyClientId && !isEASBuild) {
  console.error(
    "\n❌ Configuration Error:\n" +
      "Spotify Client ID is missing. Please configure EXPO_PUBLIC_SPOTIFY_CLIENT_ID in your environment variables.\n\n" +
      "For local development, create a .env file in the project root with:\n" +
      "  EXPO_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID\n\n" +
      "For EAS builds, set it as a secret using:\n" +
      "  eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_CLIENT_ID\n\n"
  );
  throw new Error(
    "Spotify Client ID is missing. Please configure EXPO_PUBLIC_SPOTIFY_CLIENT_ID."
  );
}

// Warn if missing in EAS build (secrets should be configured)
if (!spotifyClientId && isEASBuild) {
  console.warn(
    "\n⚠️  Warning: EXPO_PUBLIC_SPOTIFY_CLIENT_ID is not set.\n" +
      "Make sure you've set it as an EAS secret:\n" +
      "  eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_CLIENT_ID\n\n"
  );
}

export default {
  expo: {
    name: "TuneTrack",
    slug: "tunetrack",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "tunetrack",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.gabee1987.tunetrack",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["CAMERA"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow TuneTrack to access your camera",
          recordAudioAndroid: false,
        },
      ],
      "expo-secure-store",
      "expo-localization",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      spotifyClientId,
      spotifyRedirectUri: "tunetrack://redirect", // For testing only
      eas: {
        projectId: "60653866-b625-4057-a406-77ce83ab8688",
      },
    },
  },
};
