# Build Configuration Guide

This document explains the build configuration for TuneTrack and how it's set up for Google Play Store releases.

## Current Build Setup

### EAS Build Configuration (`eas.json`)

Your app uses EAS (Expo Application Services) for building. This is the recommended approach for Expo apps.

**Current profiles:**

1. **development**: For development builds with dev client
2. **preview**: For internal testing (APK format)
3. **production**: For Play Store submission (AAB format) ✅

**Key configuration:**
```json
{
  "production": {
    "autoIncrement": true,  // Automatically increments versionCode
    "android": {
      "buildType": "app-bundle"  // AAB format required for Play Store
    }
  }
}
```

### Why AAB instead of APK?

- **AAB (Android App Bundle)**: Required by Google Play Store
  - Google optimizes the app for each device
  - Smaller download sizes for users
  - Better performance

- **APK**: Used for direct installation
  - Good for internal testing
  - Not accepted by Play Store for new apps

---

## Local Build Configuration (`android/app/build.gradle`)

### Current Setup

**Important Note:** The `build.gradle` file shows debug signing for release builds. This is **OK** because:

1. **EAS builds override this**: When building with EAS, your production keystore is used automatically
2. **Local builds**: This file is mainly for local development/testing
3. **Production builds**: Always use EAS, which handles signing correctly

### Signing Configuration

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.debug  // OK for local builds
    }
}
```

**For production:** EAS uses its own signing configuration, so this doesn't affect Play Store builds.

---

## Version Management

### Version Numbers

Your app uses two version numbers:

1. **Version Name** (`version` in `app.config.js`):
   - User-facing version: `"1.0.0"`
   - Semantic versioning: `MAJOR.MINOR.PATCH`
   - Example: `1.0.0` → `1.0.1` → `1.1.0` → `2.0.0`

2. **Version Code** (`versionCode` in `app.config.js`):
   - Internal version: `1`
   - Must be an integer
   - Must increase with each release: `1` → `2` → `3` → ...
   - Play Store uses this to determine which version is newer

### Auto-Increment

Your `eas.json` has `"autoIncrement": true` for production builds:
- EAS automatically increments `versionCode` for each build
- You still need to manually update `version` (the user-facing version)

### Updating Versions

**Before each release:**

1. Update `version` in `app.config.js`:
   ```javascript
   version: "1.0.1",  // New user-facing version
   ```

2. EAS will auto-increment `versionCode` (or update manually):
   ```javascript
   android: {
     versionCode: 2,  // Increment manually if autoIncrement is disabled
   }
   ```

---

## Build Profiles Explained

### Development Profile

**Purpose:** Development builds with dev client

**Configuration:**
```json
"development": {
  "developmentClient": true,
  "distribution": "internal"
}
```

**Use when:**
- Developing new features
- Testing with hot reload
- Debugging

**Build command:**
```bash
eas build --platform android --profile development
```

---

### Preview Profile

**Purpose:** Internal testing builds

**Configuration:**
```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

**Use when:**
- Testing before production
- Sharing with testers
- Internal QA

**Build command:**
```bash
eas build --platform android --profile preview
```

**Output:** APK file (can be installed directly)

---

### Production Profile

**Purpose:** Play Store submission

**Configuration:**
```json
"production": {
  "autoIncrement": true,
  "android": {
    "buildType": "app-bundle"
  }
}
```

**Use when:**
- Submitting to Play Store
- Production releases
- Public distribution

**Build command:**
```bash
eas build --platform android --profile production
```

**Output:** AAB file (upload to Play Store)

---

## Build Process

### Step-by-Step Production Build

1. **Update version numbers:**
   ```javascript
   // app.config.js
   version: "1.0.0",
   android: {
     versionCode: 1,  // Will auto-increment if enabled
   }
   ```

2. **Verify EAS secrets:**
   ```bash
   eas secret:list
   ```

3. **Build:**
   ```bash
   eas build --platform android --profile production
   ```

4. **Wait for build** (10-20 minutes):
   - Build runs on EAS servers
   - You'll get email notification when done
   - Check status: https://expo.dev

5. **Download AAB:**
   ```bash
   eas build:list
   eas build:download [BUILD_ID]
   ```

6. **Upload to Play Store:**
   - Go to Play Console
   - Create new release
   - Upload AAB file

---

## Build Optimization

### Current Optimizations

Your build is configured with:

1. **ProGuard/R8** (optional, can be enabled):
   - Code minification
   - Dead code elimination
   - Smaller APK/AAB size

2. **Resource shrinking** (optional):
   - Removes unused resources
   - Reduces app size

3. **PNG crunching** (enabled by default):
   - Compresses PNG images
   - Smaller app size

### Enabling ProGuard

To enable code minification, add to `android/gradle.properties`:
```properties
android.enableProguardInReleaseBuilds=true
android.enableShrinkResourcesInReleaseBuilds=true
```

**Note:** Test thoroughly after enabling, as it can sometimes break code if not configured correctly.

---

## Troubleshooting

### Issue: Build fails with "Missing secret"

**Solution:**
```bash
# Set missing secret
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_VALUE

# Verify
eas secret:list
```

### Issue: "Version code already used"

**Solution:**
- EAS auto-increment should handle this
- If disabled, manually increment `versionCode` in `app.config.js`

### Issue: Build takes too long

**Solutions:**
- Normal build time: 10-20 minutes
- Check EAS status page for issues
- Try building during off-peak hours

### Issue: AAB file too large

**Solutions:**
- Enable ProGuard/R8
- Enable resource shrinking
- Remove unused assets
- Optimize images

---

## Local vs EAS Builds

### Local Builds (`expo run:android`)

- Uses `android/app/build.gradle` configuration
- Uses debug keystore
- Good for development
- **Not for Play Store submission**

### EAS Builds (`eas build`)

- Uses EAS build servers
- Uses production keystore (managed by EAS)
- Optimized for production
- **Required for Play Store submission**

**Always use EAS builds for production!**

---

## Quick Reference

### Build Commands

```bash
# Development build
eas build --platform android --profile development

# Preview build (APK)
eas build --platform android --profile preview

# Production build (AAB)
eas build --platform android --profile production

# List builds
eas build:list

# Download build
eas build:download [BUILD_ID]
```

### Check Build Status

- Web: https://expo.dev/accounts/[your-account]/projects/tunetrack/builds
- CLI: `eas build:list`

### View Build Logs

```bash
eas build:view [BUILD_ID]
```

---

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
- [Versioning Best Practices](https://developer.android.com/studio/publish/versioning)

---

**Remember:**
- Always use EAS builds for production
- AAB format is required for Play Store
- Version code must increase with each release
- Test preview builds before production

