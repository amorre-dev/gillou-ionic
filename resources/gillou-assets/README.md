# Gillou — assets du logo (Ionic / Capacitor)

L'arborescence reprend celle d'un projet Ionic + Capacitor : copie chaque dossier à la racine du projet.
Fonds utilisés : clair `#fff6ee` (`--ion-background-color`), sombre `#171412` (`--ion-background-color` en mode sombre).
Le logo garde son orange `#FC861D` ; l'app garde son accent `#e9a262`.

## Deux façons d'installer

### A. Avec @capacitor/assets (recommandé)
1. Copier `capacitor-assets/*` dans `<projet>/assets/`.
2. Lancer :
   ```bash
   npx @capacitor/assets generate \
     --iconBackgroundColor '#171412' --iconBackgroundColorDark '#171412' \
     --splashBackgroundColor '#fff6ee' --splashBackgroundColorDark '#171412'
   ```
   L'outil régénère iOS, Android et PWA. Ensuite, recopie quand même :
   - `android/app/src/main/res/mipmap-*/ic_launcher_monochrome.png` et `mipmap-anydpi-v26/*.xml` (l'outil ne fait pas l'icône thématique Android 13+) ;
   - `ios/App/App/Assets.xcassets/AppIcon.appiconset/` (pour les variantes dark / tinted d'iOS 18).

### B. Fichiers natifs prêts à l'emploi
- `ios/App/App/Assets.xcassets/` → remplace `AppIcon.appiconset` et `Splash.imageset` (mêmes noms que le template Capacitor, avec en plus les variantes sombres), et ajoute `AccentColor` et `LaunchBackground`.
- `android/app/src/main/res/` → fusionne :
  - icône adaptive (fond `#171412` + premier plan + monochrome) et icônes anciennes versions, de mdpi à xxxhdpi ;
  - `drawable*/splash.png` : portrait et paysage, clair et `night` ;
  - `drawable-*/splash_icon.png` + `android/styles-splash-snippet.xml` pour l'écran système Android 12+ ;
  - `values/colors.xml` et `values-night/colors.xml` (remplacent le `colors.xml` du template Capacitor).
- `src/` → `src/favicon.ico`, `src/assets/icon/*` (favicon, apple-touch, icônes PWA 72→512 + maskable), `src/manifest.webmanifest`, et `src/index-head.html` à coller dans le `<head>` de `src/index.html`.
- `capacitor.config.snippet.ts` → couleurs SplashScreen / StatusBar à fusionner dans `capacitor.config.ts`.

## Stores
`store/app-store-icon-1024.png` et `store/play-store-icon-512.png` (sans transparence).

## Logo
`logo/svg` et `logo/png` : détouré, fond sombre, fond clair, mono noir, mono blanc (256 → 2048 px).

## Palette
- `palette/tokens.json` : la palette de `variables.scss` (clair / sombre) + les couleurs du logo, pour la passation design.
- `palette/audit-contrastes.md` : contrôle WCAG de tous les couples texte / fond, avec les corrections proposées.
