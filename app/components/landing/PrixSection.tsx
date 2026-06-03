export default function PrixSection() {
  return (
    <section id="lots" className="bg-[#00377D] text-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-[#FFD100] font-bold text-sm sm:text-base uppercase tracking-widest mb-2">PLUS DE</div>
          <h2 className="text-[#FFD100] font-black leading-none"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2rem, 7vw, 3.5rem)" }}>
            10 000 000 FCFA
          </h2>
          <div className="text-white font-black text-lg sm:text-xl mt-1">DE PRIX À GAGNER !</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-8">
          {[
            { icon: "bi-cart-fill",        label: "DE BONS D'ACHAT D'ARTICLES SCOLAIRES", amount: "5 000 000" },
            { icon: "bi-mortarboard-fill", label: "DE FRAIS DE SCOLARITÉ",               amount: "5 000 000" },
          ].map(({ icon, label, amount }) => (
            <div key={label} className="card-lift bg-[#003D8F] rounded-2xl p-6 sm:p-8 text-center border border-white/10">
              <i className={`bi ${icon} text-4xl text-[#FFD100] mb-3 block`} />
              <div className="text-[#FFD100] font-black text-2xl sm:text-3xl mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {amount} FCFA
              </div>
              <div className="text-white font-semibold text-xs sm:text-sm tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: "bi-award-fill",    label: "DES BOURSES SCOLAIRES\nPOUR LES ÉLÈVES" },
            { icon: "bi-backpack-fill", label: "DES KITS SCOLAIRES\nPOUR BIEN DÉMARRER" },
            { icon: "bi-people-fill",   label: "UN IMPACT RÉEL POUR\nL'ÉDUCATION AU TOGO" },
          ].map(({ icon, label }) => (
            <div key={label} className="card-lift flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#FFD100]/20 flex items-center justify-center flex-shrink-0">
                <i className={`bi ${icon} text-xl text-[#FFD100]`} />
              </div>
              <span className="text-white font-semibold text-sm leading-snug whitespace-pre-line">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
