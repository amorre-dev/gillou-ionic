import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'am.e.dev.gillou',
  appName: 'Gillou',
  webDir: 'www/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      // Light background; dark mode is carried by the "night"/"dark" splash images
      backgroundColor: '#fff6ee',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      // Header = accent, identical in light and dark; Style.Light = dark content on it
      backgroundColor: '#e9a262',
      style: 'LIGHT',
    },
  },
};

export default config;
