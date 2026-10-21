// Extrait à fusionner dans capacitor.config.ts
plugins: {
  SplashScreen: {
    launchShowDuration: 800,
    backgroundColor: '#fff6ee', // fond clair ; le mode sombre est porté par les images splash « night »/« dark »
    androidScaleType: 'CENTER_CROP',
    showSpinner: false,
  },
  StatusBar: {
    backgroundColor: '#e9a262', // header = accent, identique en clair et sombre
    style: 'LIGHT', // texte sombre sur l'accent (Style.Light = contenu foncé)
  },
},
