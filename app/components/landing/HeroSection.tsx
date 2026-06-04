import Link from "next/link";
import HeroSlideshow from "../HeroSlideshow";

export default function HeroSection() {
  return (
    <section id="eduboost" className="bg-[#FFD100] grid items-center gap-6 py-8 md:grid-cols-2 mx-auto max-w-6xl px-4 w-full">

      {/* Colonne texte */}
      <div>
        <div className="mb-2 flex items-end gap-2">
          <svg className="h-9 w-9 text-[#00377D]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3ZM5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.18-7-3.18Z"/>
          </svg>
          <h1 className="wordmark text-6xl text-[#00377D] sm:text-7xl">EduBoost</h1>
        </div>
        <p className="inline-block rounded-md bg-[#00377D] px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-white">
          La Grande Tombola Solidaire
        </p>
        <p className="mt-4 text-lg font-bold text-[#00377D]">BY <span>YAS TOGO</span></p>
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

      {/* Panorama 3 slides */}
      <div className="ml-auto w-full max-w-md">
        <HeroSlideshow />
      </div>
    </section>
  );
}
