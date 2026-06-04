export default function PrixSection() {
  return (
    <>
      {/* PRIZE BAND — fond crème */}
      <section id="lots" className="bg-[#FFF7DC] mx-auto max-w-6xl px-4 w-full">
        <div className="grid items-center gap-6 rounded-3xl p-6 md:grid-cols-2 md:p-8">
          <div>
            <span className="inline-block rounded-md bg-[#00377D] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
              Plus de
            </span>
            <p className="mt-2 text-4xl font-black text-[#00377D] sm:text-5xl">
              10 000 000 <span className="text-2xl">FCFA</span>
            </p>
            <p className="text-xl font-extrabold uppercase text-[#00377D]">de prix à gagner !</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <span className="icon-badge h-14 w-14 flex-shrink-0">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 21 5.5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.52 16.37 6.48 18 8 18h12v-2H8.42c-.14 0-.25-.11-.25-.25l.03-.12.96-1.63Z"/>
                </svg>
              </span>
              <div>
                <p className="text-xl font-black text-[#00377D]">5 000 000 <span className="text-sm font-bold">FCFA</span></p>
                <p className="text-xs font-bold uppercase text-[#00377D]">de bons d&apos;achat d&apos;articles scolaires</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="icon-badge h-14 w-14 flex-shrink-0">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3ZM5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.18-7-3.18Z"/>
                </svg>
              </span>
              <div>
                <p className="text-xl font-black text-[#00377D]">5 000 000 <span className="text-sm font-bold">FCFA</span></p>
                <p className="text-xs font-bold uppercase text-[#00377D]">de frais de scolarité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAVY 3-FEATURE BAND */}
      <section className="my-6 mx-auto max-w-6xl px-4 w-full">
        <div className="grid gap-6 rounded-3xl bg-[#0B1F5B] p-6 text-white sm:grid-cols-3">
          <div className="flex items-center gap-3 sm:justify-center">
            <svg className="h-9 w-9 text-[#FFD100] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-2.18A3 3 0 0 0 13 2.18 3 3 0 0 0 8.18 6H6a2 2 0 0 0-2 2v2h8V8h0v12h2V8h8V8a2 2 0 0 0-2-2Zm-9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM4 12v8a2 2 0 0 0 2 2h4v-10H4Zm10 10h4a2 2 0 0 0 2-2v-8h-6v10Z"/>
            </svg>
            <p className="text-sm font-bold uppercase leading-tight">Des bourses scolaires<br/>pour les élèves</p>
          </div>
          <div className="flex items-center gap-3 sm:justify-center sm:border-x sm:border-white/20">
            <svg className="h-9 w-9 text-[#FFD100] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 2a3 3 0 0 0-3 3v1H5a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a2 2 0 0 0-2-2h-1V5a3 3 0 0 0-3-3H9Zm0 2h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Zm-3 6h2v3h8v-3h2v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9Z"/>
            </svg>
            <p className="text-sm font-bold uppercase leading-tight">Des kits scolaires<br/>pour bien démarrer</p>
          </div>
          <div className="flex items-center gap-3 sm:justify-center">
            <svg className="h-9 w-9 text-[#FFD100] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.67 0-8 1.34-8 4v3h10v-3c0-.97.62-1.81 1.55-2.4C10.43 13.23 9.1 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v3h7v-3c0-2.66-5.33-4-8-3.5Z"/>
            </svg>
            <p className="text-sm font-bold uppercase leading-tight">Un impact réel pour<br/>l&apos;éducation au Togo</p>
          </div>
        </div>
      </section>
    </>
  );
}
