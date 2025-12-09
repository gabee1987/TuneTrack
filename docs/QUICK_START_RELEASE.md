# Quick Start: Google Play Store Release

This is a condensed guide to get you from zero to published on the Google Play Store. For detailed information, see the other guides.

## 🚀 5-Minute Setup

### Step 1: Set Up EAS Secrets (2 minutes)

```bash
# Login to EAS
eas login

# Set your Spotify Client ID
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_SPOTIFY_CLIENT_ID

# Verify it's set
eas secret:list
```

### Step 2: Prepare Your Assets (10-30 minutes)

**Required:**
- [ ] App icon: 1024x1024px PNG
- [ ] Adaptive icon: 1024x1024px PNG  
- [ ] Feature graphic: 1024x500px PNG/JPG
- [ ] At least 2 screenshots: 1080x1920px (portrait) or 1920x1080px (landscape)

**Where to put them:**
- Icons: Replace `./assets/images/icon.png` and `./assets/images/adaptive-icon.png`
- Feature graphic & screenshots: Save for Play Store upload (not in project)

### Step 3: Create Privacy Policy (15-30 minutes)

**Required!** You must have a publicly accessible privacy policy URL.

**Options:**
1. Create a simple HTML page and host on GitHub Pages
2. Use a privacy policy generator
3. Host on your own website

**Must include:**
- What data you collect (camera, Spotify)
- How you use it
- Third-party services (Spotify)
- User rights

See `GOOGLE_PLAY_STORE_RELEASE_GUIDE.md` for a template.

### Step 4: Build Production AAB (15-20 minutes)

```bash
# Make sure version is updated in app.config.js
# Then build:
eas build --platform android --profile production

# Wait for build to complete (check email or expo.dev)
# Download when ready:
eas build:list
eas build:download [BUILD_ID]
```

### Step 5: Submit to Play Store (30-60 minutes)

1. **Create app in Play Console:**
   - Go to https://play.google.com/console
   - Click "Create app"
   - Fill in basic info

2. **Complete Store Listing:**
   - App name, description, screenshots
   - Category, contact info
   - **Privacy policy URL (REQUIRED)**

3. **Upload AAB:**
   - Go to Production track
   - Create new release
   - Upload your AAB file
   - Add release notes

4. **Submit for Review:**
   - Complete content rating
   - Review all information
   - Submit for review

## ✅ Pre-Build Checklist

Before building, verify:

- [ ] Version updated in `app.config.js`
- [ ] EAS secrets configured (`eas secret:list`)
- [ ] App icons are ready
- [ ] Privacy policy URL is ready
- [ ] App tested on real device
- [ ] No console errors

## ✅ Pre-Submission Checklist

Before submitting:

- [ ] Store listing is 100% complete
- [ ] Privacy policy URL works
- [ ] Screenshots uploaded
- [ ] Content rating completed
- [ ] AAB file is production build
- [ ] Release notes written

## 📚 Detailed Guides

For more information, see:

- **`GOOGLE_PLAY_STORE_RELEASE_GUIDE.md`** - Complete step-by-step guide
- **`PRE_RELEASE_CHECKLIST.md`** - Detailed checklist
- **`APP_SIGNING_GUIDE.md`** - App signing explained
- **`ENVIRONMENT_VARIABLES_GUIDE.md`** - Environment setup
- **`BUILD_CONFIGURATION.md`** - Build configuration details

## 🆘 Common Issues

### "Missing secret" error
```bash
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_ID
```

### "Privacy policy required"
- Create privacy policy page
- Host it publicly (GitHub Pages, etc.)
- Add URL in Play Console

### "AAB required"
- Make sure `eas.json` has `"buildType": "app-bundle"` for production
- Use `--profile production` when building

### "Version code conflict"
- Increment `versionCode` in `app.config.js`
- Or enable `autoIncrement` in `eas.json` (already enabled)

## 🎯 Timeline Estimate

- **Setup (first time):** 1-2 hours
- **Each release:** 30-60 minutes
- **Review time:** 1-7 days (Google's review)

## 📞 Need Help?

- Check the detailed guides in this directory
- Expo docs: https://docs.expo.dev
- Play Console help: https://support.google.com/googleplay/android-developer

---

**You're ready! Start with Step 1 above.** 🚀

