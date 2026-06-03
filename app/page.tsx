/**
 * page.tsx — Landing page principale (www.eduboost.tg)
 *
 * Sections dans l'ordre (fidèles aux maquettes WhatsApp) :
 *   1. Navbar        — logo YAS réel, liens, bouton "Acheter un ticket", burger mobile
 *   2. Hero          — titre, slogan, CTA, slideshow photos (alternance 10s)
 *   3. Prix à gagner — 10 000 000 FCFA, 2 grands prix, 3 avantages
 *   4. Participer    — 3 canaux (SMS | Web | USSD) avec "OU" entre eux
 *   5. CTA tirage    — "1 ticket = 1 chance", date 01/09/2026, bouton achat
 *   6. Footer        — sponsors officiels, partenaires médias, 4 colonnes infos
 *
 * Brand colors (YAS TOGO Brand Guidelines) :
 *   Jaune principal : #FFD100
 *   Bleu marine     : #00377D
 *   Bleu profond    : #002A5E
 *   Bleu moyen      : #003D8F
 *
 * TODO prod :
 *   - Remplacer href="#" par les vraies URLs (FAQ, Contact, Règlement, mentions légales)
 *   - Ajouter un countdown J-X jusqu'au 01/09/2026
 *   - Ajouter la page /faq et /reglement
 *   - Remplacer les réseaux sociaux "#" par les vrais liens YAS TOGO
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HeroSlideshow from "./components/HeroSlideshow";

// ── Sponsors officiels (logos dans /public/sponsors/) ────────────────────────
// TODO : mettre à jour si de nouveaux sponsors rejoignent la tombola
const SPONSORS_OFFICIELS = [
  { src: "/sponsors/logo.png",              alt: "YAS TOGO" },
  { src: "/sponsors/Ecobank_Logo.svg.png",  alt: "Ecobank — The Pan African Bank" },
  { src: "/sponsors/coris-banks.png",       alt: "CORIS BANK — La Banque Autrement" },
  { src: "/sponsors/nsia.jpg",              alt: "NSIA BANQUE" },
  { src: "/sponsors/voltic.jpg",            alt: "Voltic — Une nouvelle eau naturelle" },
];

const SPONSORS_MEDIAS = [
  { src: "/sponsors/tvt.jpg",             alt: "TVT — Télévision Togolaise" },
  { src: "/sponsors/techno.jpg",          alt: "TECHNO Quality Products" },
  { src: "/sponsors/lomeactu.png",        alt: "Lomé actu." },
  { src: "/sponsors/africa-new.jpg",      alt: "africa news." },
  { src: "/sponsors/togo-matin.jpg",      alt: "TM TOGOMATIN" },
  { src: "/sponsors/globalactu-logo.png", alt: "GLOBAL ACTU" },
];

export default function HomePage() {
  // État du menu mobile hamburger
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-wrapper min-h-screen flex flex-col">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NAVBAR — Sticky, hauteur 56px
          - Logo YAS TOGO (image réelle depuis /public/sponsors/logo.png)
          - Liens desktop : Accueil, Lots, Participer, Sponsors, FAQ, Contact
          - CTA "Acheter un ticket" toujours visible
          - Menu burger sur mobile (< 1024px)
          TODO : ajouter lien actif (underline) sur la page courante
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="bg-[#FFD100] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">

          {/* Logo YAS TOGO — image réelle (pas du texte) */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/yas-logo.png"
              alt="YAS TOGO"
              width={52}
              height={44}
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          {/* Liens navigation desktop */}
          <div className="hidden lg:flex items-center gap-6 text-[#00377D] font-semibold text-sm">
            {[
              ["#",          "ACCUEIL"],
              ["#",          "ÉDUBOOST"],
              ["#lots",      "LOTS"],
              ["#participer","COMMENT PARTICIPER"],
              ["#sponsors",  "SPONSORS"],
              ["#",          "FAQ"],
              ["#",          "CONTACT"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="hover:opacity-70 transition-opacity py-1 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* CTA principal — toujours visible */}
            <Link
              href="/ticket"
              className="ticket-shine bg-[#00377D] text-[#FFD100] font-bold text-sm px-4 py-2.5 rounded-xl
                         hover:bg-[#002A5E] transition-colors flex items-center gap-1.5 shadow-md whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <i className="bi bi-ticket-perforated-fill" />
              {/* Texte court sur mobile, complet sur tablette+ */}
              <span className="hidden sm:inline">ACHETER UN TICKET</span>
              <span className="sm:hidden">250 FCFA</span>
            </Link>

            {/* Bouton burger — visible uniquement < 1024px */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl
                         text-[#00377D] hover:bg-[#00377D]/10 transition"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
            </button>
          </div>
        </div>

        {/* Menu déroulant mobile */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FFD100] border-t border-[#00377D]/10 px-4 pb-4">
            {[
              ["#",          "Accueil"],
              ["#",          "ÉduBoost"],
              ["#lots",      "Lots"],
              ["#participer","Comment participer"],
              ["#sponsors",  "Sponsors"],
              ["#",          "FAQ"],
              ["#",          "Contact"],
            ].map(([href, label]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[#00377D] font-semibold
                           text-base py-3 border-b border-[#00377D]/10 last:border-0"
              >
                <i className="bi bi-chevron-right text-xs" />
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Fond jaune avec clip-path wave en bas
          Colonne gauche : titre + slogan + CTA
          Colonne droite : slideshow photos (visible sur tous les appareils)
          Le badge "250 FCFA" reste fixe par-dessus le slideshow
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="hero-pattern bg-[#FFD100] section-wave pb-16 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12
                        flex flex-col sm:flex-row items-center gap-6 sm:gap-8">

          {/* ── Colonne texte — prend tout l'espace restant ── */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            {/* Badge "By YAS TOGO" */}
            <div className="inline-flex items-center gap-2 bg-[#00377D] text-[#FFD100]
                            text-xs font-black px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              <i className="bi bi-stars" /> By YAS TOGO
            </div>

            {/* Titre principal — taille clamp pour mobile/desktop */}
            <h1
              className="text-[#00377D] font-black leading-none mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2.4rem, 8vw, 4.5rem)" }}
            >
              🎓 ÉduBoost
            </h1>

            {/* Sous-titre maquette : "LA GRANDE TOMBOLA SOLIDAIRE" */}
            <div className="bg-[#00377D] text-[#FFD100] inline-block font-black
                            text-sm sm:text-base px-4 py-1 rounded mb-2 uppercase tracking-wide">
              LA GRANDE TOMBOLA SOLIDAIRE
            </div>

            {/* Ligne "BY YAS TOGO" */}
            <div className="text-[#00377D] font-bold text-sm mb-3">BY YAS TOGO</div>

            {/* Slogan (fidèle à la maquette) */}
            <p className="text-[#00377D] font-medium text-sm sm:text-base mb-1">
              Jouons aujourd&apos;hui, construisons l&apos;avenir de nos enfants.
            </p>
            <p className="text-[#00377D]/75 text-sm mb-6 max-w-md leading-relaxed">
              Des bourses et kits scolaires à gagner pour soutenir l&apos;éducation au Togo.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="/ticket"
                className="ticket-shine pulse-cta bg-[#00377D] text-[#FFD100] font-bold
                           px-7 py-4 rounded-2xl text-base hover:bg-[#002A5E] transition
                           flex items-center justify-center gap-2 shadow-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <i className="bi bi-ticket-perforated-fill text-lg" />
                {/* Texte fidèle à la maquette */}
                ACHETER UN TICKET MAINTENANT 🤝
              </Link>
            </div>

            {/* Badges garanties */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[#00377D] text-xs font-semibold">
              <span className="flex items-center gap-1">
                <i className="bi bi-shield-check-fill" /> Paiement sécurisé
              </span>
              <span className="flex items-center gap-1">
                <i className="bi bi-lightning-fill" /> Ticket par SMS
              </span>
              <span className="flex items-center gap-1">
                <i className="bi bi-calendar-event-fill" /> Tirage 01/09/2026
              </span>
            </div>
          </div>

          {/* ── Colonne slideshow ─────────────────────────────────────
              Image normale dans le flux (pas position:absolute, pas de shadow).
              Prend toute la largeur de la colonne sur desktop.
              Sur mobile : occupe toute la largeur disponible.
          ──────────────────────────────────────────────────────────── */}
          {/* Image :
              - Mobile  : pleine largeur, centrée, max 320px
              - Desktop : fixe 380px à droite du texte */}
          <div className="w-full sm:w-auto sm:flex-shrink-0" style={{ maxWidth: 320 }}>
            <div className="sm:hidden"><HeroSlideshow /></div>
            <div className="hidden sm:block" style={{ width: 520 }}><HeroSlideshow /></div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION PRIX — Fond bleu marine
          Affiche les 10 000 000 FCFA de prix :
          - 5 000 000 Bons d'achat scolaires
          - 5 000 000 Frais de scolarité
          + 3 avantages (bourses, kits, impact)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="lots" className="bg-[#00377D] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Entête — fidèle à la maquette : "PLUS DE 10 000 000 FCFA" */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="text-[#FFD100] font-bold text-sm sm:text-base uppercase tracking-widest mb-2">
              PLUS DE
            </div>
            <h2
              className="text-[#FFD100] font-black leading-none"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2rem, 7vw, 3.5rem)" }}
            >
              10 000 000 FCFA
            </h2>
            <div className="text-white font-black text-lg sm:text-xl mt-1">
              DE PRIX À GAGNER !
            </div>
          </div>

          {/* 2 grands prix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-8">
            {[
              {
                icon: "bi-cart-fill",
                // Fidèle à la maquette — icône panier
                label: "DE BONS D'ACHAT D'ARTICLES SCOLAIRES",
                amount: "5 000 000",
              },
              {
                icon: "bi-mortarboard-fill",
                // Fidèle à la maquette — icône diplôme
                label: "DE FRAIS DE SCOLARITÉ",
                amount: "5 000 000",
              },
            ].map(({ icon, label, amount }) => (
              <div
                key={label}
                className="card-lift bg-[#003D8F] rounded-2xl p-6 sm:p-8 text-center border border-white/10"
              >
                <i className={`bi ${icon} text-4xl text-[#FFD100] mb-3 block`} />
                <div
                  className="text-[#FFD100] font-black text-2xl sm:text-3xl mb-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {amount} FCFA
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* 3 avantages — fidèles à la maquette */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "bi-award-fill",    label: "DES BOURSES SCOLAIRES\nPOUR LES ÉLÈVES" },
              { icon: "bi-backpack-fill", label: "DES KITS SCOLAIRES\nPOUR BIEN DÉMARRER" },
              { icon: "bi-people-fill",   label: "UN IMPACT RÉEL POUR\nL'ÉDUCATION AU TOGO" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="card-lift flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFD100]/20 flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${icon} text-xl text-[#FFD100]`} />
                </div>
                <span className="text-white font-semibold text-sm leading-snug whitespace-pre-line">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMMENT PARTICIPER — 3 canaux séparés par "OU"
          Fidèle à la maquette : SMS | OU | WEB | OU | USSD
          Le canal WEB est mis en avant (fond bleu, badge "Recommandé")
          TODO : ajouter les vraies URLs pour chaque canal
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="participer" className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="text-[#00377D] font-black text-3xl sm:text-4xl uppercase tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              COMMENT PARTICIPER ?
            </h2>
          </div>

          {/* Grille 3 canaux avec séparateur "OU" entre eux */}
          <div className="flex flex-col sm:flex-row items-stretch gap-0 max-w-5xl mx-auto">

            {/* ── Canal SMS ── */}
            <div className="card-lift flex-1 bg-white rounded-3xl p-7 shadow-md border border-gray-100 text-center">
              <div className="text-[#00377D] font-bold text-xs uppercase tracking-widest mb-4">
                PAR SMS
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <i className="bi bi-phone-fill text-3xl text-[#00377D]" />
              </div>
              <p className="text-gray-500 text-sm mb-3">
                ENVOYER <strong>BOURSE</strong> AU
              </p>
              {/* Numéro SMS mis en avant — fidèle à la maquette */}
              <div
                className="bg-[#00377D] text-[#FFD100] font-black text-4xl rounded-2xl py-4 shadow-lg mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                8998
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Suivez les instructions pour acheter votre ticket 250 FCFA
              </p>
            </div>

            {/* ── Séparateur "OU" — vertical sur desktop, horizontal sur mobile ── */}
            <div className="flex sm:flex-col items-center justify-center px-4 py-3 sm:py-0">
              <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
              <span
                className="mx-3 sm:my-3 text-[#00377D] font-black text-sm bg-white
                           border-2 border-gray-200 rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0"
              >
                OU
              </span>
              <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
            </div>

            {/* ── Canal Web — mis en avant ── */}
            <div className="card-lift flex-1 bg-[#00377D] rounded-3xl p-7 shadow-xl text-center relative overflow-hidden">
              {/* Badge recommandé */}
              <div className="absolute top-3 right-3 bg-[#FFD100] text-[#00377D] text-xs font-black px-3 py-1 rounded-full">
                <i className="bi bi-star-fill mr-1" />Recommandé
              </div>
              <div className="text-[#FFD100] font-bold text-xs uppercase tracking-widest mb-4">
                SUR LE WEB
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <i className="bi bi-globe2 text-3xl text-[#00377D]" />
              </div>
              {/* Label fidèle à la maquette */}
              <p className="text-white/70 text-sm mb-2">CLIQUEZ SUR</p>
              <Link
                href="/ticket"
                className="ticket-shine bg-[#FFD100] text-[#00377D] font-bold py-3 px-5
                           rounded-xl text-sm hover:bg-[#FFEC00] transition block mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {/* URL fidèle à la maquette */}
                www.eduboost.tg/ticket
              </Link>
              <p className="text-white/40 text-xs">
                Achetez votre ticket en ligne en toute sécurité
              </p>
            </div>

            {/* ── Séparateur "OU" ── */}
            <div className="flex sm:flex-col items-center justify-center px-4 py-3 sm:py-0">
              <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
              <span
                className="mx-3 sm:my-3 text-[#00377D] font-black text-sm bg-white
                           border-2 border-gray-200 rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0"
              >
                OU
              </span>
              <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
            </div>

            {/* ── Canal USSD ── */}
            <div className="card-lift flex-1 bg-white rounded-3xl p-7 shadow-md border border-gray-100 text-center">
              <div className="text-[#00377D] font-bold text-xs uppercase tracking-widest mb-4">
                PAR USSD
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
                <i className="bi bi-grid-3x3-gap-fill text-3xl text-[#00377D]" />
              </div>
              <p className="text-gray-500 text-sm mb-3">COMPOSEZ</p>
              <div
                className="bg-[#00377D] text-[#FFD100] font-black text-3xl rounded-2xl py-4 shadow-lg mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                *909*5#
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Sélectionnez ÉduBoost et suivez les instructions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA TIRAGE — Fond jaune
          Fidèle à la maquette :
          - "1 TICKET = 1 CHANCE D'OFFRIR UN MEILLEUR AVENIR"
          - Slogan de participation
          - Date tirage + chaîne TV
          - Bouton achat
          TODO : ajouter un countdown dynamique J-X
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#FFD100] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <i className="bi bi-hand-thumbs-up-fill text-[#00377D] text-2xl" />
              <h3
                className="text-[#00377D] font-black text-lg sm:text-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                1 TICKET = 1 CHANCE D&apos;OFFRIR UN MEILLEUR AVENIR !
              </h3>
            </div>
            <p className="text-[#00377D]/70 text-sm max-w-md mx-auto md:mx-0">
              En participant, vous soutenez l&apos;éducation des jeunes et contribuez
              à bâtir un Togo meilleur.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            {/* Encart date tirage */}
            <div className="bg-[#00377D] text-white rounded-2xl px-7 py-4 text-center shadow-xl w-full max-w-xs">
              <div className="flex items-center gap-2 text-white/60 text-xs font-semibold mb-1 justify-center">
                <i className="bi bi-calendar2-event-fill text-[#FFD100]" />
                TIRAGE AU SORT LE
              </div>
              <div
                className="text-[#FFD100] font-black text-2xl sm:text-3xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                01 SEPT 2026
              </div>
              <div className="text-white/60 text-xs mt-1 flex flex-col items-center gap-0.5 justify-center">
                <span className="flex items-center gap-1"><i className="bi bi-tv-fill" /> EN DIRECT SUR YAS TOGO TV</span>
                <span>ET NOS RÉSEAUX SOCIAUX</span>
              </div>
              {/* Réseaux sociaux fidèles à la maquette */}
              <div className="flex gap-2 justify-center mt-2">
                {["bi-youtube", "bi-facebook", "bi-instagram", "bi-tiktok"].map((i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center
                               hover:bg-[#FFD100] hover:text-[#00377D] transition text-xs text-white"
                  >
                    <i className={`bi ${i}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Bouton CTA fidèle à la maquette */}
            <Link
              href="/ticket"
              className="ticket-shine bg-[#00377D] text-[#FFD100] font-bold px-7 py-4 rounded-2xl
                         hover:bg-[#002A5E] transition w-full max-w-xs text-center
                         flex items-center justify-center gap-2 shadow-lg"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <i className="bi bi-ticket-perforated-fill text-lg" />
              ACHETER UN TICKET MAINTENANT 🤝
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER — Fond bleu profond (#002A5E)
          Structure :
          - Zone sponsors officiels
          - Zone partenaires médias
          - 4 colonnes : Marque | Tombola | Paiement | Contact
          - Copyright + "PLUS D'INFOS" + mentions légales
          TODO : remplacer les # par les vraies URLs
          TODO : ajouter numéro 8200 en lien tel: cliquable sur mobile
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer id="sponsors" className="bg-[#002A5E] text-white mt-auto safe-bottom">

        {/* ── Zone sponsors officiels ── */}
        <div className="border-b border-white/8 py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <div className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                NOS SPONSORS ET PARTENAIRES
              </div>
              <div className="text-white/50 text-xs uppercase tracking-widest">
                SPONSORS OFFICIELS
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {SPONSORS_OFFICIELS.map(({ src, alt }) => (
                <div
                  key={alt}
                  className="sponsor-logo bg-white/6 border border-white/10 rounded-2xl p-3
                             flex items-center justify-center w-28 sm:w-36 h-16 sm:h-20"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={96}
                    height={44}
                    className="object-contain max-h-10 sm:max-h-12 w-auto brightness-90 contrast-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Zone partenaires médias ── */}
        <div className="border-b border-white/8 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-5">
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest">
                PARTENAIRES MÉDIAS
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
              {SPONSORS_MEDIAS.map(({ src, alt }) => (
                <div
                  key={alt}
                  className="sponsor-logo bg-white/5 border border-white/8 rounded-xl p-3
                             flex items-center justify-center w-24 sm:w-28 h-14"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={72}
                    height={36}
                    className="object-contain max-h-9 w-auto brightness-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4 colonnes ── */}
        <div className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6
                          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

            {/* Colonne 1 — Marque YAS TOGO */}
            <div className="flex flex-col gap-4">
              {/* Logo YAS dans le footer — image réelle sur fond coloré (comme le header)
                  On utilise un fond #FFD100 pour que le logo reste lisible sur fond sombre */}
              <div className="flex items-center gap-2">
                <div className="bg-[#FFD100] rounded-xl p-1.5 flex items-center justify-center">
                  <Image
                    src="/yas-logo.png"
                    alt="YAS TOGO"
                    width={44}
                    height={38}
                    className="object-contain h-9 w-auto"
                  />
                </div>
                <span className="text-[#FFD100] font-bold text-xs uppercase tracking-[.18em]">
                  TOGO
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                YAS TOGO, engagé pour l&apos;éducation<br />et l&apos;avenir de la jeunesse.
              </p>
              {/* Réseaux sociaux — couleur blanche explicite via style inline
                  (bg-white/8 n'est pas fiable en Tailwind v4, on utilise rgba) */}
              <div className="flex gap-2 mt-1">
                {[
                  ["bi-facebook","#","Facebook"],
                  ["bi-instagram","#","Instagram"],
                  ["bi-twitter-x","#","X Twitter"],
                  ["bi-youtube","#","YouTube"],
                  ["bi-tiktok","#","TikTok"],
                ].map(([icon, href, label]) => (
                  <a
                    key={icon}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-sm"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#FFD100";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#00377D";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                    }}
                  >
                    <i className={`bi ${icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2 — La Tombola */}
            <div className="flex flex-col gap-3">
              <h4
                className="text-white font-bold text-sm uppercase tracking-wider mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                La Tombola
              </h4>
              {[
                ["#lots",      "Comment ça marche ?"],
                ["#participer","Participer par SMS"],
                ["#participer","Participer par Web"],
                ["#participer","Participer par USSD"],
                ["#",          "Règlement officiel"],   // TODO : lien vers /reglement
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/50 text-sm hover:text-[#FFD100] transition flex items-center gap-2"
                >
                  <i className="bi bi-chevron-right text-xs" />{label}
                </a>
              ))}
            </div>

            {/* Colonne 3 — Paiement sécurisé */}
            <div className="flex flex-col gap-3">
              <h4
                className="text-white font-bold text-sm uppercase tracking-wider mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Paiement sécurisé
              </h4>
              {/* Logos MIXX et Airtime avec texte */}
              <div className="flex flex-col gap-3">
                <div className="bg-white/6 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <Image src="/mixx-logo.jpg" alt="MIXX by YAS" width={56} height={28} className="object-contain rounded-lg h-7 w-auto" />
                  <div>
                    <div className="text-white font-bold text-sm">MIXX by YAS</div>
                    <div className="text-white/40 text-xs">Mobile money</div>
                  </div>
                </div>
                <div className="bg-white/6 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <Image src="/airtime-logo.png" alt="Crédit YAS Airtime" width={44} height={28} className="object-contain rounded-lg h-7 w-auto" />
                  <div>
                    <div className="text-white font-bold text-sm">Crédit YAS</div>
                    <div className="text-white/40 text-xs">Airtime</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 text-white/40 text-xs">
                <i className="bi bi-shield-check-fill text-green-400" />
                Transactions 100% sécurisées
              </div>
            </div>

            {/* Colonne 4 — Contact */}
            <div className="flex flex-col gap-3">
              <h4
                className="text-white font-bold text-sm uppercase tracking-wider mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Contact
              </h4>
              {/* Infos de contact (fidèles à la maquette) */}
              {[
                { icon: "bi-telephone-fill", text: "8200" },              // TODO : lien tel:8200
                { icon: "bi-globe2",         text: "www.yas.tg" },
                { icon: "bi-envelope-fill",  text: "contact@yas.tg" },
                { icon: "bi-geo-alt-fill",   text: "Lomé, Togo" },
              ].map(({ icon, text }) => (
                <div key={text} className="text-white/50 text-sm flex items-center gap-2">
                  <i className={`bi ${icon} text-[#FFD100] flex-shrink-0`} />
                  {text}
                </div>
              ))}
              {/* CTA dans le footer */}
              <Link
                href="/ticket"
                className="mt-3 bg-[#FFD100] text-[#00377D] font-bold px-5 py-3 rounded-xl
                           text-sm hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <i className="bi bi-ticket-perforated-fill" />
                Acheter un ticket
              </Link>
            </div>
          </div>
        </div>

        {/* ── Copyright + "PLUS D'INFOS" (fidèle à la maquette) ── */}
        <div className="border-t border-white/8 py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            {/* Logo + slogan — copyright bar */}
            <div className="flex items-center gap-2">
              {/* Logo YAS image réelle — fond #FFD100 pour visibilité sur fond sombre */}
              <div className="bg-[#FFD100] rounded-lg p-1 flex items-center justify-center">
                <Image src="/yas-logo.png" alt="YAS TOGO" width={32} height={28} className="object-contain h-7 w-auto" />
              </div>
              <p className="text-white/40 text-xs">
                YAS TOGO, engagé pour l&apos;éducation et l&apos;avenir de la jeunesse.
              </p>
            </div>
            {/* Réseaux sociaux — icônes blanches explicites via style inline */}
            <div className="flex gap-2">
              {[
                ["bi-facebook","Facebook"],
                ["bi-instagram","Instagram"],
                ["bi-twitter-x","X Twitter"],
                ["bi-youtube","YouTube"],
                ["bi-tiktok","TikTok"],
              ].map(([icon, label]) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#FFD100";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#00377D";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                  }}
                >
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-white/40 text-xs flex-wrap justify-center">
              <span className="font-semibold text-white/60">8200 | www.yas.tg</span>
              <span>·</span>
              <a href="#" className="hover:text-[#FFD100] transition font-bold uppercase tracking-wide text-white/70">
                PLUS D&apos;INFOS
              </a>
              <span>·</span>
              <a href="#" className="hover:text-[#FFD100] transition">Mentions légales</a>
              <span>·</span>
              <a href="#" className="hover:text-[#FFD100] transition">Règlement</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
