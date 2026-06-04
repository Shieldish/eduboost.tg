"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readConfirmation, clearConfirmation, type ConfirmationData } from "@/lib/confirmation-store";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

function ConfirmationContent() {
  const router = useRouter();
  const [data,    setData]    = useState<ConfirmationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmation = readConfirmation();
    const t = setTimeout(() => {
      if (!confirmation) {
        router.replace("/");
        return;
      }
      setData(confirmation);
      setLoading(false);
      setTimeout(() => clearConfirmation(), 500);
    }, 0);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-[#00377D] font-bold flex items-center gap-2">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z"/>
          </svg>
          <span>Chargement…</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { ref, codes, qty, total, phone } = data;
  const masked = phone.length >= 4 ? phone.slice(0, 2) + " XX XX " + phone.slice(-2) : phone;

  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-gray-50">
      <PageHeader />

      <main id="main-content" className="flex-1 mx-auto max-w-3xl px-4 py-8 w-full">
        <section className="rounded-3xl bg-gray-100/70 p-6 sm:p-10">

          {/* Succès + confettis */}
          <div className="relative flex justify-center">
            <span className="absolute left-[18%] top-2 h-2 w-3 rotate-45 rounded-sm bg-[#FFD100]" aria-hidden="true"></span>
            <span className="absolute left-[30%] top-8 h-2 w-3 -rotate-12 rounded-sm bg-[#5F99D2]" aria-hidden="true"></span>
            <span className="absolute left-[12%] top-16 h-2.5 w-2.5 rounded-full bg-[#5F99D2]" aria-hidden="true"></span>
            <span className="absolute right-[30%] top-3 h-2 w-3 rotate-12 rounded-sm bg-[#1E9E4A]" aria-hidden="true"></span>
            <span className="absolute right-[16%] top-9 h-2 w-3 rotate-45 rounded-sm bg-[#FFD100]" aria-hidden="true"></span>
            <span className="absolute right-[12%] top-20 h-2.5 w-2.5 rounded-full bg-[#5F99D2]" aria-hidden="true"></span>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1E9E4A] shadow-lg" role="img" aria-label="Achat réussi">
              <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 13 4 4L19 7"/>
              </svg>
            </div>
          </div>

          <h1 className="mt-6 text-center text-5xl font-black text-[#00377D]">Félicitations !</h1>
          <p className="mt-2 text-center text-xl font-bold text-[#1E9E4A]">Votre achat a été effectué avec succès.</p>

          {/* Détails */}
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-card sm:p-7">
            {[
              {
                icon: <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>,
                label: "Référence de Paiement",
                value: ref,
              },
              {
                icon: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 4v2h8V6H8Zm0 4v2h2v-2H8Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Zm-8 4v2h2v-2H8Zm4 0v2h2v-2h-2Z"/>,
                label: "Nombre de tickets",
                value: `${qty} ticket${qty > 1 ? "s" : ""}`,
              },
              {
                icon: <><path d="M0 0h24v24H0z" fill="none"/><text x="2" y="16" fontSize="9" fontWeight="bold" fill="currentColor">FCFA</text></>,
                label: "Montant payé",
                value: `${total.toLocaleString("fr-FR")} FCFA`,
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="icon-badge h-12 w-12">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icon}</svg>
                  </span>
                  <span className="text-base font-semibold text-[#00377D]">{label}</span>
                </div>
                <span className="text-lg font-black text-[#1E9E4A]">{value}</span>
              </div>
            ))}

            {/* Codes tickets */}
            {codes.length > 0 && (
              <section className="mt-4" aria-labelledby="codes-heading">
                <h2 id="codes-heading" className="text-sm font-bold text-[#00377D] uppercase tracking-wide mb-3">
                  Vos codes tickets
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list" aria-label="Codes tickets">
                  {codes.map((code, i) => (
                    <div key={code} role="listitem"
                      className="bg-[#00377D] text-[#FFD100] font-black text-center py-2.5 px-3 rounded-xl text-sm tracking-widest">
                      <div className="text-white/40 text-xs font-normal mb-0.5">#{i + 1}</div>
                      {code}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button onClick={() => window.print()} className="btn-outline py-4 text-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                </svg>
                Télécharger le reçu
              </button>
              <Link href="/" className="btn-navy rounded-xl py-4 text-sm">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3L12 3Z"/>
                </svg>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>

          {/* Note info SMS */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#5F99D2]/15 p-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5F99D2] text-white" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/>
              </svg>
            </span>
            <p className="text-sm font-medium text-[#00377D]">
              Vos tickets ont été envoyés par SMS au <strong>+228 {masked}</strong>.
            </p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

export default function ConfirmationPage() {
  return <ConfirmationContent />;
}
