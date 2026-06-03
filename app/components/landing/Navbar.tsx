"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  ["#", "ACCUEIL"], ["#", "ÉDUBOOST"], ["#lots", "LOTS"],
  ["#participer", "COMMENT PARTICIPER"], ["#sponsors", "SPONSORS"],
  ["#", "FAQ"], ["#", "CONTACT"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-[#FFD100] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/yas-logo.png" alt="YAS TOGO" width={52} height={44} className="object-contain h-10 w-auto" priority />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[#00377D] font-semibold text-sm">
          {NAV_LINKS.map(([href, label]) => (
            <a key={label} href={href} className="hover:opacity-70 transition-opacity py-1 tracking-wide">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/ticket"
            className="ticket-shine bg-[#00377D] text-[#FFD100] font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#002A5E] transition-colors flex items-center gap-1.5 shadow-md whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <i className="bi bi-ticket-perforated-fill" />
            <span className="hidden sm:inline">ACHETER UN TICKET</span>
            <span className="sm:hidden">250 FCFA</span>
          </Link>

          <button
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-[#00377D] hover:bg-[#00377D]/10 transition"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#FFD100] border-t border-[#00377D]/10 px-4 pb-4">
          {NAV_LINKS.map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#00377D] font-semibold text-base py-3 border-b border-[#00377D]/10 last:border-0">
              <i className="bi bi-chevron-right text-xs" />{label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
