# Google Play Store Release Guide for TuneTrack

This comprehensive guide will walk you through every step needed to prepare and publish your TuneTrack app to the Google Play Store.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [App Assets & Icons](#app-assets--icons)
3. [App Signing Setup](#app-signing-setup)
4. [Environment Variables & Secrets](#environment-variables--secrets)
5. [Build Configuration](#build-configuration)
6. [App Metadata & Store Listing](#app-metadata--store-listing)
7. [Privacy Policy & Permissions](#privacy-policy--permissions)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [Building the Production App](#building-the-production-app)
10. [Submitting to Google Play Store](#submitting-to-google-play-store)
11. [Post-Submission Checklist](#post-submission-checklist)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Google Play Developer Account ($25 one-time fee)
- ✅ EAS (Expo Application Services) account (free tier available)
- ✅ Expo CLI installed: `npm install -g eas-cli`
- ✅ EAS CLI logged in: `eas login`
- ✅ Your app's Spotify Client ID and any other API keys

---

## 1. App Assets & Icons

### Required Icon Sizes

Google Play Store requires specific icon sizes. Your current setup uses:

- **Icon**: `./assets/images/icon.png` (1024x1024px recommended)
- **Adaptive Icon**: `./assets/images/adaptive-icon.png` (1024x1024px)

#### Icon Requirements:

1. **App Icon** (`icon.png`):

   - Size: 1024x1024 pixels
   - Format: PNG (no transparency)
   - Background: Solid color or design
   - No rounded corners (Play Store will add them)

2. **Adaptive Icon** (`adaptive-icon.png`):

   - Size: 1024x1024 pixels
   - Format: PNG
   - Safe zone: Keep important content within 512x512 center area
   - Background color: Defined in `app.config.js` (currently `#ffffff`)

3. **Feature Graphic** (for Play Store listing):

   - Size: 1024x500 pixels
   - Format: PNG or JPG
   - Used as the banner image on your Play Store listing

4. **Screenshots** (required):

   - Phone screenshots: At least 2, up to 8
   - Minimum: 320px width
   - Maximum: 3840px width
   - Aspect ratio: 16:9 or 9:16
   - Format: PNG or JPG (24-bit color)
   - **Recommended sizes:**
     - Phone: 1080x1920px (portrait) or 1920x1080px (landscape)
     - Tablet (optional): 1200x1920px or 1920x1200px

5. **High-res Icon** (optional but recommended):
   - Size: 512x512 pixels
   - Format: PNG

### Creating Your Icons

**Tools you can use:**

- [Figma](https://www.figma.com/) - Free design tool
- [Canva](https://www.canva.com/) - Easy icon creation
- [App Icon Generator](https://www.appicon.co/) - Online generator
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/) - Google's official tool

**Steps:**

1. Design your icon at 1024x1024px
2. Export as PNG
3. Replace `./assets/images/icon.png` and `./assets/images/adaptive-icon.png`
4. Update `backgroundColor` in `app.config.js` if needed

---

## 2. App Signing Setup

### Option A: EAS Managed Signing (Recommended)

EAS can automatically manage your app signing keys. This is the easiest and most secure option.

**Setup:**

1. No additional setup needed! EAS will generate and manage keys automatically
2. Keys are stored securely in EAS servers
3. You can download the keystore if needed later

**To enable:**

- Already configured if you're using EAS builds
- Keys are generated on first production build

### Option B: Manual Signing (Advanced)

If you prefer to manage your own keys:

**Generate a keystore:**

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore tunetrack-release-key.keystore -alias tunetrack-key -keyalg RSA -keysize 2048 -validity 10000
```

**Important:**

- Store the keystore file securely (never commit to git!)
- Save the password and alias in a secure password manager
- Back up the keystore file in multiple secure locations
- **If you lose this keystore, you cannot update your app on Play Store!**

**Add to EAS:**

```bash
eas credentials
# Select Android > Production > Set up keystore
# Upload your keystore file
```

---

## 3. Environment Variables & Secrets

### Current Setup

Your app uses:

- `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` - Spotify API client ID

### Setting Up EAS Secrets

**For Production Builds:**

1. **Set Spotify Client ID secret:**

   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_SPOTIFY_CLIENT_ID
   ```

2. **Verify secrets are set:**

   ```bash
   eas secret:list
   ```

3. **For local development**, create a `.env` file (DO NOT commit this):

   ```env
   EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
   ```

4. **Add `.env` to `.gitignore`** (if not already):
   ```
   .env
   .env.local
   .env.*.local
   ```

### Environment-Specific Configuration

Your `app.config.js` already handles this correctly:

- Local builds: Reads from `.env` file
- EAS builds: Reads from EAS secrets
- Validates that secrets exist before building

---

## 4. Build Configuration

### Update EAS Configuration

Your `eas.json` needs to be updated for Play Store submission. The Play Store requires **AAB (Android App Bundle)** format, not APK.

**Current issue:** Your production build is set to `apk`, but Play Store requires `aab`.

**Already fixed in the updated `eas.json`** - see the updated file.

### Build Profiles Explained

- **development**: For testing with development client
- **preview**: For internal testing (APK format)
- **production**: For Play Store submission (AAB format)

---

## 5. App Metadata & Store Listing

### Required Information

Prepare the following for your Play Store listing:

#### 1. **App Name**

- Current: "TuneTrack"
- Maximum: 50 characters
- Should match your app's display name

#### 2. **Short Description**

- Maximum: 80 characters
- Appears in search results
- Example: "Track and discover music with QR codes and Spotify integration"

#### 3. **Full Description**

- Maximum: 4000 characters
- Should include:
  - What your app does
  - Key features
  - How to use it
  - Any special requirements

**Example:**

```
TuneTrack is a modern music discovery app that lets you track and share your favorite songs using QR codes.

Features:
• Scan QR codes to discover new music
• Seamless Spotify integration
• Track your listening history
• Share music with friends
• Beautiful, modern interface
• Support for multiple languages

Perfect for music lovers who want to discover and share new tracks easily.
```

#### 4. **App Category**

- Primary: Music & Audio
- Secondary: Entertainment (optional)

#### 5. **Content Rating**

- You'll need to complete a questionnaire
- Questions about:
  - User-generated content
  - Social features
  - Location sharing
  - etc.

#### 6. **Privacy Policy URL** (REQUIRED)

- Must be publicly accessible
- Must cover:
  - What data you collect
  - How you use it
  - Third-party services (Spotify)
  - User rights
- Can be hosted on:
  - Your website
  - GitHub Pages
  - Google Sites
  - Privacy policy generators

#### 7. **Contact Information**

- Email address (will be public)
- Website (optional)
- Phone number (optional)

#### 8. **Graphics**

- Feature graphic: 1024x500px
- Screenshots: 2-8 images
- High-res icon: 512x512px (optional)

---

## 6. Privacy Policy & Permissions

### Current Permissions

Your app requests:

- `CAMERA` - For QR code scanning and gameplay camera features (required)
- `INTERNET` - For API calls
- `READ_EXTERNAL_STORAGE` - For file access
- `WRITE_EXTERNAL_STORAGE` - For file saving

Note: `RECORD_AUDIO` / microphone permission is NOT requested in production builds. If you later add an audio-recording feature, you must update the manifest, the privacy policy, and the Play Console data safety section.

### Privacy Policy Requirements

Your privacy policy must explain:

1. **Data Collection:**

   - What data you collect (if any)
   - Camera usage for QR scanning
   - Spotify authentication data
   - Any analytics or crash reporting

2. **Third-Party Services:**

   - Spotify API usage
   - Their privacy policy link
   - Data shared with Spotify

3. **Data Storage:**

   - Where data is stored (local device, cloud, etc.)
   - How long data is retained

4. **User Rights:**
   - How to delete data
   - How to opt-out
   - Contact information

### Sample Privacy Policy Template

You can use this as a starting point (customize for your app):

```
Privacy Policy for TuneTrack

Last updated: [Date]

1. Information We Collect
   - Camera access: Used solely for QR code scanning
   - Spotify authentication: Managed by Spotify's OAuth
   - No personal data is collected or stored by our servers

2. How We Use Information
   - Camera: Only for scanning QR codes
   - Spotify data: Used to display your music preferences

3. Third-Party Services
   - Spotify: We use Spotify API for music features
   - See Spotify's privacy policy: https://www.spotify.com/legal/privacy-policy/

4. Data Storage
   - All data is stored locally on your device
   - We do not store your data on our servers

5. Your Rights
   - You can revoke Spotify access at any time
   - You can uninstall the app to remove all local data

6. Contact Us
   - Email: [your-email@example.com]
```

**Where to host:**

- Create a simple HTML page
- Host on GitHub Pages, Netlify, or your own domain
- Make sure the URL is publicly accessible

---

## 7. Testing & Quality Assurance

### Pre-Release Testing Checklist

Before submitting, test thoroughly:

#### Functional Testing

- [ ] App launches without crashes
- [ ] QR code scanning works
- [ ] Spotify authentication works
- [ ] All screens load correctly
- [ ] Navigation works smoothly
- [ ] Language switching works (if applicable)
- [ ] Settings are saved correctly

#### Device Testing

- [ ] Test on different Android versions (Android 8.0+)
- [ ] Test on different screen sizes
- [ ] Test in portrait and landscape (if supported)
- [ ] Test on low-end devices
- [ ] Test on high-end devices

#### Permission Testing

- [ ] Camera permission request works
- [ ] App handles permission denial gracefully
- [ ] App works if Spotify is not connected

#### Performance Testing

- [ ] App starts quickly (< 3 seconds)
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No excessive battery drain

#### Edge Cases

- [ ] Handle no internet connection
- [ ] Handle invalid QR codes
- [ ] Handle Spotify API errors
- [ ] Handle expired tokens

### Internal Testing

Use Google Play's internal testing track:

1. Build a preview APK:

   ```bash
   eas build --platform android --profile preview
   ```

2. Upload to Play Console > Testing > Internal testing
3. Add testers (up to 100)
4. Testers can download via Play Store link

---

## 8. Building the Production App

### Step-by-Step Build Process

#### 1. **Update Version Numbers**

Before building, update version in `app.config.js`:

```javascript
version: "1.0.0",  // User-facing version
android: {
  versionCode: 1,  // Increment for each release
}
```

**Versioning rules:**

- `version`: Semantic version (1.0.0, 1.0.1, 1.1.0, etc.)
- `versionCode`: Integer that must increase with each release (1, 2, 3, ...)

#### 2. **Verify EAS Secrets**

```bash
eas secret:list
```

Ensure `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` is set.

#### 3. **Build Production AAB**

```bash
eas build --platform android --profile production
```

This will:

- Create an Android App Bundle (AAB)
- Sign it with your production key
- Upload it to EAS servers
- Take 10-20 minutes

#### 4. **Download the Build**

After build completes:

```bash
eas build:list
eas build:download [BUILD_ID]
```

Or download from: https://expo.dev/accounts/[your-account]/projects/tunetrack/builds

---

## 9. Submitting to Google Play Store

### Step-by-Step Submission

#### 1. **Access Play Console**

Go to: https://play.google.com/console

#### 2. **Create New App**

1. Click "Create app"
2. Fill in:
   - App name: TuneTrack
   - Default language: English (or your primary language)
   - App or game: App
   - Free or paid: Free (or Paid)
   - Declarations: Check all that apply

#### 3. **Set Up Store Listing**

Fill in all required fields:

- App name
- Short description (80 chars)
- Full description (4000 chars)
- App icon (512x512px)
- Feature graphic (1024x500px)
- Screenshots (at least 2)
- Category
- Contact details

#### 4. **Set Up App Content**

- Privacy policy URL (REQUIRED)
- Content rating questionnaire
- Target audience
- Data safety section (new requirement)

#### 5. **Upload AAB**

1. Go to "Production" (or "Internal testing" first)
2. Click "Create new release"
3. Upload your AAB file
4. Add release notes:
   ```
   Initial release of TuneTrack
   - QR code music scanning
   - Spotify integration
   - Multi-language support
   ```
5. Review and roll out

#### 6. **Review Process**

- Google reviews typically take 1-7 days
- You'll receive email notifications
- Check Play Console for status updates

---

## 10. Post-Submission Checklist

After submitting:

- [ ] Monitor Play Console for review status
- [ ] Respond to any review feedback quickly
- [ ] Set up crash reporting (if not already)
- [ ] Monitor user reviews
- [ ] Prepare for potential issues
- [ ] Set up analytics (optional but recommended)

### Monitoring Your App

**Tools to consider:**

- **Expo Updates**: For OTA updates (if enabled)
- **Sentry**: For crash reporting
- **Firebase Analytics**: For usage analytics
- **Google Play Console**: For download stats and reviews

---

## Common Issues & Solutions

### Issue: Build fails with missing secrets

**Solution:** Run `eas secret:create` for all required environment variables

### Issue: App rejected for missing privacy policy

**Solution:** Ensure privacy policy URL is publicly accessible and covers all data usage

### Issue: App crashes on certain devices

**Solution:** Test on multiple devices, check device-specific logs, update dependencies

### Issue: Version code conflict

**Solution:** Increment `versionCode` in `app.config.js` for each new release

### Issue: AAB file too large

**Solution:**

- Enable ProGuard/R8 minification
- Remove unused assets
- Use Android App Bundle (already using AAB, which helps)

---

## Additional Resources

- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle)
- [Play Store Policy](https://play.google.com/about/developer-content-policy/)

---

## Quick Reference Commands

```bash
# Login to EAS
eas login

# Set environment secrets
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_VALUE

# List secrets
eas secret:list

# Build production AAB
eas build --platform android --profile production

# View builds
eas build:list

# Download build
eas build:download [BUILD_ID]

# Submit to Play Store (if configured)
eas submit --platform android
```

---

## Next Steps

1. ✅ Review this guide
2. ✅ Prepare app icons and screenshots
3. ✅ Set up EAS secrets
4. ✅ Create privacy policy
5. ✅ Test thoroughly
6. ✅ Build production AAB
7. ✅ Submit to Play Store

Good luck with your release! 🚀
