/**
 * confirmation/page.tsx — Page de confirmation après achat réussi
 *
 * Sécurité :
 *   Les données (codes, numéro, montant) sont lues depuis sessionStorage
 *   et NON depuis l'URL. Cela évite leur présence dans :
 *   - L'historique du navigateur
 *   - Les logs Nginx / Gunicorn
 *   - Les referrer headers
 *
 *   Lecture unique (readConfirmation efface après lecture).
 *   Expiration 5 minutes.
 */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readConfirmation, type ConfirmationData } from "@/lib/confirmation-store";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

function ConfirmationContent() {
  const router = useRouter();
  const [data,    setData]    = useState<ConfirmationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmation = readConfirmation();
    if (!confirmation) {
      // Pas de données ou expirées → retour à l'accueil
      router.replace("/");
      return;
    }
    setData(confirmation);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-[#00377D] font-bold flex items-center gap-2">
          <i className="bi bi-arrow-clockwise animate-spin" aria-hidden="true" />
          <span>Chargement…</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { ref, codes, qty, total, phone } = data;
  const masked = phone.length >= 4
    ? phone.slice(0, 2) + " XX XX " + phone.slice(-2)
    : phone;

  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#F8F9FB]">
      <PageHeader />

      <main id="main-content" className="flex-1 flex items-start justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-10 max-w-lg w-full text-center">

          {/* Icône succès */}
          <div className="relative inline-flex items-center justify-center mb-6" role="img" aria-label="Achat réussi">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <i className="bi bi-check-lg text-white text-4xl sm:text-5xl" aria-hidden="true" />
            </div>
            <span className="absolute -top-2 -left-3 text-yellow-400 text-lg" style={{ transform: "rotate(-20deg)" }} aria-hidden="true">✦</span>
            <span className="absolute -top-3 right-0 text-blue-400 text-sm" style={{ transform: "rotate(15deg)" }} aria-hidden="true">✦</span>
            <span className="absolute bottom-0 -left-5 text-[#FFD100] text-base" style={{ transform: "rotate(-10deg)" }} aria-hidden="true">✦</span>
            <span className="absolute bottom-2 -right-3 text-red-400 text-sm" style={{ transform: "rotate(20deg)" }} aria-hidden="true">✦</span>
          </div>

          <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Félicitations !
          </h1>
          <p className="text-green-600 font-semibold text-base sm:text-lg mb-7">
            Votre achat a été effectué avec succès.
          </p>

          {/* Détails */}
          <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 text-left mb-6">
            {[
              { icon: "bi-ticket-perforated-fill", label: "Référence de Paiement", value: ref },
              { icon: "bi-collection-fill",        label: "Nombre de tickets",     value: `${qty} ticket${qty > 1 ? "s" : ""}` },
              { icon: "bi-cash-coin",              label: "Montant payé",          value: `${total.toLocaleString("fr-FR")} FCFA` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 px-4 sm:px-5 py-4">
                <div className="w-10 h-10 rounded-full bg-[#FFD100] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <i className={`bi ${icon} text-[#00377D] text-base`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-400 text-xs">{label}</div>
                </div>
                <div className="text-[#00377D] font-black text-sm sm:text-base truncate max-w-[140px]">{value}</div>
              </div>
            ))}
          </div>

          {/* Codes tickets */}
          {codes.length > 0 && (
            <section className="mb-6" aria-labelledby="codes-heading">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
                <h2 id="codes-heading" className="text-[#00377D] font-bold text-sm uppercase tracking-wide flex items-center gap-1">
                  <i className="bi bi-ticket-perforated-fill text-[#FFD100]" aria-hidden="true" />
                  Vos codes tickets
                </h2>
                <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list" aria-label="Liste de vos codes tickets">
                {codes.map((code, i) => (
                  <div
                    key={code}
                    role="listitem"
                    className="bg-[#00377D] text-[#FFD100] font-black text-center py-2.5 px-3 rounded-xl text-sm tracking-widest"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <div className="text-white/40 text-xs font-normal mb-0.5">#{i + 1}</div>
                    {code}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                <i className="bi bi-shield-check text-green-500" aria-hidden="true" />
                Conservez ces codes — ils sont votre participation officielle
              </p>
            </section>
          )}

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => window.print()}
              className="flex-1 border-2 border-[#00377D] text-[#00377D] font-bold py-3.5 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition flex items-center justify-center gap-2 min-h-[52px]"
            >
              <i className="bi bi-download" aria-hidden="true" />
              Télécharger le reçu
            </button>
            <Link
              href="/"
              className="flex-1 bg-[#00377D] text-white font-bold py-3.5 rounded-2xl hover:bg-[#002A5E] transition flex items-center justify-center gap-2 min-h-[52px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <i className="bi bi-house-fill" aria-hidden="true" />
              Retour à l&apos;accueil
            </Link>
          </div>

          {/* Info SMS */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-start gap-3 text-left">
            <i className="bi bi-info-circle-fill text-blue-500 text-lg flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-blue-700 text-sm leading-relaxed">
              Vos tickets ont également été envoyés par SMS au{" "}
              <strong>+228 {masked}</strong>.
            </p>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

export default function ConfirmationPage() {
  return <ConfirmationContent />;
}
