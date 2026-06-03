/**
 * ticket/page.tsx — Page d'achat de tickets EduBoost
 *
 * Méthodes de paiement : MIXX (Mobile money YAS) | CREDIT_YAS (Airtime)
 *
 * Flux :
 *   1. Choix méthode paiement + numéro validé + quantité + règlement accepté
 *   2. POST /buy → 202 Accepted
 *   3. Polling /status toutes les 1.5s jusqu'à DELIVERED (max 90s)
 *   4. Données sauvegardées en sessionStorage → redirect /confirmation (URL propre)
 *
 * Sécurité :
 *   - AbortController : le polling est annulé si l'utilisateur quitte la page
 *   - Timeout absolu 90s : évite un polling infini sur réseau lent
 *   - Validation numéro Togo côté client (préfixes 70-72, 90-93, 96-99)
 *   - Honeypot anti-bot : champ invisible — si rempli → soumission bloquée
 *   - sessionStorage : codes/numéro jamais dans l'URL (logs serveur)
 *   - Protection double soumission : ref interne submitting
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useId, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { saveConfirmation } from "@/lib/confirmation-store";

type PaymentMethod = "MIXX" | "CREDIT_YAS" | null;

// Préfixes de numéros togolais valides
// Togocom : 70-72, 90-93 | Moov : 96-99
const TOGO_PREFIX_RE = /^(70|71|72|90|91|92|93|96|97|98|99)/;

function isValidTogoPhone(phone: string): boolean {
  return phone.length === 8 && TOGO_PREFIX_RE.test(phone);
}

const PAYMENT_METHODS = [
  {
    id: "MIXX" as PaymentMethod,
    logo: <Image src="/mixx-logo.jpg" alt="MIXX by YAS — Mobile money" width={64} height={32} className="object-contain rounded-lg h-8 w-auto" />,
    sub: "Mobile money",
  },
  {
    id: "CREDIT_YAS" as PaymentMethod,
    logo: <Image src="/airtime-logo.png" alt="Crédit YAS — Airtime" width={52} height={32} className="object-contain h-8 w-auto" />,
    sub: "Airtime / Crédit",
  },
];

function generateRequestId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const POLL_INTERVAL_MS  = 1500;
const POLL_TIMEOUT_MS   = 90_000;  // Timeout absolu 90s
const POLL_MAX_ATTEMPTS = 60;

export default function TicketPage() {
  const router  = useRouter();
  const phoneId = useId();
  const qtyId   = useId();

  const [method,    setMethod]    = useState<PaymentMethod>(null);
  const [phone,     setPhone]     = useState("");
  const [phoneErr,  setPhoneErr]  = useState("");
  const [qty,       setQty]       = useState(1);
  const [accepted,  setAccepted]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [honeypot,  setHoneypot]  = useState("");  // doit rester vide

  const abortRef    = useRef<AbortController | null>(null);
  const submitting  = useRef(false);

  const total     = qty * 250;
  const phoneValid = isValidTogoPhone(phone);
  const canSubmit  = method !== null && phoneValid && accepted && !loading;

  // Annuler le polling si l'utilisateur navigue ailleurs
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  function handlePhoneChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    setPhone(digits);
    if (digits.length === 8 && !isValidTogoPhone(digits)) {
      setPhoneErr("Numéro invalide. Commencer par 70, 71, 72, 90–93 ou 96–99.");
    } else {
      setPhoneErr("");
    }
  }

  async function pollStatus(
    requestId: string,
    apiUrl: string,
    signal: AbortSignal
  ): Promise<{ codes: string[]; ref: string }> {
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
      if (signal.aborted) throw new Error("Navigation interrompue.");
      if (Date.now() > deadline) {
        throw new Error("Délai dépassé — vos tickets arrivent par SMS.");
      }

      // Attendre avec possibilité d'annulation
      await new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, POLL_INTERVAL_MS);
        signal.addEventListener("abort", () => { clearTimeout(t); reject(new Error("aborted")); }, { once: true });
      });

      if (signal.aborted) throw new Error("Navigation interrompue.");

      try {
        const res = await fetch(`${apiUrl}/status?request_id=${requestId}`, { signal });

        if (res.status >= 500) throw new Error("Erreur serveur. Vos tickets arriveront par SMS.");
        if (!res.ok) continue;

        const data = await res.json();
        if (data.status === "DELIVERED") {
          return {
            codes: data.codes ?? [],
            ref:   data.reference ?? `EDB-${requestId.slice(0, 8).toUpperCase()}`,
          };
        }
        if (data.status === "FAILED") {
          throw new Error("Paiement refusé. Solde insuffisant ou méthode invalide.");
        }
      } catch (e) {
        if (signal.aborted || (e instanceof Error && e.message === "aborted")) throw e;
        // Erreur réseau temporaire → continuer à poller
      }
    }
    throw new Error("Délai dépassé — vos tickets arrivent par SMS.");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting.current) return;

    // Vérification honeypot : si rempli → bot détecté
    if (honeypot) return;

    submitting.current = true;
    setError("");
    setLoading(true);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;
    const requestId  = generateRequestId();
    const apiUrl     = process.env.NEXT_PUBLIC_API_URL ?? "";

    try {
      setLoadingMsg("Initiation du paiement…");
      const res = await fetch(`${apiUrl}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: requestId, phone, qty, payment_method: method }),
        signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Erreur serveur (${res.status})`);
      }

      setLoadingMsg("Génération de vos tickets en cours…");
      const { codes, ref } = await pollStatus(requestId, apiUrl, signal);

      // Stocker en sessionStorage — URL propre sans données sensibles
      saveConfirmation({ ref, codes, qty, total, phone });
      router.push("/confirmation");

    } catch (err: unknown) {
      if (err instanceof Error && (err.message === "aborted" || err.message === "Navigation interrompue.")) return;
      setError(err instanceof Error ? err.message : "Erreur inattendue");
      setLoading(false);
      setLoadingMsg("");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#F8F9FB]">
      <PageHeader />

      <main id="main-content" className="flex-1 px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto w-full">
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl text-center mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Acheter vos tickets EduBoost
        </h1>
        <p className="text-gray-500 text-sm text-center mb-7 leading-relaxed">
          Participez à la Grande Tombola Solidaire EduBoost 🎓<br />
          et contribuez à financer l&apos;éducation au Togo.
        </p>

        {/* Récapitulatif des prix */}
        <div className="bg-[#00377D] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 text-center">
          <div>
            <div className="text-[#FFD100] text-xl mb-1" aria-hidden="true"><i className="bi bi-trophy-fill" /></div>
            <div className="text-white font-bold text-xs">De nombreux prix à gagner !</div>
          </div>
          <div>
            <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>5 000 000<br />FCFA</div>
            <div className="text-white/60 text-xs">Bons d&apos;achat scolaires</div>
          </div>
          <div>
            <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>5 000 000<br />FCFA</div>
            <div className="text-white/60 text-xs">Frais de scolarité</div>
          </div>
          <div>
            <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>10 000 000<br />FCFA</div>
            <div className="text-white/60 text-xs">Total à gagner</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 flex flex-col gap-6">

          {/* Honeypot anti-bot — invisible, ne doit jamais être rempli */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
            <label htmlFor="website-field">Ne pas remplir</label>
            <input
              id="website-field"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
            />
          </div>

          {/* ÉTAPE 1 — Moyen de paiement */}
          <fieldset>
            <legend className="text-[#00377D] font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">1</span>
              Choisissez votre moyen de paiement
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Méthode de paiement">
              {PAYMENT_METHODS.map(({ id, logo, sub }) => (
                <button
                  key={id as string}
                  type="button"
                  role="radio"
                  aria-checked={method === id}
                  onClick={() => setMethod(id)}
                  className={`border-2 rounded-2xl p-4 flex items-center gap-3 transition cursor-pointer min-h-[72px] ${
                    method === id ? "border-[#00377D] bg-blue-50" : "border-gray-200 hover:border-gray-300 active:bg-gray-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                    method === id ? "border-[#00377D] bg-[#00377D]" : "border-gray-300"
                  }`} aria-hidden="true">
                    {method === id && <i className="bi bi-check text-white text-xs font-bold" aria-hidden="true" />}
                  </div>
                  <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                    {logo}
                    <div className="text-gray-400 text-xs">{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </fieldset>

          {/* ÉTAPE 2 & 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={phoneId} className="text-[#00377D] font-bold text-sm flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">2</span>
                Numéro de téléphone
              </label>
              <div className={`flex border-2 rounded-xl overflow-hidden min-h-[50px] transition ${
                phoneErr ? "border-red-400 focus-within:border-red-500" : "border-gray-200 focus-within:border-[#00377D]"
              }`}>
                <div className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                  <Image src="/flag-tg.png" alt="Togo" width={24} height={16} className="object-contain rounded-sm" />
                  <span className="text-[#00377D] font-semibold text-sm">+228</span>
                </div>
                <input
                  id={phoneId}
                  type="tel"
                  inputMode="numeric"
                  placeholder="90 XX XX XX"
                  value={phone}
                  onChange={e => handlePhoneChange(e.target.value)}
                  maxLength={8}
                  className="flex-1 px-3 py-3 text-base outline-none min-w-0"
                  autoComplete="tel"
                  aria-required="true"
                  aria-invalid={!!phoneErr}
                  aria-describedby={phoneErr ? `${phoneId}-error` : undefined}
                />
              </div>
              {phoneErr && (
                <p id={`${phoneId}-error`} className="text-red-600 text-xs mt-1" role="alert">
                  <i className="bi bi-exclamation-circle mr-1" aria-hidden="true" />{phoneErr}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={qtyId} className="text-[#00377D] font-bold text-sm flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">3</span>
                Nombre de tickets
              </label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden min-h-[50px]">
                <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-14 flex items-center justify-center text-[#00377D] font-black text-xl hover:bg-gray-100 active:bg-gray-200 transition self-stretch"
                  aria-label="Réduire la quantité">
                  <i className="bi bi-dash" aria-hidden="true" />
                </button>
                <input
                  id={qtyId} type="number" inputMode="numeric" min={1} max={100} value={qty}
                  onChange={e => setQty(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  className="flex-1 text-center font-black text-xl outline-none py-3 min-w-0"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  aria-label="Nombre de tickets"
                />
                <button type="button" onClick={() => setQty(q => Math.min(100, q + 1))}
                  className="w-14 flex items-center justify-center text-[#00377D] font-black text-xl hover:bg-gray-100 active:bg-gray-200 transition self-stretch"
                  aria-label="Augmenter la quantité">
                  <i className="bi bi-plus" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Récapitulatif prix */}
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

          {/* Règlement */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#00377D] flex-shrink-0"
              aria-required="true" />
            <span className="text-sm text-gray-600 leading-relaxed">
              J&apos;accepte le règlement officiel de la tombola EduBoost.{" "}
              <Link href="#" className="text-[#00377D] underline">Consulter le règlement</Link>
            </span>
          </label>

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2" role="alert" aria-live="assertive">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 mt-0.5" aria-hidden="true" />
              {error}
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={!canSubmit}
            aria-busy={loading}
            aria-describedby={loading ? "loading-status" : undefined}
            className={`w-full py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition ${
              canSubmit
                ? "bg-[#FFD100] text-[#00377D] hover:bg-yellow-400 active:scale-[0.98] cursor-pointer shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {loading ? (
              <>
                <span id="loading-status" role="status" className="sr-only">{loadingMsg || "Traitement en cours"}</span>
                <i className="bi bi-arrow-clockwise animate-spin" aria-hidden="true" />
                <span aria-hidden="true">{loadingMsg || "Traitement en cours…"}</span>
              </>
            ) : (
              <>
                <i className="bi bi-shield-lock-fill" aria-hidden="true" />
                🔒 PAYER MAINTENANT
              </>
            )}
          </button>

          {/* Garanties */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "bi-shield-check-fill",     label: "Paiement sécurisé" },
              { icon: "bi-lightning-charge-fill", label: "Transaction rapide" },
              { icon: "bi-chat-left-text-fill",   label: "Ticket par SMS" },
              { icon: "bi-envelope-check-fill",   label: "Confirmation email" },
            ].map(({ icon, label }) => (
              <div key={label} className="text-center text-gray-400 text-xs">
                <i className={`bi ${icon} text-lg text-[#00377D]/50 block mb-1`} aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-400">
            Déjà acheté ?{" "}
            <Link href="/mes-tickets" className="text-[#00377D] underline font-semibold">
              Consulter mes tickets
            </Link>
          </div>
        </form>
      </main>

      <PageFooter />
    </div>
  );
}
