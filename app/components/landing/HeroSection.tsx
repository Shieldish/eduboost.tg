import Link from "next/link";
import HeroSlideshow from "../HeroSlideshow";

/* Toque de soutenance positionnée au-dessus du "E" de EduBoost */
function EduBoostWordmark() {
  return (
    <div className="relative inline-block">
      {/* Toque SVG flottante au-dessus du E */}
      {/* Graduation cap avec queue - incliné -30° */}
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="absolute text-[#00377D]"
        style={{ width: 52, height: 52, top: -44, left: -6, transform: "rotate(-30deg)", transformOrigin: "center bottom" }}
        fill="currentColor"
      >
        {/* Plateau horizontal */}
        <polygon points="32,8 60,20 32,32 4,20" />
        {/* Corps du chapeau */}
        <path d="M20 24v12c0 4 5.4 7 12 7s12-3 12-7V24L32 32 20 24Z" />
        {/* Queue (cordon) pendante à gauche */}
        <line x1="4" y1="20" x2="4" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="4" cy="38" r="2.5" />
      </svg>
      <h1 className="wordmark text-6xl text-[#00377D] sm:text-7xl">EduBoost</h1>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="eduboost" className="bg-[#FFD100] w-full">
      <div className="mx-auto max-w-6xl px-4 grid items-center gap-6 py-8 md:grid-cols-2">

      {/* Colonne texte */}
      <div>
        <div className="mb-2 flex items-end gap-2 pt-8">
          <EduBoostWordmark />
        </div>
        <p className="inline-block rounded-md bg-[#00377D] px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-white">
          La Grande Tombola pour l&apos;Éducation
        </p>
        <p className="mt-3 max-w-md text-sm font-semibold text-[#00377D]">
          Jouons aujourd&apos;hui, construisons l&apos;avenir de nos enfants.
        </p>
        <p className="mt-3 max-w-md text-sm font-semibold text-[#00377D]">
          Des bourses et kits scolaires à gagner pour soutenir l&apos;éducation au Togo.
        </p>
        <Link href="/ticket" className="btn-navy mt-6 inline-flex text-sm">
          Acheter un ticket
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
          </svg>
        </Link>
      </div>

      {/* Slideshow */}
      <div className="ml-auto w-full max-w-md">
        <HeroSlideshow />
      </div>
      </div>
    </section>
  );
}
