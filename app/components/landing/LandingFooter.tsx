import Image from "next/image";
import Link from "next/link";
import {
  Phone, Globe, ChevronRight, Ticket,
  CalendarDays, MessageSquare, Smartphone,
} from "lucide-react";
import { SPONSORS_OFFICIELS, SPONSORS_MEDIAS } from "../../../constants/sponsors";

/* ── Icônes sociales (SVG inline — pas dans lucide-react v1) ── */
function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 22v-9h3l.5-3.5H13V7.3c0-1 .3-1.7 1.8-1.7H17V2.4c-.4-.05-1.5-.15-2.8-.15-2.8 0-4.7 1.7-4.7 4.8V9.5H6V13h3.5v9H13Z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 12 18.7 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0Z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 2h3l-7.5 8.6L21 22h-6.3l-4.9-6.4L4 22H1l8-9.2L3 2h6.4l4.5 5.9L17 2Zm-1.1 18h1.7L8.2 3.8H6.4L15.9 20Z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.5a7.5 7.5 0 0 0-1.3-4.1c-.6-.7-1.3-1.1-2.2-1.2C17.4 2 12 2 12 2s-5.4 0-7.5.2c-.9.1-1.6.5-2.2 1.2A7.5 7.5 0 0 0 1 7.5C.8 9 .8 12 .8 12s0 3 .2 4.5a7.5 7.5 0 0 0 1.3 4.1c.6.7 1.4 1.1 2.2 1.2 2.1.2 7.5.2 7.5.2s5.4 0 7.5-.2c.9-.1 1.6-.5 2.2-1.2a7.5 7.5 0 0 0 1.3-4.1c.2-1.5.2-4.5.2-4.5s0-3-.2-4.5ZM9.8 15.5v-7l6 3.5-6 3.5Z"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8ZM12 4c.83 1.2 1.48 2.54 1.91 4h-3.82c.43-1.46 1.08-2.8 1.91-4ZM4.26 14a7.96 7.96 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4H4.26Zm.81 2h2.95c.35 1.27.82 2.46 1.38 3.56A8.03 8.03 0 0 1 5.07 16Zm2.95-8H5.07a8.03 8.03 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.02 8ZM12 20c-.83-1.2-1.48-2.54-1.91-4h3.82c-.43 1.46-1.08 2.8-1.91 4Zm2.34-6H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4Zm.26 5.56c.56-1.1 1.03-2.29 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56ZM16.36 14a16.6 16.6 0 0 0 0-4h3.38a7.96 7.96 0 0 1 0 4h-3.38Z"/>
    </svg>
  );
}

const SOCIALS = [
  { Icon: FacebookIcon,  label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: XIcon,         label: "X Twitter" },
  { Icon: YoutubeIcon,   label: "YouTube" },
  { Icon: GlobeIcon,     label: "Site web" },
];

const NAV_LINKS = [
  { href: "#",           label: "Accueil" },
  { href: "#eduboost",   label: "ÉduBoost" },
  { href: "#lots",       label: "Lots" },
  { href: "#participer", label: "Comment participer" },
  { href: "#sponsors",   label: "Sponsors" },
  { href: "#",           label: "FAQ" },
  { href: "#",           label: "Contact" },
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#0B1F5B]" id="sponsors">

      {/* ── SPONSORS ───────────────────────────────────────────────── */}
      <div className="border-b border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-sm font-extrabold uppercase tracking-widest text-white mb-6">
            Nos sponsors et partenaires
          </h2>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
            Sponsors officiels
          </p>
          <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-5">
            {SPONSORS_OFFICIELS.map(({ src, alt }) => (
              <div key={alt} className="sponsor-logo flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
                <Image src={src} alt={alt} width={96} height={40} className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mt-6 mb-3">
            Partenaires médias
          </p>
          <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-6">
            {SPONSORS_MEDIAS.map(({ src, alt }) => (
              <div key={alt} className="sponsor-logo flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
                <Image src={src} alt={alt} width={72} height={36} className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4 COLONNES ─────────────────────────────────────────────── */}
      <div className="py-10">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Colonne 1 — Marque */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#FFD100] rounded-xl p-1.5 flex items-center justify-center">
                <Image src="/yas-logo.png" alt="YAS TOGO" width={44} height={38} className="h-8 w-auto object-contain" />
              </div>
              <div>
                <p className="text-[#FFD100] font-black text-base italic leading-none">ÉduBoost</p>
                <p className="text-white/50 text-[10px] font-semibold tracking-wide">by YAS TOGO</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              YAS TOGO, engagé pour l&apos;éducation et l&apos;avenir de la jeunesse.
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-[#FFD100] hover:text-[#0B1F5B] transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[#FFD100] font-extrabold text-xs uppercase tracking-widest mb-2">
              Navigation
            </h4>
            {NAV_LINKS.map(({ href, label }) => (
              <a key={label} href={href}
                className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-[#FFD100] flex-shrink-0" strokeWidth={2.5} />
                {label}
              </a>
            ))}
          </div>

          {/* Colonne 3 — Participer */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#FFD100] font-extrabold text-xs uppercase tracking-widest">
              Participer
            </h4>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFD100]/15 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-[#FFD100]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white/60 text-xs">Par SMS</p>
                <p className="text-white font-black text-2xl leading-none">8998</p>
                <p className="text-white/50 text-xs mt-0.5">Envoyez BOURSE</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFD100]/15 flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-4 w-4 text-[#FFD100]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white/60 text-xs">Par USSD</p>
                <p className="text-white font-black text-2xl leading-none">*909*5#</p>
              </div>
            </div>
            <Link href="/ticket" className="btn-yellow text-xs inline-flex mt-1">
              <Ticket className="h-4 w-4" strokeWidth={1.8} />
              Acheter en ligne
            </Link>
          </div>

          {/* Colonne 4 — Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#FFD100] font-extrabold text-xs uppercase tracking-widest">
              Contact
            </h4>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Phone className="h-4 w-4 text-[#FFD100] flex-shrink-0" strokeWidth={1.8} />
              8200
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Globe className="h-4 w-4 text-[#FFD100] flex-shrink-0" strokeWidth={1.8} />
              www.eduboost.tg
            </div>
            {/* Tirage */}
            <div className="mt-1 rounded-xl bg-white/8 border border-white/10 p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white/60 text-xs font-semibold">
                <CalendarDays className="h-4 w-4 text-[#FFD100]" strokeWidth={1.8} />
                Tirage au sort
              </div>
              <p className="text-[#FFD100] font-black text-lg leading-tight">01 Septembre 2026</p>
              <p className="text-white/50 text-xs">En direct sur YAS TOGO TV</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT BAR ──────────────────────────────────────────── */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs">
          <span>© 2026 YAS TOGO — EduBoost. Tous droits réservés.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#FFD100] transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-[#FFD100] transition-colors">Règlement</Link>
            <Link href="#" className="hover:text-[#FFD100] transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
