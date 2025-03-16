import "dotenv/config";

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
      package: "com.mycompany.myapp",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["CAMERA", "RECORD_AUDIO"],
      package: "com.gabee1987.tunetrack",
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
          microphonePermission: "Allow TuneTrack to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      "expo-secure-store",
      "expo-localization",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      spotifyClientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
      //   spotifyRedirectUri: process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI,
      spotifyRedirectUri: "tunetrack://redirect", // For testing only
    },
  },
};
