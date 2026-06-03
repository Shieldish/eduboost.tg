"use client";

import Image from "next/image";
import Link from "next/link";
import { SPONSORS_OFFICIELS, SPONSORS_MEDIAS } from "../../../constants/sponsors";

function SocialBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <a href="#" aria-label={label}
      className="rounded-full flex items-center justify-center transition-colors text-sm"
      style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#FFD100";
        (e.currentTarget as HTMLAnchorElement).style.color = "#00377D";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
      }}>
      <i className={`bi ${icon}`} />
    </a>
  );
}

const SOCIALS = [
  { icon: "bi-facebook",  label: "Facebook" },
  { icon: "bi-instagram", label: "Instagram" },
  { icon: "bi-twitter-x", label: "X Twitter" },
  { icon: "bi-youtube",   label: "YouTube" },
  { icon: "bi-tiktok",    label: "TikTok" },
];

export default function LandingFooter() {
  return (
    <footer id="sponsors" className="bg-[#002A5E] text-white mt-auto safe-bottom">

      {/* Sponsors officiels */}
      <div className="border-b border-white/8 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <div className="text-white font-bold text-sm uppercase tracking-widest mb-1">NOS SPONSORS ET PARTENAIRES</div>
            <div className="text-white/50 text-xs uppercase tracking-widest">SPONSORS OFFICIELS</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {SPONSORS_OFFICIELS.map(({ src, alt }) => (
              <div key={alt} className="sponsor-logo bg-white/6 border border-white/10 rounded-2xl p-3 flex items-center justify-center w-28 sm:w-36 h-16 sm:h-20">
                <Image src={src} alt={alt} width={96} height={44} className="object-contain max-h-10 sm:max-h-12 w-auto brightness-90 contrast-110" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partenaires médias */}
      <div className="border-b border-white/8 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-5">
            <div className="text-white/50 text-xs font-bold uppercase tracking-widest">PARTENAIRES MÉDIAS</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            {SPONSORS_MEDIAS.map(({ src, alt }) => (
              <div key={alt} className="sponsor-logo bg-white/5 border border-white/8 rounded-xl p-3 flex items-center justify-center w-24 sm:w-28 h-14">
                <Image src={src} alt={alt} width={72} height={36} className="object-contain max-h-9 w-auto brightness-90" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 colonnes */}
      <div className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Colonne 1 — Marque */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#FFD100] rounded-xl p-1.5 flex items-center justify-center">
                <Image src="/yas-logo.png" alt="YAS TOGO" width={44} height={38} className="object-contain h-9 w-auto" />
              </div>
              <span className="text-[#FFD100] font-bold text-xs uppercase tracking-[.18em]">TOGO</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              YAS TOGO, engagé pour l&apos;éducation<br />et l&apos;avenir de la jeunesse.
            </p>
            <div className="flex gap-2 mt-1">
              {SOCIALS.map(s => <SocialBtn key={s.icon} {...s} />)}
            </div>
          </div>

          {/* Colonne 2 — La Tombola */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              La Tombola
            </h4>
            {[
              ["#lots",      "Comment ça marche ?"],
              ["#participer","Participer par SMS"],
              ["#participer","Participer par Web"],
              ["#participer","Participer par USSD"],
              ["#",          "Règlement officiel"],
            ].map(([href, label]) => (
              <a key={label} href={href} className="text-white/50 text-sm hover:text-[#FFD100] transition flex items-center gap-2">
                <i className="bi bi-chevron-right text-xs" />{label}
              </a>
            ))}
          </div>

          {/* Colonne 3 — Paiement */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Paiement sécurisé
            </h4>
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
              <i className="bi bi-shield-check-fill text-green-400" /> Transactions 100% sécurisées
            </div>
          </div>

          {/* Colonne 4 — Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Contact
            </h4>
            {[
              { icon: "bi-telephone-fill", text: "8200" },
              { icon: "bi-globe2",         text: "www.yas.tg" },
              { icon: "bi-envelope-fill",  text: "contact@yas.tg" },
              { icon: "bi-geo-alt-fill",   text: "Lomé, Togo" },
            ].map(({ icon, text }) => (
              <div key={text} className="text-white/50 text-sm flex items-center gap-2">
                <i className={`bi ${icon} text-[#FFD100] flex-shrink-0`} />{text}
              </div>
            ))}
            <Link href="/ticket"
              className="mt-3 bg-[#FFD100] text-[#00377D] font-bold px-5 py-3 rounded-xl text-sm hover:bg-yellow-300 transition flex items-center justify-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <i className="bi bi-ticket-perforated-fill" /> Acheter un ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/8 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD100] rounded-lg p-1 flex items-center justify-center">
              <Image src="/yas-logo.png" alt="YAS TOGO" width={32} height={28} className="object-contain h-7 w-auto" />
            </div>
            <p className="text-white/40 text-xs">YAS TOGO, engagé pour l&apos;éducation et l&apos;avenir de la jeunesse.</p>
          </div>
          <div className="flex gap-2">
            {SOCIALS.map(s => (
              <a key={s.icon} href="#" aria-label={s.label}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs"
                style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FFD100"; (e.currentTarget as HTMLAnchorElement).style.color = "#00377D"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}>
                <i className={`bi ${s.icon}`} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 text-white/40 text-xs flex-wrap justify-center">
            <span className="font-semibold text-white/60">8200 | www.yas.tg</span>
            <span>·</span>
            <a href="#" className="hover:text-[#FFD100] transition font-bold uppercase tracking-wide text-white/70">PLUS D&apos;INFOS</a>
            <span>·</span>
            <a href="#" className="hover:text-[#FFD100] transition">Mentions légales</a>
            <span>·</span>
            <a href="#" className="hover:text-[#FFD100] transition">Règlement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
