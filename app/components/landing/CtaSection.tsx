import Link from "next/link";

const SOCIALS = [
  { icon: "facebook",  label: "Facebook" },
  { icon: "youtube",   label: "YouTube" },
  { icon: "instagram", label: "Instagram" },
  { icon: "twitter-x", label: "X Twitter" },
];

export default function CtaSection() {
  return (
    <section className="my-6 mx-auto max-w-6xl px-4 w-full">
      <div className="grid gap-6 rounded-3xl bg-[#0B1F5B] p-6 text-white md:grid-cols-2 md:p-8">

        {/* Gauche — CTA achat */}
        <div className="md:border-r md:border-white/20 md:pr-8">
          <h3 className="text-2xl font-black uppercase leading-tight text-[#FFD100]">
            1 ticket = 1 chance<br/>d&apos;offrir un meilleur avenir !
          </h3>
          <p className="mt-3 max-w-md text-sm font-medium text-white/90">
            En participant, vous soutenez l&apos;éducation des jeunes et contribuez à bâtir un Togo meilleur.
          </p>
          <Link href="/ticket" className="btn-yellow mt-5 text-sm inline-flex">
            Acheter un ticket maintenant
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
          </Link>
        </div>

        {/* Droite — Tirage */}
        <div className="flex flex-col items-start gap-3 md:items-center md:text-center">
          <div className="flex items-center gap-3">
            <svg className="h-10 w-10 text-[#FFD100]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 10h14v10H5V10Zm2 2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z"/>
            </svg>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">Tirage au sort le</p>
              <p className="text-2xl font-black text-[#FFD100]">01 SEPT 2026</p>
            </div>
          </div>
          <p className="text-sm font-extrabold uppercase">En direct sur YAS TOGO TV</p>
          <p className="text-xs font-semibold text-white/70">et nos réseaux sociaux</p>
          <div className="mt-1 flex gap-3">
            {SOCIALS.map(({ label }) => (
              <span key={label} className="icon-badge h-9 w-9">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
