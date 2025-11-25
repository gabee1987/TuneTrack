# Environment Variables Guide for TuneTrack

This guide explains how to manage environment variables for different build environments.

## Overview

TuneTrack uses environment variables for:
- **Spotify Client ID**: Required for Spotify API integration

## Environment Variable: `EXPO_PUBLIC_SPOTIFY_CLIENT_ID`

### What it is
Your Spotify API client ID, obtained from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### Why it's needed
- Required for Spotify OAuth authentication
- Used to connect users' Spotify accounts
- Enables music playback features

### How to get it
1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Create a new app (or use existing)
4. Copy the "Client ID"
5. Add your redirect URI: `tunetrack://redirect`

---

## Setup for Different Environments

### 1. Local Development

**Create `.env` file in project root:**

```env
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
```

**Important:**
- ✅ `.env` is already in `.gitignore` (won't be committed)
- ✅ Copy from `.env.example` as a template
- ✅ Never commit your actual `.env` file

**Usage:**
```bash
# Start development server
npm start
# or
npx expo start
```

The app will automatically load variables from `.env` file.

---

### 2. EAS Builds (Production/Preview)

**Set up EAS Secret:**

```bash
# Login to EAS (if not already)
eas login

# Create the secret
eas secret:create \
  --scope project \
  --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID \
  --value your_actual_spotify_client_id
```

**Verify it's set:**
```bash
eas secret:list
```

**How it works:**
- EAS automatically injects secrets during build
- Secrets are encrypted and stored securely
- Only accessible during build time
- Never exposed in client code (if using `EXPO_PUBLIC_` prefix, it IS exposed - this is intentional for client-side API keys)

**Note:** Variables prefixed with `EXPO_PUBLIC_` are embedded in the app bundle and are visible to users. This is fine for Spotify Client ID (it's meant to be public), but don't use this prefix for secret keys.

---

### 3. CI/CD (if using)

If you set up continuous integration:

**GitHub Actions example:**
```yaml
env:
  EXPO_PUBLIC_SPOTIFY_CLIENT_ID: ${{ secrets.SPOTIFY_CLIENT_ID }}
```

**Other CI platforms:**
- Set as environment variable in CI configuration
- Use CI's secret management system

---

## Current Configuration

### How it's loaded

Your `app.config.js` loads the variable in this order:
1. From `process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID` (from `.env` or EAS secrets)
2. Validates that it exists (throws error if missing in local dev)
3. Makes it available via `expo.extra.spotifyClientId`

### How it's used

In `modules/spotify/config/spotifyConfig.ts`:
- Reads from `Constants.expoConfig?.extra?.spotifyClientId`
- Falls back to `process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID`
- Used for Spotify OAuth configuration

---

## Security Best Practices

### ✅ Safe to expose (using `EXPO_PUBLIC_` prefix):
- Spotify Client ID (meant to be public)
- Public API keys
- Non-sensitive configuration

### ❌ Never expose (don't use `EXPO_PUBLIC_` prefix):
- Secret keys
- API secrets
- Private tokens
- Database passwords
- OAuth client secrets

### For sensitive data:
- Use server-side API
- Store in EAS secrets without `EXPO_PUBLIC_` prefix
- Access via secure API calls from your backend

---

## Troubleshooting

### Issue: "Spotify Client ID is missing"

**Local development:**
```bash
# Check if .env file exists
ls -la .env

# Create .env file
cp .env.example .env
# Edit .env and add your Client ID
```

**EAS builds:**
```bash
# Check if secret is set
eas secret:list

# If missing, create it
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_ID
```

### Issue: "Invalid client_id" from Spotify

**Solutions:**
1. Verify Client ID is correct (no extra spaces)
2. Check redirect URI matches in Spotify dashboard
3. Ensure app is not in development mode restrictions
4. Verify Client ID is for the correct Spotify app

### Issue: Variable not loading in app

**Check:**
1. Restart development server after changing `.env`
2. Clear cache: `npx expo start -c`
3. Verify variable name matches exactly (case-sensitive)
4. Check `app.config.js` is reading it correctly

---

## Adding New Environment Variables

### Step 1: Add to `.env.example`
```env
EXPO_PUBLIC_NEW_VARIABLE=example_value
```

### Step 2: Update `app.config.js`
```javascript
const newVariable = process.env.EXPO_PUBLIC_NEW_VARIABLE;

export default {
  expo: {
    // ... other config
    extra: {
      spotifyClientId,
      newVariable, // Add here
    },
  },
};
```

### Step 3: Set in EAS (for production)
```bash
eas secret:create --scope project --name EXPO_PUBLIC_NEW_VARIABLE --value your_value
```

### Step 4: Use in code
```typescript
import Constants from 'expo-constants';

const value = Constants.expoConfig?.extra?.newVariable;
```

---

## Quick Reference

### Local Development
```bash
# Create .env file
cp .env.example .env
# Edit .env with your values
# Start app
npm start
```

### EAS Builds
```bash
# Set secret
eas secret:create --scope project --name EXPO_PUBLIC_SPOTIFY_CLIENT_ID --value YOUR_ID

# Verify
eas secret:list

# Build
eas build --platform android --profile production
```

### Check Current Values
```bash
# Local: Check .env file
cat .env

# EAS: List all secrets
eas secret:list
```

---

## Files Reference

- **`.env`**: Local development variables (gitignored)
- **`.env.example`**: Template for environment variables
- **`app.config.js`**: Loads and validates environment variables
- **`.gitignore`**: Ensures `.env` is not committed

---

## Additional Resources

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [EAS Secrets](https://docs.expo.dev/build-reference/variables/)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

---

**Remember:** 
- Never commit `.env` files
- Use EAS secrets for production builds
- Restart dev server after changing `.env`
- Keep `.env.example` updated as a template

