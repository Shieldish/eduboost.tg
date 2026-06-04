import Link from "next/link";

export default function ParticiperSection() {
  return (
    <section id="participer" className="mx-auto max-w-6xl px-4 w-full">
      <div className="rounded-3xl bg-white p-6 md:p-8">
        <h2 className="text-center text-2xl font-black uppercase text-[#00377D]">
          Comment participer ?
        </h2>

        <div className="mt-8 grid items-start gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">

          {/* PAR SMS */}
          <div className="text-center">
            <span className="mx-auto inline-block rounded-md bg-[#00377D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Par SMS
            </span>
            <span className="icon-badge mx-auto my-4 h-20 w-20">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v12h10V5H7Zm5 13.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/>
              </svg>
            </span>
            <p className="text-sm font-bold uppercase text-[#00377D]">Envoyer BOURSE au</p>
            <p className="mt-2 inline-block rounded-md bg-[#FFD100] px-6 py-2 text-3xl font-black text-[#00377D]">
              8998
            </p>
            <p className="mx-auto mt-3 max-w-[12rem] text-xs font-semibold text-[#00377D]">
              Suivez les instructions pour acheter votre ticket 250 FCFA
            </p>
          </div>

          {/* Séparateur OU */}
          <div className="flex items-center justify-center">
            <span className="rounded-full border-2 border-[#00377D] px-3 py-2 text-sm font-extrabold text-[#00377D]">
              OU
            </span>
          </div>

          {/* SUR LE WEB */}
          <div className="text-center">
            <span className="mx-auto inline-block rounded-md bg-[#00377D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Sur le web
            </span>
            <span className="icon-badge mx-auto my-4 h-20 w-20">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8ZM12 4c.83 1.2 1.48 2.54 1.91 4h-3.82c.43-1.46 1.08-2.8 1.91-4ZM4.26 14a7.96 7.96 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4H4.26Zm.81 2h2.95c.35 1.27.82 2.46 1.38 3.56A8.03 8.03 0 0 1 5.07 16Zm2.95-8H5.07a8.03 8.03 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.02 8ZM12 20c-.83-1.2-1.48-2.54-1.91-4h3.82c-.43 1.46-1.08 2.8-1.91 4Zm2.34-6H9.66a14.7 14.7 0 0 1 0-4h4.68a14.7 14.7 0 0 1 0 4Zm.26 5.56c.56-1.1 1.03-2.29 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56ZM16.36 14a16.6 16.6 0 0 0 0-4h3.38a7.96 7.96 0 0 1 0 4h-3.38Z"/>
              </svg>
            </span>
            <p className="text-sm font-bold uppercase text-[#00377D]">Cliquez sur</p>
            <Link
              href="/ticket"
              className="mt-2 inline-block rounded-md bg-[#FFD100] px-4 py-2 text-base font-black text-[#00377D] hover:brightness-95 transition"
            >
              www.eduboost.tg/ticket
            </Link>
            <p className="mx-auto mt-3 max-w-[12rem] text-xs font-semibold text-[#00377D]">
              Achetez votre ticket en ligne en toute sécurité
            </p>
          </div>

          {/* Séparateur OU */}
          <div className="flex items-center justify-center">
            <span className="rounded-full border-2 border-[#00377D] px-3 py-2 text-sm font-extrabold text-[#00377D]">
              OU
            </span>
          </div>

          {/* PAR USSD */}
          <div className="text-center">
            <span className="mx-auto inline-block rounded-md bg-[#00377D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              Par USSD
            </span>
            <span className="icon-badge mx-auto my-4 h-20 w-20">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v3h10V4H7Zm1.5 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-7 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
              </svg>
            </span>
            <p className="text-sm font-bold uppercase text-[#00377D]">Composez</p>
            <p className="mt-2 inline-block rounded-md bg-[#FFD100] px-6 py-2 text-2xl font-black text-[#00377D]">
              *909*5#
            </p>
            <p className="mx-auto mt-3 max-w-[12rem] text-xs font-semibold text-[#00377D]">
              Sélectionnez EduBoost et suivez les instructions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
