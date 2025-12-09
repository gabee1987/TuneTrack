# App Signing Guide for TuneTrack

This guide explains how app signing works for Android and how to set it up for your TuneTrack app.

## What is App Signing?

App signing is a security measure that ensures:
- The app hasn't been tampered with
- Updates come from the original developer
- Users can trust the app

**Important:** You must sign your app with the same key for all updates. If you lose your signing key, you cannot update your app on the Play Store!

## Signing Options

### Option 1: EAS Managed Signing (Recommended) ⭐

**Best for:** Most developers, especially beginners

**Advantages:**
- ✅ Automatic key management
- ✅ Secure storage on EAS servers
- ✅ No risk of losing keys
- ✅ Easy to use
- ✅ Can download keystore if needed

**How it works:**
1. EAS automatically generates a keystore on your first production build
2. Keys are stored securely on EAS servers
3. EAS signs your app automatically for each build
4. You can download the keystore anytime

**Setup:**
```bash
# No setup needed! Just build:
eas build --platform android --profile production
```

**To download your keystore (optional):**
```bash
eas credentials
# Select Android > Production > Download keystore
```

**When to use:** Use this unless you have specific requirements for managing your own keys.

---

### Option 2: Google Play App Signing (Recommended for Play Store)

**Best for:** Apps published to Google Play Store

**How it works:**
1. You upload your app with an upload key (can be managed by EAS)
2. Google signs your app with their own key for distribution
3. You can reset your upload key if lost
4. Google manages the final signing key

**Advantages:**
- ✅ Can reset upload key if lost
- ✅ Google manages the final signing key
- ✅ Better security
- ✅ Smaller APK sizes (optimized signing)

**Setup:**
1. Enable in Play Console when uploading first app
2. Google will generate an upload key or you can use EAS managed key
3. EAS can automatically use this setup

**When to use:** Always use this for Play Store apps (it's the default).

---

### Option 3: Manual Signing (Advanced)

**Best for:** Developers who need full control or have specific security requirements

**Advantages:**
- ✅ Full control over keys
- ✅ Can store keys in your own secure location
- ✅ Works with existing key management systems

**Disadvantages:**
- ❌ Risk of losing keys (cannot update app if lost!)
- ❌ More complex setup
- ❌ You're responsible for key security

**Setup Steps:**

#### 1. Generate a Keystore

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore tunetrack-release-key.keystore \
  -alias tunetrack-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**You'll be asked for:**
- Keystore password (save this securely!)
- Key password (can be same as keystore password)
- Your name
- Organizational unit
- Organization
- City
- State
- Country code (2 letters, e.g., US, HU)

**Important:** 
- Save the password in a secure password manager
- Back up the keystore file in multiple secure locations
- Never commit the keystore to git (it's already in .gitignore)

#### 2. Upload to EAS

```bash
eas credentials
# Select: Android
# Select: Production
# Select: Set up keystore
# Choose: Upload existing keystore
# Upload your keystore file
# Enter the password and alias
```

#### 3. Verify Setup

```bash
eas credentials
# Check that your keystore is listed
```

---

## Current Setup for TuneTrack

Based on your configuration, you're using:

✅ **EAS Managed Signing** (recommended)

Your `build.gradle` shows:
- Debug builds use `debug.keystore` (for development only)
- Release builds will use EAS managed signing (for production)

**This is the correct setup!** No changes needed.

---

## Key Management Best Practices

### 1. Backup Your Keys

**If using EAS Managed:**
- You can download the keystore anytime
- Consider downloading and backing up to secure storage

**If using Manual:**
- Store keystore in multiple secure locations
- Use encrypted storage (e.g., encrypted USB drive, cloud storage with encryption)
- Never store in version control

### 2. Document Key Information

Create a secure document (password protected) with:
- Keystore file location
- Keystore password
- Key alias
- Key password
- Generation date
- Who has access

### 3. Access Control

- Limit who has access to production keys
- Use secure password managers
- Rotate access when team members leave

### 4. Recovery Plan

- Know how to recover keys if lost
- For EAS: Can download anytime
- For Google Play App Signing: Can reset upload key
- For Manual: Must have backups!

---

## Troubleshooting

### Issue: "Keystore file not found"
**Solution:** 
- If using EAS: Run `eas credentials` to set up
- If using manual: Check file path and ensure it's uploaded to EAS

### Issue: "Wrong password"
**Solution:**
- Double-check password
- Ensure you're using the correct keystore file
- Check if password has special characters that need escaping

### Issue: "Cannot update app - signature mismatch"
**Solution:**
- You're using a different keystore than the original
- Must use the same keystore for all updates
- If lost, you cannot update (must create new app listing)

### Issue: "Want to use Google Play App Signing?"
**Solution:**
- This is recommended! Say yes when prompted in Play Console
- Google will manage the final signing key
- You can reset your upload key if needed

---

## Migration Between Signing Methods

### From Manual to EAS Managed

1. Download your current keystore
2. Upload to EAS:
   ```bash
   eas credentials
   # Upload existing keystore
   ```
3. EAS will use it for future builds

### From EAS Managed to Manual

1. Download keystore from EAS:
   ```bash
   eas credentials
   # Download keystore
   ```
2. Store securely
3. Configure EAS to use your keystore:
   ```bash
   eas credentials
   # Upload existing keystore
   ```

---

## Quick Reference

### Check Current Setup
```bash
eas credentials
```

### Download Keystore (EAS Managed)
```bash
eas credentials
# Select Android > Production > Download keystore
```

### Generate New Keystore (Manual)
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore tunetrack-release-key.keystore \
  -alias tunetrack-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### Verify Keystore
```bash
keytool -list -v -keystore tunetrack-release-key.keystore
```

---

## Recommendations for TuneTrack

**Recommended Setup:**
1. ✅ Use EAS Managed Signing (current setup)
2. ✅ Enable Google Play App Signing when uploading to Play Store
3. ✅ Download and backup the keystore after first build
4. ✅ Store backup in secure, encrypted location

**This gives you:**
- Ease of use (EAS manages everything)
- Security (Google manages final key)
- Recovery options (can reset upload key)
- Peace of mind (backup available)

---

## Additional Resources

- [Expo EAS Credentials Documentation](https://docs.expo.dev/app-signing/managed-credentials/)
- [Android App Signing Guide](https://developer.android.com/studio/publish/app-signing)
- [Google Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)

---

**Remember:** Your signing key is critical. Treat it like a password to your bank account. If you lose it, you cannot update your app!

