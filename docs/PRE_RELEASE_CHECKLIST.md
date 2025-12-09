# Pre-Release Checklist for Google Play Store

Use this checklist to ensure your app is ready for submission.

## 📋 Pre-Build Checklist

### Configuration
- [ ] Version number updated in `app.config.js` (`version` and `versionCode`)
- [ ] App name is correct and within 50 characters
- [ ] Package name is correct (`com.gabee1987.tunetrack`)
- [ ] EAS secrets are configured (`EXPO_PUBLIC_SPOTIFY_CLIENT_ID`)
- [ ] `eas.json` is configured for AAB builds (production profile)

### Assets
- [ ] App icon (1024x1024px) is ready and professional
- [ ] Adaptive icon (1024x1024px) is ready
- [ ] Splash screen looks good
- [ ] Feature graphic (1024x500px) is created
- [ ] At least 2 screenshots are prepared (1080x1920px recommended)
- [ ] All graphics are optimized (not too large file sizes)

### Code & Functionality
- [ ] All features work correctly
- [ ] No console errors or warnings
- [ ] App handles errors gracefully
- [ ] Permissions are properly requested
- [ ] App works offline (if applicable)
- [ ] No hardcoded test data or API keys
- [ ] Environment variables are properly configured

### Testing
- [ ] Tested on Android 8.0+ (minimum SDK)
- [ ] Tested on different screen sizes
- [ ] Tested camera functionality
- [ ] Tested Spotify integration
- [ ] Tested QR code scanning
- [ ] Tested language switching (if applicable)
- [ ] Tested with and without internet connection
- [ ] No crashes during testing

## 📋 Pre-Submission Checklist

### Store Listing Content
- [ ] App name (50 chars max)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] App category selected
- [ ] Contact email address
- [ ] Privacy policy URL (REQUIRED - must be publicly accessible)
- [ ] Website URL (optional)

### Graphics
- [ ] App icon uploaded (512x512px)
- [ ] Feature graphic uploaded (1024x500px)
- [ ] At least 2 screenshots uploaded
- [ ] All graphics meet size requirements
- [ ] Graphics are high quality and professional

### App Content
- [ ] Content rating questionnaire completed
- [ ] Target audience defined
- [ ] Data safety section completed
- [ ] App access restrictions (if any) declared

### Legal & Compliance
- [ ] Privacy policy is complete and accurate
- [ ] Privacy policy covers all data collection
- [ ] Privacy policy mentions Spotify integration
- [ ] All required permissions are justified
- [ ] App complies with Google Play policies

### Build
- [ ] Production AAB is built successfully
- [ ] AAB file is downloaded
- [ ] Version code is incremented from previous release
- [ ] Build is tested on a real device before submission

## 📋 Submission Checklist

### In Play Console
- [ ] App created in Play Console
- [ ] Store listing is 100% complete
- [ ] Production track is set up
- [ ] AAB file is uploaded
- [ ] Release notes are written
- [ ] App is set to "Ready to publish" or staged rollout

### Final Verification
- [ ] All information is accurate
- [ ] No placeholder text remains
- [ ] Contact information is correct
- [ ] Privacy policy URL works
- [ ] Screenshots show actual app functionality
- [ ] App description matches actual features

## 📋 Post-Submission Checklist

### Monitoring
- [ ] Check Play Console daily for review status
- [ ] Monitor for any rejection reasons
- [ ] Respond to any Google questions promptly
- [ ] Check email for notifications

### After Approval
- [ ] Verify app appears in Play Store
- [ ] Test download and installation
- [ ] Monitor user reviews
- [ ] Set up crash reporting (if not already)
- [ ] Prepare for first update (if needed)

## 🚨 Common Issues to Avoid

- ❌ Missing privacy policy URL
- ❌ Using APK instead of AAB for production
- ❌ Not incrementing version code
- ❌ Hardcoded API keys in code
- ❌ Missing or broken screenshots
- ❌ Incomplete store listing
- ❌ Not testing on real devices
- ❌ Using debug keystore for production

## 📝 Notes

- Keep this checklist updated as you complete items
- Save a copy of your keystore password securely
- Document any issues encountered during submission
- Keep track of version numbers for future releases

---

**Last Updated:** [Date]
**Current Version:** 1.0.0
**Version Code:** 1

