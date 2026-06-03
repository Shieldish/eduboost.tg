# Plan — GTE Frontend

## Ce que c'est

Interface web publique de la Grande Tombola pour l'Education — www.gte.tg

## Stack

| Outil | Version | Rôle |
| --- | --- | --- |
| Next.js | 16.2.7 | Framework React (SSG + Client Components) |
| React | 19.2.4 | UI |
| TypeScript | 5.x | Typage |
| Tailwind CSS | 4.x | Styles utilitaires |
| Bootstrap Icons | 1.11.3 | Icônes CDN |
| Montserrat | — | Police titres/CTA (remplace Sora) |
| Poppins | — | Police corps de texte (remplace DM Sans) |

---

## Ce qui est FAIT ✅

### Pages

| Route | Description |
| --- | --- |
| `/` | Landing page complète |
| `/ticket` | Achat MIXX / CREDIT_YAS |
| `/confirmation` | Récapitulatif + codes tickets |
| `/mes-tickets` | Consultation tickets via OTP SMS |

### Fonctionnalités

- Navbar responsive avec burger menu mobile
- Hero slideshow `adds.png`/`adds2.png` — alternance 10s, cross-fade 800ms, conteneur stable (aspect-ratio 4/3)
- 2 méthodes paiement avec logos réels : MIXX, Crédit YAS (Flooz retiré)
- Drapeau Togo PNG officiel avant `+228`
- Validation numéro Togo client-side (regex préfixes 70-72, 90-93, 96-99)
- Honeypot anti-bot + protection double soumission
- AbortController sur le polling → annulé si navigation
- Timeout absolu 90s sur le polling
- Codes tickets en `sessionStorage` (TTL 5min, lecture unique) → URL propre
- Page `/mes-tickets` : OTP SMS → tickets depuis la DB via `GET /my-tickets`
- Composants réutilisables : `PageHeader`, `PageFooter`, `HeroSlideshow`, `confirmation-store`
- Headers sécurité HTTP : `X-Frame-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy`
- `focus-visible` CSS sur tous les éléments interactifs (WCAG 2.1 AA)
- `aria-*`, `role`, skip link, `prefers-reduced-motion`
- Logos sponsors réels dans footer (Ecobank HD, Coris Bank, NSIA, Voltic, TVT, Techno, etc.)
- Brand colors YAS TOGO Brand Guidelines : `#FFD100`, `#00377D`, `#5F99D2`
- Polices Montserrat (titres) + Poppins (corps)

### Docker

- Dockerfile multi-stage standalone Next.js
- `output: standalone` dans `next.config.ts`
- `NEXT_PUBLIC_API_URL=""` en Docker (Nginx gère le routage)
- Headers sécurité via `next.config.ts`

---

## Ce qui RESTE à faire ⏳

### Priorité haute — AVANT PROD

- [ ] **Page 404 personnalisée** — `app/not-found.tsx` aux couleurs GTE
- [ ] **Open Graph** — `og:image` 1200×630px pour partage Facebook/WhatsApp
- [ ] **Images WebP** — convertir `adds.png`/`adds2.png` (2MB chacune → ~200KB)
- [ ] **Test mobile réel** — iOS Safari + Android Chrome

### Priorité moyenne

- [ ] **Page FAQ** — questions fréquentes sur la tombola
- [ ] **Page Règlement** — texte officiel
- [ ] **Countdown tirage** — compteur J-X jusqu'au 01/09/2026
- [ ] **Page erreur paiement** — si FAILED ou timeout
- [ ] **Token JWT** après OTP → cookie httpOnly pour sécuriser `/mes-tickets`

### Priorité basse

- [ ] **PWA** — `manifest.json` + Service Worker
- [ ] **Animations au scroll** — Intersection Observer
- [ ] **i18n** — version anglaise pour la diaspora

---

## Mode Production — checklist

- [ ] `NEXT_PUBLIC_API_URL` vide confirmé
- [ ] `output: standalone` confirmé
- [ ] Images WebP (×10 sur le poids)
- [ ] Test réseau lent (4G Togo ~2-5 Mbps)
- [ ] Supprimer les SVG placeholder Next.js de `public/`

---

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
# Accessible via Nginx http://localhost/
```
