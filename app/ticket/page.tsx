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
    <div className="page-wrapper min-h-screen flex flex-col bg-gray-50">
      <PageHeader />

      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-4 py-8 w-full">
        <h1 className="text-center text-4xl font-black text-[#00377D]">
          Acheter vos tickets EduBoost
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm font-bold text-[#00377D]">
          Participez à la Grande Tombola Solidaire EduBoost et contribuez à financer l&apos;éducation au Togo.
        </p>

        {/* PRIZE SUMMARY BAND */}
        <section className="mt-6 grid grid-cols-2 items-center gap-4 rounded-2xl bg-[#0B1F5B] p-5 text-white sm:grid-cols-4">
          <div className="flex items-center gap-2">
            <svg className="h-9 w-9 text-[#FFD100] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2H6v2H3v3a4 4 0 0 0 4 4c.5 1 1.8 1.8 3 2v3H7v2h10v-2h-3v-3c1.2-.2 2.5-1 3-2a4 4 0 0 0 4-4V4h-3V2Zm0 4h1v1a2 2 0 0 1-1 1.7V6ZM5 7V6h1v2.7A2 2 0 0 1 5 7Z"/>
            </svg>
            <p className="text-xs font-extrabold uppercase leading-tight">De nombreux prix<br/>à gagner !</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-badge h-10 w-10 flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 21 5.5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.52 16.37 6.48 18 8 18h12v-2H8.42c-.14 0-.25-.11-.25-.25l.03-.12.96-1.63Z"/>
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase leading-tight text-white/80">Bons d&apos;achat scolaires</p>
              <p className="text-base font-black text-[#FFD100]">5 000 000 <span className="text-[10px]">FCFA</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="icon-badge h-10 w-10 flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3ZM5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.18-7-3.18Z"/>
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase leading-tight text-white/80">Frais de scolarité</p>
              <p className="text-base font-black text-[#FFD100]">5 000 000 <span className="text-[10px]">FCFA</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:border-l sm:border-white/20 sm:pl-3">
            <svg className="h-8 w-8 text-[#FFD100] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2H6v2H3v3a4 4 0 0 0 4 4c.5 1 1.8 1.8 3 2v3H7v2h10v-2h-3v-3c1.2-.2 2.5-1 3-2a4 4 0 0 0 4-4V4h-3V2Z"/>
            </svg>
            <div>
              <p className="text-[11px] font-bold uppercase leading-tight text-white/80">Total à gagner</p>
              <p className="text-base font-black text-[#FFD100]">10 000 000 <span className="text-[10px]">FCFA</span></p>
            </div>
          </div>
        </section>

        {/* FORM CARD */}
        <section className="mt-6 rounded-2xl border-2 border-[#FFD100] bg-white p-5 shadow-card sm:p-7">

          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
            <label htmlFor="website-field">Ne pas remplir</label>
            <input id="website-field" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <PaymentMethodSelector value={method} onChange={setMethod} />

            <div className="grid gap-6 sm:grid-cols-2">
              <PhoneInput id={phoneId} value={phone} error={phoneErr} onChange={handlePhoneChange} />
              <QuantityInput id={qtyId} value={qty} onChange={setQty} />
            </div>

            {/* Récapitulatif */}
            <div className="rounded-xl bg-[#FFF7DC] p-4">
              <div className="flex justify-between text-sm font-semibold text-[#00377D]">
                <span>Prix unitaire</span><span>250 FCFA</span>
              </div>
              <div className="mt-1 flex justify-between border-b border-dashed border-[#00377D]/30 pb-3 text-sm font-semibold text-[#00377D]">
                <span>Nombre de tickets</span><span>{qty}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-black uppercase text-[#00377D]">Total à payer</span>
                <span className="text-3xl font-black text-[#00377D]">
                  {total.toLocaleString("fr-FR")} <span className="text-base">FCFA</span>
                </span>
              </div>
            </div>

            {/* Règlement */}
            <label className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium text-[#00377D]">
                <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="h-4 w-4 accent-[#00377D]" aria-required="true" />
                J&apos;accepte le règlement officiel de la tombola EduBoost.
              </span>
              <Link href="#" className="font-semibold text-[#5F99D2] underline flex-shrink-0">
                Consulter le règlement
              </Link>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2" role="alert" aria-live="assertive">
                <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/>
                </svg>
                {error}
              </div>
            )}

            {/* Bouton paiement */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              aria-busy={loading}
              className={`w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-base flex items-center justify-center gap-2 transition ${
                canSubmit && !loading
                  ? "bg-[#FFD100] text-[#00377D] hover:brightness-95 active:scale-[0.98] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span role="status" className="sr-only">{loadingMsg || "Traitement en cours"}</span>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z"/>
                  </svg>
                  <span aria-hidden="true">{loadingMsg || "Traitement en cours…"}</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 0 1 6 0v3H9Z"/>
                  </svg>
                  Payer maintenant
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4">
              {[
                { label: "Paiement sécurisé",      path: "M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 13.2-3.2-3.2 1.4-1.4 1.8 1.8 4-4 1.4 1.4-5.4 5.4Z" },
                { label: "Transaction instantanée", path: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z" },
                { label: "Ticket envoyé par SMS",   path: "M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Zm3 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
                { label: "Confirmation par email",  path: null },
              ].map(({ label, path }) => (
                <div key={label} className="flex items-center gap-2">
                  <svg className="h-7 w-7 text-[#00377D] flex-shrink-0" viewBox="0 0 24 24" fill={path ? "currentColor" : "none"} stroke={path ? undefined : "currentColor"} strokeWidth={path ? undefined : "2"} aria-hidden="true">
                    {path
                      ? <path d={path}/>
                      : <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>
                    }
                  </svg>
                  <p className="text-xs font-bold text-[#00377D]">{label}</p>
                </div>
              ))}
            </div>
          </form>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
