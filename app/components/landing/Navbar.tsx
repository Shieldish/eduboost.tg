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

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/yas-logo.png" alt="YAS TOGO" width={52} height={44} className="h-10 w-auto object-contain" priority />
          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#00377D]">TOGO</span>
        </Link>

        {/* Desktop Nav links */}
        <ul className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wide text-[#00377D] lg:flex">
          {NAV_LINKS.map(([href, label]) => (
            <li key={label}>
              <a href={href} className="hover:opacity-70 transition-opacity">{label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA buttons — fidèles à la maquette */}
        <div className="hidden lg:flex items-center gap-3">
          {/* MES TICKETS — outline rond */}
          <Link
            href="/mes-tickets"
            className="flex items-center gap-2 rounded-full border-2 border-[#00377D] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#00377D] transition hover:bg-[#00377D] hover:text-white"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Mes Tickets
          </Link>

          {/* ACHETER UN TICKET — navy plein */}
          <Link
            href="/ticket"
            className="flex items-center gap-2 rounded-full bg-[#0B1F5B] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Acheter un ticket
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
          </Link>
        </div>

        {/* Bouton Mes Tickets visible sur mobile — entre logo et hamburger */}
        <Link
          href="/mes-tickets"
          className="lg:hidden flex items-center gap-1.5 rounded-full border-2 border-[#00377D] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[#00377D] transition hover:bg-[#00377D] hover:text-white"
        >
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Mes tickets
        </Link>

        {/* Hamburger — visible uniquement sous lg */}
        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl text-[#00377D] hover:bg-[#00377D]/10 transition"
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

      {/* Mobile drawer — animation CSS (pas de conditional render pour éviter le flash) */}
      <div
        className={`lg:hidden overflow-hidden bg-[#FFD100] border-t border-[#00377D]/10 transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 border-b border-[#00377D]/10 py-3 text-sm font-bold uppercase tracking-wide text-[#00377D] last:border-0 transition hover:opacity-70"
            >
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {label}
            </a>
          ))}

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/ticket"
              className="flex items-center justify-center gap-2 rounded-full bg-[#0B1F5B] py-3 text-sm font-extrabold uppercase tracking-wide text-white"
              onClick={() => setMenuOpen(false)}
            >
              Acheter un ticket
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
              </svg>
            </Link>
            <Link
              href="/mes-tickets"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#00377D] py-3 text-sm font-extrabold uppercase tracking-wide text-[#00377D] transition hover:bg-[#00377D] hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Mes Tickets
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
