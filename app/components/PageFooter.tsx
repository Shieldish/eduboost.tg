/**
 * PageFooter.tsx — Footer compact commun à toutes les pages (sauf landing)
 *
 * Utilisé par : /ticket, /confirmation, /mes-tickets
 *
 * Contient :
 *   - Logo YAS TOGO (image réelle, visible sur fond sombre)
 *   - Slogan
 *   - Icônes réseaux sociaux (visibles en blanc/jaune)
 *
 * Fix visibilité :
 *   - Logo : pas de brightness-0 invert → on utilise le logo blanc/jaune
 *     ou on affiche directement le texte stylisé si le logo est bleu sur blanc
 *   - Icônes Bootstrap : couleur blanche explicite (#ffffff), fond rgba visible
 */

import Link from "next/link";
import Image from "next/image";

// Réseaux sociaux YAS TOGO
// TODO prod : remplacer "#" par les vraies URLs
const SOCIALS = [
  { icon: "bi-facebook",  href: "#", label: "Facebook YAS TOGO" },
  { icon: "bi-instagram", href: "#", label: "Instagram YAS TOGO" },
  { icon: "bi-twitter-x", href: "#", label: "X (Twitter) YAS TOGO" },
  { icon: "bi-youtube",   href: "#", label: "YouTube YAS TOGO" },
  { icon: "bi-tiktok",    href: "#", label: "TikTok YAS TOGO" },
];

export default function PageFooter() {
  return (
    <footer className="bg-[#002A5E] text-white px-4 py-5 safe-bottom">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo YAS — image réelle sur fond #FFD100 (identique au header) */}
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
          <div>
            <div className="text-[#FFD100] font-bold text-xs uppercase tracking-[.18em]">TOGO</div>
            <div className="text-white/50 text-xs">La Tombola Solidaire</div>
          </div>
        </div>

        <p className="text-white/40 text-xs text-center hidden sm:block">
          YAS TOGO, engagé pour l&apos;éducation et l&apos;avenir de la jeunesse.
        </p>

        {/* Icônes réseaux sociaux — visibles explicitement en blanc */}
        <div className="flex gap-2">
          {SOCIALS.map(({ icon, href, label }) => (
            <a
              key={icon}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full flex items-center justify-center transition"
              style={{
                background: "rgba(255,255,255,0.12)",  /* fond visible */
                color: "#ffffff",                       /* icône blanche */
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#FFD100";
                (e.currentTarget as HTMLAnchorElement).style.color = "#00377D";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
            >
              {/* Bootstrap Icon — classe "bi bi-facebook" etc. */}
              <i className={`bi ${icon} text-sm`} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
