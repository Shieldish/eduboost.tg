# GTE Frontend — La Grande Tombola pour l'Education

Interface web publique — [www.gte.tg](https://www.gte.tg)

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page (hero slideshow, lots, canaux SMS/Web/USSD, sponsors, footer) |
| `/ticket` | Achat ticket (MIXX / CREDIT_YAS) |
| `/confirmation` | Codes tickets + récapitulatif (données via sessionStorage, pas en URL) |
| `/mes-tickets` | Espace participant — consulter ses tickets via OTP SMS |

## Stack

| Outil | Version | Rôle |
| --- | --- | --- |
| Next.js | 16.2.7 | Framework React standalone |
| React | 19.2.4 | UI |
| TypeScript | 5.x | Typage |
| Tailwind CSS | 4.x | Styles |
| Bootstrap Icons | 1.11.3 | Icônes CDN |
| Montserrat | — | Police titres et CTA |
| Poppins | — | Police corps de texte |

## Brand colors (YAS TOGO Brand Guidelines)

| Couleur | Hex | Usage |
| --- | --- | --- |
| Sunshine Yellow | `#FFD100` | 50% — couleur dominante |
| Midnight Blue | `#00377D` | 40% — couleur secondaire |
| Sky Blue | `#5F99D2` | 10% — titres uniquement |

## Méthodes de paiement

- **MIXX by YAS** — Mobile money Togocom
- **Crédit YAS** — Airtime (crédit téléphonique)

> Flooz retiré (décision patron, juin 2026).

## Sécurité frontend

- Codes tickets en `sessionStorage` (pas dans l'URL ni les logs serveur)
- Lecture unique avec TTL 5 minutes
- `AbortController` sur le polling — annulé si navigation
- Validation numéro Togo côté client (regex préfixes 70-72, 90-93, 96-99)
- Honeypot anti-bot sur le formulaire d'achat
- Headers HTTP : `X-Frame-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy`

## Démarrage

### Dev local

```bash
cd D:\Eduboost\frontend
npm install
npm run dev
# http://localhost:3000
# .env.local : NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Docker

```bash
cd D:\Eduboost\frontend
docker compose up -d --build
# Accessible via Nginx → http://localhost/
```

## Assets publics

```
public/
  yas-logo.png       Logo YAS TOGO officiel (navbar, footers)
  favicon.png        Icône app (logo YAS)
  flag-tg.png        Drapeau Togo (champ téléphone)
  adds.png           Photo héros #1 (slideshow 10s)
  adds2.png          Photo héros #2 (slideshow 10s)
  mixx-logo.jpg      Logo MIXX by YAS
  airtime-logo.png   Logo Crédit YAS Airtime
  sponsors/          Logos sponsors officiels et médias
```

## Variables d'environnement

| Variable | Dev | Docker/Prod |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | vide (Nginx route) |

## Maquettes

`D:\Eduboost\docs\mockups\` :

- `01-landing-page.jpeg`
- `02-achat-ticket.jpeg`
- `03-confirmation.jpeg`
