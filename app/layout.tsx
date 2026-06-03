/**
 * layout.tsx - Layout racine de l'application GTE Frontend
 *
 * Rôle : enveloppe toutes les pages avec :
 *   - Les métadonnées SEO (titre, description, Open Graph)
 *   - Le favicon (logo YAS TOGO)
 *   - Les polices Google (Sora + DM Sans)
 *   - Bootstrap Icons (CDN)
 *   - La meta viewport pour le responsive mobile
 *
 * TODO prod :
 *   - Ajouter og:image pointant vers une image de partage (1200x630px)
 *   - Ajouter manifest.json pour PWA (installation mobile)
 *   - Ajouter structured data JSON-LD pour le SEO (tombola, organisation)
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTE - La Grande Tombola pour l'Education | YAS TOGO",
  description:
    "Participez à GTE, la Grande Tombola pour l'Education organisée par YAS TOGO. " +
    "Ticket 250 FCFA - Prix total 10 000 000 FCFA. Tirage en direct le 01/09/2026.",
  // TODO prod : ajouter openGraph avec og:image
  // openGraph: {
  //   title: "EduBoost - La Grande Tombola Solidaire",
  //   description: "...",
  //   images: [{ url: "https://www.eduboost.tg/og-image.jpg", width: 1200, height: 630 }],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* ── Favicon : logo YAS TOGO ── */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* TODO prod : générer des tailles multiples (16x16, 32x32, 192x192) avec sharp */}

        {/* ── Bootstrap Icons 1.11.3 ── */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

        {/* ── Google Fonts : Sora (titres) + DM Sans (corps) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Montserrat : titres, chiffres, CTA (remplace Sora)
            Poppins    : corps de texte, labels (remplace DM Sans)
            display=swap : évite le FOIT (Flash of Invisible Text) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Poppins:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip link - accessible au clavier, invisible visuellement sauf au focus */}
        <a
          href="#main-content"
          className="sr-only focusable fixed top-4 left-4 z-[9999] bg-[#FFD100] text-[#00377D] font-bold px-4 py-2 rounded-xl shadow-lg"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
