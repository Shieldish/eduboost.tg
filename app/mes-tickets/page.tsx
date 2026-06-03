/**
 * mes-tickets/page.tsx — Consultation des tickets achetés via OTP SMS
 *
 * Flux :
 *   Étape 1 — PHONE : saisie du numéro +228
 *             → POST /auth/otp/request { phone }
 *             → Mode dev : OTP simulé (affiché dans la réponse)
 *             → Mode prod : OTP réel envoyé par SMS via SMSVAS
 *
 *   Étape 2 — OTP : saisie du code à 4 chiffres reçu par SMS
 *             → POST /auth/otp/verify { phone, otp }
 *             → Retourne la liste des tickets achetés pour ce numéro
 *
 *   Étape 3 — TICKETS : affichage des tickets groupés par commande
 *
 * Sécurité :
 *   - OTP expire après 5 minutes (TTL Redis côté backend)
 *   - Max 3 tentatives par numéro avant blocage temporaire
 *   - TODO prod : activer le vrai envoi SMS dans settings.py
 *
 * TODO prod :
 *   - Implémenter les endpoints /auth/otp/request et /auth/otp/verify côté Django
 *   - Stocker l'OTP dans Redis avec TTL 5min
 *   - Limiter à 3 tentatives par numéro (rate limiting Redis)
 *   - Ajouter un token JWT retourné par /auth/otp/verify pour sécuriser la session
 *   - Afficher le QR code de chaque ticket pour vérification au tirage
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Ticket {
  ticket_code: string;
  created_at:  string;
}

interface Order {
  ref:       string;
  qty:       number;
  amount:    number;
  channel:   string;
  status:    string;
  date:      string;
  tickets:   Ticket[];
}

// Étapes de la page
type Step = "PHONE" | "OTP" | "TICKETS";

// ── Composant principal ───────────────────────────────────────────────────────

export default function MesTicketsPage() {
  const [step,       setStep]       = useState<Step>("PHONE");
  const [phone,      setPhone]      = useState("");
  const [otp,        setOtp]        = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [devOtp,     setDevOtp]     = useState<string | null>(null); // OTP affiché en mode dev
  const [orders,     setOrders]     = useState<Order[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  // ── Étape 1 : Demande d'OTP ──────────────────────────────────────────────
  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    const TOGO_RE = /^(70|71|72|90|91|92|93|96|97|98|99)/;
    if (phone.length < 8 || !TOGO_RE.test(phone)) {
      setError("Numéro invalide. Doit commencer par 70-72, 90-93 ou 96-99.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Appel réel au backend : POST /auth/otp/request
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Erreur serveur. Veuillez réessayer.");
      }

      const data = await res.json();

          // En dev (DEBUG=True + SMSVAS non configuré) : le backend retourne dev_otp
      // En prod : dev_otp est ABSENT de la réponse → SMS arrive sur le téléphone
      // Le flag process.env.NODE_ENV === 'development' évite l'affichage en prod
      if (data.dev_otp && process.env.NODE_ENV === "development") {
        setDevOtp(data.dev_otp);
      }

      setStep("OTP");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  }

  // ── Étape 2 : Vérification OTP + récupération tickets ───────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 4) return;
    setError("");
    setLoading(true);

    try {
      /*
       * TODO prod : décommenter quand l'endpoint /auth/otp/verify existe côté Django
       *
       * const res = await fetch(`${apiUrl}/auth/otp/verify`, {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify({ phone, otp }),
       * });
       * if (!res.ok) {
       *   const data = await res.json().catch(() => ({}));
       *   throw new Error(data?.error ?? "Code OTP incorrect ou expiré.");
       * }
       * const data = await res.json();
       * setOrders(data.orders ?? []);
       */

      // Appel réel au backend : POST /auth/otp/verify
      // Le backend vérifie l'OTP dans Redis et retourne les tickets si correct
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Code incorrect ou expiré.");
      }

      const data = await res.json();
      setOrders(data.orders ?? []);

      setStep("TICKETS");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Code invalide");
    } finally {
      setLoading(false);
    }
  }

  // ── Rendu ────────────────────────────────────────────────────────────────
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#F8F9FB]">
      <PageHeader secure={false} />

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-14 max-w-xl mx-auto w-full">

        {/* ── Étape 1 : Saisie du numéro ──────────────────────── */}
        {step === "PHONE" && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-ticket-perforated-fill text-3xl text-[#00377D]" />
              </div>
              <h1
                className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Mes tickets EduBoost
              </h1>
              <p className="text-gray-500 text-sm">
                Saisissez votre numéro de téléphone pour recevoir un code de vérification par SMS.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
                <div>
                  <label className="text-[#00377D] font-bold text-sm block mb-2">
                    Votre numéro de téléphone
                  </label>
                  <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#00377D] transition min-h-[52px]">
                    <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                      <Image src="/flag-tg.png" alt="Togo" width={24} height={16} className="object-contain rounded-sm" />
                      <span className="text-[#00377D] font-semibold text-sm">+228</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="90 XX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      maxLength={8}
                      className="flex-1 px-3 py-3 text-base outline-none min-w-0"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2" role="alert">
                    <i className="bi bi-exclamation-triangle-fill" /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={phone.length < 8 || loading}
                  className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition bg-[#00377D] text-[#FFD100] hover:bg-[#002A5E] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {loading ? (
                    <><i className="bi bi-arrow-clockwise" style={{ animation: "spin 0.8s linear infinite" }} /> Envoi du code…</>
                  ) : (
                    <><i className="bi bi-phone-fill" /> Recevoir mon code SMS</>
                  )}
                </button>

                {/* Note : en mode dev, l'OTP est simulé (pas de vrai SMS) */}
                <p className="text-gray-400 text-xs text-center">
                  <i className="bi bi-info-circle" /> Un code à 4 chiffres sera envoyé par SMS au +228 {phone || "XXXXXXXX"}.
                  <br />
                  {/* À supprimer en prod */}
                  <span className="text-orange-500">[Mode dev] : l&apos;OTP est simulé, aucun SMS réel n&apos;est envoyé.</span>
                </p>
              </form>
            </div>
          </>
        )}

        {/* ── Étape 2 : Saisie de l'OTP ───────────────────────── */}
        {step === "OTP" && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-shield-lock-fill text-3xl text-[#00377D]" />
              </div>
              <h1
                className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Code de vérification
              </h1>
              <p className="text-gray-500 text-sm">
                Un code a été envoyé au <strong>+228 {phone.slice(0,2)} XX XX {phone.slice(-2)}</strong>.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Affichage de l'OTP simulé en mode dev */}
              {devOtp && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                  <i className="bi bi-bug-fill text-orange-500" />
                  <div>
                    <div className="text-orange-700 font-bold text-sm">Mode développement</div>
                    <div className="text-orange-600 text-sm">
                      Code OTP simulé : <strong className="font-black text-lg tracking-widest">{devOtp}</strong>
                    </div>
                    <div className="text-orange-500 text-xs">
                      En prod, ce code arrivera par SMS — supprimer cet encart
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                <div>
                  <label className="text-[#00377D] font-bold text-sm block mb-2">
                    Code à 4 chiffres
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="_ _ _ _"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    maxLength={4}
                    className="w-full text-center font-black text-3xl tracking-[1rem] border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#00377D] transition"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2" role="alert">
                    <i className="bi bi-exclamation-triangle-fill" /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={otp.length !== 4 || loading}
                  className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition bg-[#FFD100] text-[#00377D] hover:bg-yellow-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {loading ? (
                    <><i className="bi bi-arrow-clockwise" style={{ animation: "spin 0.8s linear infinite" }} /> Vérification…</>
                  ) : (
                    <><i className="bi bi-check-circle-fill" /> Vérifier le code</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("PHONE"); setOtp(""); setError(""); setDevOtp(null); }}
                  className="text-[#00377D] text-sm underline text-center hover:opacity-70 transition"
                >
                  <i className="bi bi-arrow-left" /> Changer de numéro
                </button>
              </form>
            </div>
          </>
        )}

        {/* ── Étape 3 : Affichage des tickets ─────────────────── */}
        {step === "TICKETS" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-[#00377D] font-black text-xl sm:text-2xl"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Mes tickets
                </h1>
                <p className="text-gray-500 text-xs mt-0.5">
                  +228 {phone.slice(0,2)} XX XX {phone.slice(-2)} — {orders.reduce((s, o) => s + o.qty, 0)} ticket(s) au total
                </p>
              </div>
              <button
                onClick={() => { setStep("PHONE"); setOtp(""); setOrders([]); setDevOtp(null); }}
                className="text-[#00377D] text-xs underline hover:opacity-70 transition flex items-center gap-1"
              >
                <i className="bi bi-box-arrow-right" /> Déconnexion
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-8 text-center">
                <i className="bi bi-ticket-perforated text-4xl text-gray-300 block mb-3" />
                <p className="text-gray-500 text-sm">Aucun ticket trouvé pour ce numéro.</p>
                <Link href="/ticket" className="mt-4 inline-flex items-center gap-2 bg-[#FFD100] text-[#00377D] font-bold px-6 py-3 rounded-xl text-sm">
                  <i className="bi bi-plus-circle-fill" /> Acheter des tickets
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {orders.map((order) => (
                  <div key={order.ref} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* En-tête commande */}
                    <div className="bg-[#00377D] px-5 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {order.ref}
                        </div>
                        <div className="text-white/60 text-xs">
                          {order.date} · {order.channel.toUpperCase()} · {order.amount.toLocaleString("fr-FR")} FCFA
                        </div>
                      </div>
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <i className="bi bi-check-circle-fill" /> Livré
                      </span>
                    </div>

                    {/* Codes tickets */}
                    <div className="p-5">
                      <div className="text-[#00377D] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1">
                        <i className="bi bi-ticket-perforated-fill text-[#FFD100]" />
                        {order.qty} code{order.qty > 1 ? "s" : ""} ticket
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {order.tickets.map((t, i) => (
                          <div
                            key={t.ticket_code}
                            className="bg-[#00377D] text-[#FFD100] font-black text-center py-2.5 px-3 rounded-xl text-sm tracking-widest"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            <div className="text-white/40 text-xs font-normal mb-0.5">#{i + 1}</div>
                            {t.ticket_code}
                          </div>
                        ))}
                      </div>
                      {/* TODO prod : ajouter un QR code cliquable par ticket */}
                    </div>
                  </div>
                ))}

                {/* CTA acheter plus */}
                <div className="text-center">
                  <Link
                    href="/ticket"
                    className="inline-flex items-center gap-2 bg-[#FFD100] text-[#00377D] font-bold px-7 py-3.5 rounded-2xl text-sm hover:bg-yellow-300 transition shadow-md"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <i className="bi bi-plus-circle-fill" /> Acheter d&apos;autres tickets
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <PageFooter />
    </div>
  );
}
