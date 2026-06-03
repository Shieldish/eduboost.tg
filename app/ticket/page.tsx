"use client";

import Link from "next/link";
import { useState, useId } from "react";
import PageHeader             from "../components/PageHeader";
import PageFooter             from "../components/PageFooter";
import PaymentMethodSelector  from "../components/ticket/PaymentMethodSelector";
import PhoneInput             from "../components/ticket/PhoneInput";
import QuantityInput          from "../components/ticket/QuantityInput";
import { useTicketPurchase }  from "@/hooks/useTicketPurchase";
import { isValidTogoPhone }   from "@/config";
import type { PaymentMethod } from "@/types";

export default function TicketPage() {
  const phoneId = useId();
  const qtyId   = useId();

  const [method,   setMethod]   = useState<PaymentMethod>(null);
  const [phone,    setPhone]    = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [qty,      setQty]      = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const total      = qty * 250;
  const phoneValid = isValidTogoPhone(phone);
  const canSubmit  = method !== null && phoneValid && accepted;

  const { loading, error, loadingMsg, submit } = useTicketPurchase();

  function handlePhoneChange(digits: string) {
    setPhone(digits);
    if (digits.length === 8 && !isValidTogoPhone(digits)) {
      setPhoneErr("Numéro invalide. Commencer par 70, 71, 72, 90–93 ou 96–99.");
    } else {
      setPhoneErr("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await submit({ phone, qty, total, method, honeypot });
  }

  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#F8F9FB]">
      <PageHeader />

      <main id="main-content" className="flex-1 px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto w-full">
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl text-center mb-1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Acheter vos tickets EduBoost
        </h1>
        <p className="text-gray-500 text-sm text-center mb-7 leading-relaxed">
          Participez à la Grande Tombola Solidaire GTE 🎓<br />
          et contribuez à financer l&apos;éducation au Togo.
        </p>

        <div className="bg-[#00377D] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 text-center">
          <div>
            <div className="text-[#FFD100] text-xl mb-1" aria-hidden="true"><i className="bi bi-trophy-fill" /></div>
            <div className="text-white font-bold text-xs">De nombreux prix à gagner !</div>
          </div>
          {[["5 000 000", "Bons scolaires"], ["5 000 000", "Frais scolarité"], ["10 000 000", "Total à gagner"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{n}<br />FCFA</div>
              <div className="text-white/60 text-xs">{l}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 flex flex-col gap-6">
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
            <label htmlFor="website-field">Ne pas remplir</label>
            <input id="website-field" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
          </div>

          <PaymentMethodSelector value={method} onChange={setMethod} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhoneInput id={phoneId} value={phone} error={phoneErr} onChange={handlePhoneChange} />
            <QuantityInput id={qtyId} value={qty} onChange={setQty} />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm border border-gray-100">
            <div className="flex justify-between text-gray-500"><span>Prix unitaire</span><span>250 FCFA</span></div>
            <div className="flex justify-between text-gray-500"><span>Nombre de tickets</span><span>{qty}</span></div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
              <span className="text-[#00377D] font-bold">TOTAL À PAYER</span>
              <span className="text-[#00377D] font-black text-xl sm:text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {total.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1 w-5 h-5 accent-[#00377D] flex-shrink-0" aria-required="true" />
            <span className="text-sm text-gray-600 leading-relaxed">
              J&apos;accepte le règlement officiel de la tombola GTE.{" "}
              <Link href="#" className="text-[#00377D] underline">Consulter le règlement</Link>
            </span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2" role="alert" aria-live="assertive">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 mt-0.5" aria-hidden="true" />{error}
            </div>
          )}

          <button type="submit" disabled={!canSubmit || loading} aria-busy={loading}
            className={`w-full py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition ${
              canSubmit && !loading ? "bg-[#FFD100] text-[#00377D] hover:bg-yellow-400 active:scale-[0.98] cursor-pointer shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {loading ? (
              <><span role="status" className="sr-only">{loadingMsg || "Traitement en cours"}</span>
                <i className="bi bi-arrow-clockwise animate-spin" aria-hidden="true" />
                <span aria-hidden="true">{loadingMsg || "Traitement en cours…"}</span></>
            ) : (
              <><i className="bi bi-shield-lock-fill" aria-hidden="true" />  PAYER MAINTENANT</>
            )}
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "bi-shield-check-fill",     label: "Paiement sécurisé" },
              { icon: "bi-lightning-charge-fill", label: "Transaction rapide" },
              { icon: "bi-chat-left-text-fill",   label: "Ticket par SMS" },
              { icon: "bi-envelope-check-fill",   label: "Confirmation email" },
            ].map(({ icon, label }) => (
              <div key={label} className="text-center text-gray-400 text-xs">
                <i className={`bi ${icon} text-lg text-[#00377D]/50 block mb-1`} aria-hidden="true" />{label}
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-400">
            Déjà acheté ?{" "}
            <Link href="/mes-tickets" className="text-[#00377D] underline font-semibold">Consulter mes tickets</Link>
          </div>
        </form>
      </main>
      <PageFooter />
    </div>
  );
}
