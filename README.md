# GTE Frontend
### La Grande Tombola pour l'Education — by YAS TOGO

Interface web publique permettant aux participants d'acheter des tickets de tombola, de consulter leurs tickets via OTP SMS, et de suivre la confirmation de leur achat.

---

## Description

GTE (Grande Tombola pour l'Education) est une tombola solidaire nationale organisée par **YAS TOGO**. Les fonds collectés financent l'éducation des jeunes au Togo.

- **Ticket :** 250 FCFA
- **Prix total :** 10 000 000 FCFA
- **Tirage :** 01 Septembre 2026 en direct sur YAS TOGO TV
- **Canaux :** Web (ce projet), SMS (8998), USSD (*909*5#)

---

## Outils & Versions

| Outil | Version | Usage |
|---|---|---|
| Node.js | ≥ 20 | Runtime |
| Next.js | 16.2.7 | Framework React (SSG + Client Components) |
| React | 19.2.4 | UI |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Styles utilitaires |
| Bootstrap Icons | 1.11.3 | Icônes (CDN) |
| Montserrat | — | Police titres et CTA (Google Fonts) |
| Poppins | — | Police corps de texte (Google Fonts) |
| Docker | ≥ 24 | Conteneurisation |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — présentation GTE, lots, canaux, sponsors |
| `/ticket` | Formulaire d'achat (MIXX ou Crédit YAS Airtime) |
| `/confirmation` | Récapitulatif après achat + codes tickets |
| `/mes-tickets` | Espace participant — consulter ses tickets via OTP SMS |

---

## Ce qui est fait ✅

- **Landing page** fidèle aux maquettes : hero slideshow (10s, cross-fade), section lots 10M FCFA, canaux SMS/Web/USSD avec séparateur "OU", CTA tirage, footer 4 colonnes avec sponsors
- **Page achat** : sélection MIXX ou Crédit YAS avec logos réels, drapeau Togo PNG, validation numéro togolais (préfixes 70-72, 90-93, 96-99), honeypot anti-bot, protection double soumission
- **Page confirmation** : codes tickets en grille, données sécurisées via `sessionStorage` (jamais dans l'URL ni les logs serveur)
- **Espace mes tickets** : flow OTP complet — saisie numéro → code SMS → liste des commandes depuis la DB
- **Polling statut** : `AbortController` + timeout absolu 90s + gestion erreurs réseau
- **Sécurité** : headers HTTP (`X-Frame-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy`)
- **Accessibilité** : `focus-visible`, `aria-*`, skip link, `prefers-reduced-motion`
- **Responsive** : mobile-first, touch targets 44px min, safe area iOS
- **Brand colors YAS TOGO** : Sunshine Yellow `#FFD100` (50%), Midnight Blue `#00377D` (40%), Sky Blue `#5F99D2` (10%)
- **Docker** : build multi-stage standalone, `output: standalone`

---

## Ce qui reste à faire ⏳

| Priorité | Tâche |
|---|---|
| Haute | Page 404 personnalisée (`app/not-found.tsx`) |
| Haute | Open Graph `og:image` 1200×630px pour partage WhatsApp/Facebook |
| Haute | Convertir `adds.png`/`adds2.png` en WebP (2MB → ~200KB) |
| Haute | Test sur mobile réel (iOS Safari + Android Chrome) |
| Moyenne | Page FAQ et page Règlement officiel |
| Moyenne | Countdown J-X jusqu'au 01/09/2026 dans le hero |
| Moyenne | Page erreur paiement (`/echec`) si refus ou timeout |
| Moyenne | Token JWT après OTP pour sécuriser `/mes-tickets` |
| Basse | PWA : `manifest.json` + Service Worker |
| Basse | Animations au scroll (Intersection Observer) |

---

## Démarrage

### Prérequis

- Node.js ≥ 20
- Backend GTE en cours d'exécution sur `http://localhost:8080`

### Dev local

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
# → http://localhost:3000
```

Le fichier `.env.local` est déjà configuré :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Production (Docker)

```bash
# Builder et lancer
docker compose up -d --build

# Accessible via Nginx → http://localhost/
```

> En production Docker, `NEXT_PUBLIC_API_URL` est vide — Nginx route automatiquement les appels API vers le backend.

### Autres commandes

```bash
npm run build   # Build de production
npm run lint    # Linter ESLint
```

---

## Variables d'environnement

| Variable | Dev | Docker/Prod |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | vide (Nginx gère) |

---

## Structure du projet

```
frontend/
├── app/
│   ├── components/
│   │   ├── HeroSlideshow.tsx     Carrousel hero (10s, cross-fade)
│   │   ├── PageHeader.tsx        Header commun (toutes les sous-pages)
│   │   └── PageFooter.tsx        Footer compact commun
│   ├── confirmation/page.tsx     Page confirmation après achat
│   ├── mes-tickets/page.tsx      Espace participant (flow OTP)
│   ├── ticket/page.tsx           Formulaire d'achat
│   ├── globals.css               Styles globaux + variables CSS brand
│   ├── layout.tsx                Layout racine (fonts, favicon, headers)
│   └── page.tsx                  Landing page principale
├── lib/
│   └── confirmation-store.ts     sessionStorage sécurisé (TTL 5min, lecture unique)
├── public/
│   ├── yas-logo.png              Logo YAS TOGO officiel
│   ├── adds.png / adds2.png      Photos héros slideshow
│   ├── mixx-logo.jpg             Logo MIXX by YAS
│   ├── airtime-logo.png          Logo Crédit YAS Airtime
│   ├── flag-tg.png               Drapeau Togo
│   └── sponsors/                 Logos sponsors officiels et médias
├── Dockerfile                    Build multi-stage standalone
├── docker-compose.yml
├── next.config.ts                Headers sécurité + optimisation images WebP/AVIF
└── package.json
```
