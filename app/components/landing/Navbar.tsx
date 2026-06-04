"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  ["#",           "Accueil"],
  ["#eduboost",   "EduBoost"],
  ["#lots",       "Lots"],
  ["#participer", "Comment participer"],
  ["#sponsors",   "Sponsors"],
  ["/faq",        "FAQ"],
  ["#",           "Contact"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFD100] shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/yas-logo.png" alt="YAS" width={52} height={44} className="h-10 w-auto object-contain" priority />
          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#00377D]">TOGO</span>
        </Link>

        <ul className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wide text-[#00377D] lg:flex">
          {NAV_LINKS.map(([href, label]) => (
            <li key={label}>
              <a href={href} className="hover:opacity-70 transition-opacity">{label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex items-center gap-3">
          <Link href="/mes-tickets" className="text-[#00377D] font-bold text-xs hover:opacity-70 transition-opacity flex items-center gap-1">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
            Mes tickets
          </Link>
          <Link href="/ticket" className="btn-navy px-5 py-2.5 text-xs">
            Acheter un ticket
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
          </Link>
        </div>

        <button
          className="sm:hidden w-11 h-11 flex items-center justify-center rounded-xl text-[#00377D] hover:bg-[#00377D]/10 transition"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="sm:hidden bg-[#FFD100] border-t border-[#00377D]/10 px-4 pb-4">
          {NAV_LINKS.map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-[#00377D] font-bold text-sm py-3 border-b border-[#00377D]/10 last:border-0 uppercase tracking-wide">
              <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/ticket" className="btn-navy w-full text-xs justify-center" onClick={() => setMenuOpen(false)}>
              Acheter un ticket
            </Link>
            <Link href="/mes-tickets" className="text-center text-[#00377D] font-bold text-sm py-2 underline hover:opacity-70 transition" onClick={() => setMenuOpen(false)}>
              Mes tickets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
