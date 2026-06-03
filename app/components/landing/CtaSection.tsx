import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-[#FFD100] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <i className="bi bi-hand-thumbs-up-fill text-[#00377D] text-2xl" />
            <h3 className="text-[#00377D] font-black text-lg sm:text-xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              1 TICKET = 1 CHANCE D&apos;OFFRIR UN MEILLEUR AVENIR !
            </h3>
          </div>
          <p className="text-[#00377D]/70 text-sm max-w-md mx-auto md:mx-0">
            En participant, vous soutenez l&apos;éducation des jeunes et contribuez à bâtir un Togo meilleur.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
          <div className="bg-[#00377D] text-white rounded-2xl px-7 py-4 text-center shadow-xl w-full max-w-xs">
            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold mb-1 justify-center">
              <i className="bi bi-calendar2-event-fill text-[#FFD100]" /> TIRAGE AU SORT LE
            </div>
            <div className="text-[#FFD100] font-black text-2xl sm:text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              01 SEPT 2026
            </div>
            <div className="text-white/60 text-xs mt-1 flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1"><i className="bi bi-tv-fill" /> EN DIRECT SUR YAS TOGO TV</span>
              <span>ET NOS RÉSEAUX SOCIAUX</span>
            </div>
            <div className="flex gap-2 justify-center mt-2">
              {["bi-youtube", "bi-facebook", "bi-instagram", "bi-tiktok"].map(i => (
                <a key={i} href="#"
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD100] hover:text-[#00377D] transition text-xs text-white">
                  <i className={`bi ${i}`} />
                </a>
              ))}
            </div>
          </div>

          <Link href="/ticket"
            className="ticket-shine bg-[#00377D] text-[#FFD100] font-bold px-7 py-4 rounded-2xl hover:bg-[#002A5E] transition w-full max-w-xs text-center flex items-center justify-center gap-2 shadow-lg"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <i className="bi bi-ticket-perforated-fill text-lg" />
            ACHETER UN TICKET MAINTENANT 
          </Link>
        </div>
      </div>
    </section>
  );
}
