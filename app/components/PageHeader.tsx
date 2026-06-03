/**
 * PageHeader.tsx — Header commun à toutes les pages (sauf landing)
 *
 * Utilisé par : /ticket, /confirmation, /mes-tickets
 * La landing page a sa propre navbar complète avec menu.
 */

import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  /** Affiche le badge "Paiement sécurisé" à droite (défaut: true) */
  secure?: boolean;
  /** Lien de la page courante affiché au centre */
  title?: string;
}

export default function PageHeader({ secure = true, title }: PageHeaderProps) {
  return (
    <header className="bg-[#FFD100] px-4 sm:px-6 py-3 flex items-center justify-between shadow sticky top-0 z-40">
      {/* Logo YAS TOGO — cliquable, redirige vers l'accueil */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <Image
          src="/yas-logo.png"
          alt="YAS TOGO — Retour à l'accueil"
          width={52}
          height={44}
          className="object-contain h-10 w-auto"
          priority
        />
      </Link>

      {/* Titre central : "ÉduBoost — La Grande Tombola Solidaire" */}
      <div className="flex items-center gap-2">
        <div
          className="text-[#00377D] font-black text-base sm:text-lg italic hidden sm:block"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          🎓 ÉduBoost
        </div>
        <div className="hidden md:block bg-[#00377D] text-[#FFD100] text-xs font-bold px-3 py-1 rounded-full">
          LA GRANDE TOMBOLA SOLIDAIRE
        </div>
        {title && (
          <div className="sm:hidden text-[#00377D] font-bold text-sm">{title}</div>
        )}
      </div>

      {/* Côté droit : sécurité + lien "Mes tickets" */}
      <div className="flex items-center gap-3">
        {secure && (
          <div className="flex items-center gap-1 text-[#00377D] text-xs font-semibold">
            {/* Icône cadenas Bootstrap */}
            <i className="bi bi-shield-lock-fill text-base" />
            <span className="hidden sm:inline">Paiement sécurisé</span>
          </div>
        )}
        {/* Lien "Mes tickets" — visible sur toutes les pages sauf /mes-tickets */}
        <Link
          href="/mes-tickets"
          className="hidden sm:flex items-center gap-1 text-[#00377D] font-semibold text-xs
                     hover:opacity-70 transition-opacity"
        >
          <i className="bi bi-ticket-perforated-fill" />
          Mes tickets
        </Link>
      </div>
    </header>
  );
}
