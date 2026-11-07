# Gillou — store release kit (v2.0.0, October 2026)

Everything needed to publish `be.am.e.dev.gillou` on Google Play and the App Store.
Tracked here: texts, icons, feature graphic, privacy policy, the screenshots of `playstore/2026-10/`. Untracked (release binaries, ignored by git): the `.apk` and `.aab` bundles.

## ⚠️ Package change
The previous build (Feb 2025) used `am.e.dev.gillou`. The new id `be.am.e.dev.gillou` is a **different app** for both stores:
existing Play users will not receive this as an update, and the old listing stays as it is. If the old app is live, either
unpublish it after the new one is out, or point its description to the new one.

## What is where
| Item | Path |
|---|---|
| Signed release bundle (upload this to Play) | `playstore/2026-10/android/gillou-2.0.0-2-release.aab` |
| Signed release APK (sideload / device test) | `playstore/2026-10/android/gillou-2.0.0-2-release.apk` |
| Upload keystore + passwords (NOT in git, back them up!) | `android/keystore/gillou-upload.jks`, `android/key.properties` |
| Play icon 512×512 (no alpha) | `store/graphics/play-store-icon-512.png` |
| Play feature graphic 1024×500 | `store/graphics/feature-graphic-1024x500.png` |
| App Store icon 1024×1024 (no alpha) | `store/graphics/app-store-icon-1024.png` |
| Play screenshots: phone 1080×2400 (8), 7" 1200×1920 (6), 10" 2048×1536 (6) | `playstore/2026-10/play/` |
| App Store screenshots: iPhone 6.9" 1320×2868 (8), 6.5" 1284×2778 (8), iPad 13" 2064×2752 (6) | `playstore/2026-10/app-store/` |
| Play listing texts + content questionnaire answers | `store/play/listing-fr.md` |
| App Store listing texts + review notes | `store/app-store/listing-fr.md` |
| Privacy policy (FR + EN, single page) | `store/privacy-policy.html` → host at e.g. `https://am-e.dev/gillou/confidentialite` |

Upload key fingerprint (SHA-256): `39:01:52:A0:C0:B1:19:B1:41:93:B3:F0:2B:AF:DD:6A:CB:49:7F:7F:83:5C:CC:64:46:98:A0:17:A3:6B:AF:2C`

## Before you upload
1. Host `store/privacy-policy.html` on am-e.dev and put the final URL in both listings (both stores require it; Play refuses the Data safety form without it).
2. Copy `android/keystore/` and `android/key.properties` to a password manager / encrypted backup. With Play App Signing the upload key can be reset if lost, but it takes a support request.
3. Install the APK on a real Android phone once: share sheet (image to Facebook / WhatsApp), backup export, keep-awake, dark mode.

## Google Play Console — steps
1. **Create app**: name `Gillou – Annonces du carnaval`, default language French (Belgium or France), app, free.
2. **Set up app** (dashboard): privacy policy URL · no ads · app access "all functionality available without restrictions" · content rating (IARC, "Utility/other", all No) · target audience 18+ · news app No · data safety: no collection, no sharing · government app No · financial features None · health None. Answers are spelled out in `store/play/listing-fr.md`.
3. **Main store listing**: paste title / short / full description, upload icon 512, feature graphic, phone screenshots (in the numbered order), 7" and 10" tablet screenshots.
4. **App integrity → App signing**: choose "Let Google manage and protect your app signing key" (default). The first upload registers `gillou-upload.jks` as the upload key.
5. **Testing → Internal testing**: create release, upload the `.aab`, release notes = "Nouveautés" text, add yourself as tester, roll out. Install via the opt-in link.
6. **Production**: create release from the same bundle, choose countries, roll out. First review of a new developer app can take several days.

## App Store Connect — next session (needs Xcode)
Already done in the repo: bundle id, version 2.0.0 / build 2, AppIcon (light/dark/tinted), launch screen, `ITSAppUsesNonExemptEncryption = NO`, French as development region.
1. `npx cap open ios`, select the `App` target → Signing & Capabilities → your Team; Xcode creates the provisioning profile for `be.am.e.dev.gillou`.
2. Product → Archive (Any iOS Device) → Distribute → App Store Connect → Upload.
3. In App Store Connect: create the app (bundle id, SKU `gillou-ios`), paste texts from `store/app-store/listing-fr.md`, upload the screenshots, App Privacy "Data Not Collected", age rating 4+, pick the uploaded build, submit.

## Rebuilding a release
```bash
npx ng build --configuration production && npx cap sync
cd android && JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" ./gradlew bundleRelease assembleRelease
# outputs: android/app/build/outputs/bundle/release/app-release.aab, android/app/build/outputs/apk/release/app-release.apk
```
Bump `versionCode` / `versionName` in `android/app/build.gradle`, `CURRENT_PROJECT_VERSION` / `MARKETING_VERSION` in `ios/App/App.xcodeproj/project.pbxproj` and `version` in `package.json` together before each store upload. Play rejects a bundle whose `versionCode` was already used.
Screenshots: in `store/tools/`: `npm i puppeteer-core` once in that folder, `node serve.js` (serves `www/browser` on :4321), then `node store-shots.js`; `node feature.js feature.html ../graphics/feature-graphic-1024x500.png` for the feature graphic. The script seeds a demo history and renders each page at every store size.
