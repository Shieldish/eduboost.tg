// hooks/useTicketPurchase.ts - Logique complète d'achat de ticket
//
// Encapsule :
//   - POST /buy
//   - Polling GET /status (AbortController + timeout absolu)
//   - Sauvegarde sessionStorage → redirect /confirmation
//   - Protection anti-double soumission
//   - Nettoyage AbortController si navigation

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PaymentMethod } from "../types";
import { saveConfirmation } from "../lib/confirmation-store";
import { generateRequestId } from "../lib/requestId";
import { API_URL, POLL_INTERVAL_MS, POLL_TIMEOUT_MS, POLL_MAX_ATTEMPTS } from "../config";

interface PurchaseState {
  loading:    boolean;
  error:      string;
  loadingMsg: string;
}

interface PurchaseActions {
  submit: (params: { phone: string; qty: number; total: number; method: PaymentMethod; honeypot: string }) => Promise<void>;
  clearError: () => void;
}

export function useTicketPurchase(): PurchaseState & PurchaseActions {
  const router      = useRouter();
  const abortRef    = useRef<AbortController | null>(null);
  const submitting  = useRef(false);

  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");

  // Annuler le polling si l'utilisateur navigue ailleurs
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  async function pollStatus(requestId: string, signal: AbortSignal): Promise<{ codes: string[]; ref: string }> {
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
      if (signal.aborted) throw new Error("Navigation interrompue.");
      if (Date.now() > deadline) throw new Error("Délai dépassé - vos tickets arrivent par SMS.");

      await new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, POLL_INTERVAL_MS);
        signal.addEventListener("abort", () => { clearTimeout(t); reject(new Error("aborted")); }, { once: true });
      });

      if (signal.aborted) throw new Error("Navigation interrompue.");

      try {
        const res = await fetch(`${API_URL}/status?request_id=${requestId}`, { signal });
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
    throw new Error("Délai dépassé - vos tickets arrivent par SMS.");
  }

  async function submit({ phone, qty, total, method, honeypot }: {
    phone:    string;
    qty:      number;
    total:    number;
    method:   PaymentMethod;
    honeypot: string;
  }) {
    if (!method || submitting.current || honeypot) return;

    submitting.current = true;
    setError(""); setLoading(true);
    abortRef.current = new AbortController();
    const { signal }  = abortRef.current;
    const requestId   = generateRequestId();

    try {
      setLoadingMsg("Initiation du paiement…");
      const res = await fetch(`${API_URL}/buy`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ request_id: requestId, phone, qty, payment_method: method }),
        signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Erreur serveur (${res.status})`);
      }

      setLoadingMsg("Génération de vos tickets en cours…");
      const { codes, ref } = await pollStatus(requestId, signal);

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

  return { loading, error, loadingMsg, submit, clearError: () => setError("") };
}
