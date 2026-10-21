# Audit de la palette Gillou

Seuil WCAG AA : 4,5:1 pour le texte courant, 3:1 pour le texte ≥ 18,66 px gras / 24 px.

| Mode | Couple | Couleurs | Ratio | |
|---|---|---|---|---|
| clair | `--ion-color-primary-contrast` sur `--ion-color-primary` | #3B2312 / #E9A262 | 6.84 | ✅ |
| clair | `--ion-color-secondary-contrast` sur `--ion-color-secondary` | #5A3519 / #FAE8D8 | 8.99 | ✅ |
| clair | `--ion-color-tertiary-contrast` sur `--ion-color-tertiary` | #3B2312 / #E8892A | 5.60 | ✅ |
| clair | `--ion-color-success-contrast` sur `--ion-color-success` | #1F3A2D / #8FD3A6 | 7.07 | ✅ |
| clair | `--ion-color-warning-contrast` sur `--ion-color-warning` | #4A3A14 / #F7D794 | 7.92 | ✅ |
| clair | `--ion-color-danger-contrast` sur `--ion-color-danger` | #4A1F1A / #E39A92 | 6.19 | ✅ |
| clair | `--ion-color-light-contrast` sur `--ion-color-light` | #5A3519 / #FFF6EE | 10.05 | ✅ |
| clair | `--ion-color-medium-contrast` sur `--ion-color-medium` | #FFFFFF / #8A6545 | 5.21 | ✅ |
| clair | `--ion-color-dark-contrast` sur `--ion-color-dark` | #FFF6EE / #5A3519 | 10.05 | ✅ |
| clair | `--ion-text-color` sur `--ion-background-color` | #5A3519 / #FFF6EE | 10.05 | ✅ |
| clair | `--gillou-ink` sur `--gillou-surface` | #5A3519 / #FFFFFF | 10.73 | ✅ |
| clair | `--gillou-ink-muted` sur `--gillou-surface` | #8A6545 / #FFFFFF | 5.21 | ✅ |
| clair | `--gillou-ink-muted` sur `--gillou-bg-main` | #8A6545 / #FFF6EE | 4.88 | ✅ |
| clair | `--gillou-link` sur `--gillou-bg-main` | #B85F0E / #FFF6EE | 4.20 | ⚠️ ≥3 (gros texte seulement) |
| clair | `--gillou-link` sur `--gillou-surface` | #B85F0E / #FFFFFF | 4.49 | ⚠️ ≥3 (gros texte seulement) |
| clair | `--gillou-section-label` sur `--gillou-bg-main` | #A0785A / #FFF6EE | 3.69 | ⚠️ ≥3 (gros texte seulement) |
| clair | `--gillou-section-label` sur `--gillou-surface` | #A0785A / #FFFFFF | 3.94 | ⚠️ ≥3 (gros texte seulement) |
| clair | `--gillou-segment-text` sur `--gillou-segment-track` | #8A6545 / #F6E4D1 | 4.20 | ⚠️ ≥3 (gros texte seulement) |
| clair | `--gillou-ink` sur `--gillou-bg-sidebar` | #5A3519 / #FBE3CB | 8.66 | ✅ |
| sombre | `--ion-color-primary-contrast` sur `--ion-color-primary` | #3B2312 / #E9A262 | 6.84 | ✅ |
| sombre | `--ion-color-secondary-contrast` sur `--ion-color-secondary` | #F5E9DC / #533E2C | 8.39 | ✅ |
| sombre | `--ion-color-tertiary-contrast` sur `--ion-color-tertiary` | #3B2312 / #E8892A | 5.60 | ✅ |
| sombre | `--ion-color-success-contrast` sur `--ion-color-success` | #1F3A2D / #8FD3A6 | 7.07 | ✅ |
| sombre | `--ion-color-warning-contrast` sur `--ion-color-warning` | #4A3A14 / #F7D794 | 7.92 | ✅ |
| sombre | `--ion-color-danger-contrast` sur `--ion-color-danger` | #4A1F1A / #E39A92 | 6.19 | ✅ |
| sombre | `--ion-color-light-contrast` sur `--ion-color-light` | #F5E9DC / #171412 | 15.34 | ✅ |
| sombre | `--ion-color-medium-contrast` sur `--ion-color-medium` | #211D1A / #B3A79B | 7.10 | ✅ |
| sombre | `--ion-color-dark-contrast` sur `--ion-color-dark` | #171412 / #F5E9DC | 15.34 | ✅ |
| sombre | `--ion-text-color` sur `--ion-background-color` | #F5E9DC / #171412 | 15.34 | ✅ |
| sombre | `--gillou-ink` sur `--gillou-surface` | #F5E9DC / #211D1A | 14.00 | ✅ |
| sombre | `--gillou-ink-muted` sur `--gillou-surface` | #B3A79B / #211D1A | 7.10 | ✅ |
| sombre | `--gillou-ink-muted` sur `--gillou-bg-main` | #B3A79B / #171412 | 7.79 | ✅ |
| sombre | `--gillou-link` sur `--gillou-bg-main` | #E8892A / #171412 | 7.02 | ✅ |
| sombre | `--gillou-link` sur `--gillou-surface` | #E8892A / #211D1A | 6.41 | ✅ |
| sombre | `--gillou-section-label` sur `--gillou-bg-main` | #948A80 / #171412 | 5.42 | ✅ |
| sombre | `--gillou-section-label` sur `--gillou-surface` | #948A80 / #211D1A | 4.94 | ✅ |
| sombre | `--gillou-segment-text` sur `--gillou-segment-track` | #B3A79B / #302925 | 6.07 | ✅ |
| sombre | `--gillou-ink` sur `--gillou-bg-sidebar` | #F5E9DC / #121010 | 15.87 | ✅ |

## Valeurs -rgb incohérentes
- sombre : `--ion-color-secondary-rgb: 89,68,48` ne correspond pas à `#533e2c` → `83,62,44`
- sombre : `--ion-color-medium-contrast-rgb: 41,36,32` ne correspond pas à `#211d1a` → `33,29,26`

## Texte blanc pur (contraire à la règle du fichier)
- clair : `--ion-color-medium-contrast: #ffffff`
## Corrections proposées (même teinte, juste assez foncé pour passer AA)
| Token (clair) | Actuel | Proposé | Ratio sur bg-main / surface / surface-muted |
|---|---|---|---|
| `--gillou-link` | #b85f0e | **#a3540c** | 5,13 / 5,48 / 4,65 |
| `--gillou-section-label` | #a0785a | **#84634a** | 5,09 / 5,43 / 4,61 |
| `--gillou-segment-text` | #8a6545 | **#825f41** | 4,62 sur segment-track |
| `--ion-color-medium-contrast` | #ffffff | **#fff6ee** | 4,88 (et respecte « pas de blanc pur ») |
| `--ion-color-medium-contrast-rgb` | 255,255,255 | **255,246,238** | |

Sombre : corriger `--ion-color-secondary-rgb` → `83,62,44` et `--ion-color-medium-contrast-rgb` → `33,29,26`.
