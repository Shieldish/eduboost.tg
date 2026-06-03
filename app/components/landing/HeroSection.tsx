import Link from "next/link";
import HeroSlideshow from "../HeroSlideshow";

export default function HeroSection() {
  return (
    <section className="hero-pattern bg-[#FFD100] section-wave pb-16 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">

        {/* Colonne texte */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <div className="inline-flex items-center gap-2 bg-[#00377D] text-[#FFD100] text-xs font-black px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            <i className="bi bi-stars" /> By YAS TOGO
          </div>

          <h1 className="text-[#00377D] font-black leading-none mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2.4rem, 8vw, 4.5rem)" }}>
            🎓 ÉduBoost
          </h1>

          <div className="bg-[#00377D] text-[#FFD100] inline-block font-black text-sm sm:text-base px-4 py-1 rounded mb-2 uppercase tracking-wide">
            LA GRANDE TOMBOLA SOLIDAIRE
          </div>

          <div className="text-[#00377D] font-bold text-sm mb-3">BY YAS TOGO</div>

          <p className="text-[#00377D] font-medium text-sm sm:text-base mb-1">
            Jouons aujourd&apos;hui, construisons l&apos;avenir de nos enfants.
          </p>
          <p className="text-[#00377D]/75 text-sm mb-6 max-w-md leading-relaxed">
            Des bourses et kits scolaires à gagner pour soutenir l&apos;éducation au Togo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link href="/ticket"
              className="ticket-shine pulse-cta bg-[#00377D] text-[#FFD100] font-bold px-7 py-4 rounded-2xl text-base hover:bg-[#002A5E] transition flex items-center justify-center gap-2 shadow-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <i className="bi bi-ticket-perforated-fill text-lg" />
              ACHETER UN TICKET MAINTENANT 
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[#00377D] text-xs font-semibold">
            <span className="flex items-center gap-1"><i className="bi bi-shield-check-fill" /> Paiement sécurisé</span>
            <span className="flex items-center gap-1"><i className="bi bi-lightning-fill" /> Ticket par SMS</span>
            <span className="flex items-center gap-1"><i className="bi bi-calendar-event-fill" /> Tirage 01/09/2026</span>
          </div>
        </div>

        {/* Colonne slideshow */}
        <div className="w-full sm:w-auto sm:flex-shrink-0" style={{ maxWidth: 320 }}>
          <div className="sm:hidden"><HeroSlideshow /></div>
          <div className="hidden sm:block" style={{ width: 520 }}><HeroSlideshow /></div>
        </div>
      </div>
    </section>
  );
}
