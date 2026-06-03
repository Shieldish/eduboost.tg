import Link from "next/link";

function SeparateurOU() {
  return (
    <div className="flex sm:flex-col items-center justify-center px-4 py-3 sm:py-0">
      <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
      <span className="mx-3 sm:my-3 text-[#00377D] font-black text-sm bg-white border-2 border-gray-200 rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0">
        OU
      </span>
      <div className="h-px sm:h-full sm:w-px w-full bg-gray-200 flex-1" />
    </div>
  );
}

export default function ParticiperSection() {
  return (
    <section id="participer" className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-[#00377D] font-black text-3xl sm:text-4xl uppercase tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            COMMENT PARTICIPER ?
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-0 max-w-5xl mx-auto">

          {/* SMS */}
          <div className="card-lift flex-1 bg-white rounded-3xl p-7 shadow-md border border-gray-100 text-center">
            <div className="text-[#00377D] font-bold text-xs uppercase tracking-widest mb-4">PAR SMS</div>
            <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <i className="bi bi-phone-fill text-3xl text-[#00377D]" />
            </div>
            <p className="text-gray-500 text-sm mb-3">ENVOYER <strong>BOURSE</strong> AU</p>
            <div className="bg-[#00377D] text-[#FFD100] font-black text-4xl rounded-2xl py-4 shadow-lg mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>8998</div>
            <p className="text-gray-400 text-xs leading-relaxed">Suivez les instructions pour acheter votre ticket 250 FCFA</p>
          </div>

          <SeparateurOU />

          {/* Web - mis en avant */}
          <div className="card-lift flex-1 bg-[#00377D] rounded-3xl p-7 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-[#FFD100] text-[#00377D] text-xs font-black px-3 py-1 rounded-full">
              <i className="bi bi-star-fill mr-1" />Recommandé
            </div>
            <div className="text-[#FFD100] font-bold text-xs uppercase tracking-widest mb-4">SUR LE WEB</div>
            <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <i className="bi bi-globe2 text-3xl text-[#00377D]" />
            </div>
            <p className="text-white/70 text-sm mb-2">CLIQUEZ SUR</p>
            <Link href="/ticket"
              className="ticket-shine bg-[#FFD100] text-[#00377D] font-bold py-3 px-5 rounded-xl text-sm hover:bg-[#FFEC00] transition block mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              www.eduboost.tg/ticket
            </Link>
            <p className="text-white/40 text-xs">Achetez votre ticket en ligne en toute sécurité</p>
          </div>

          <SeparateurOU />

          {/* USSD */}
          <div className="card-lift flex-1 bg-white rounded-3xl p-7 shadow-md border border-gray-100 text-center">
            <div className="text-[#00377D] font-bold text-xs uppercase tracking-widest mb-4">PAR USSD</div>
            <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-5 shadow-lg">
              <i className="bi bi-grid-3x3-gap-fill text-3xl text-[#00377D]" />
            </div>
            <p className="text-gray-500 text-sm mb-3">COMPOSEZ</p>
            <div className="bg-[#00377D] text-[#FFD100] font-black text-3xl rounded-2xl py-4 shadow-lg mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>*909*5#</div>
            <p className="text-gray-400 text-xs leading-relaxed">Sélectionnez ÉduBoost et suivez les instructions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
