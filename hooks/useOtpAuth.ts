// hooks/useOtpAuth.ts - Logique d'authentification OTP pour /mes-tickets
//
// Encapsule :
//   - POST /auth/otp/request (génère et envoie l'OTP)
//   - POST /auth/otp/verify (vérifie + retourne les commandes)
//   - État de la machine à états : PHONE → OTP → TICKETS
//   - Gestion dev_otp en mode développement

import { useState } from "react";
import type { OtpStep, Order } from "../types";
import { API_URL } from "../config";
import { isValidTogoPhone } from "../config";

interface OtpAuthState {
  step:    OtpStep;
  phone:   string;
  otp:     string;
  loading: boolean;
  error:   string;
  devOtp:  string | null;
  orders:  Order[];
}

interface OtpAuthActions {
  setPhone:      (v: string) => void;
  setOtp:        (v: string) => void;
  requestOtp:    (e: React.FormEvent) => Promise<void>;
  verifyOtp:     (e: React.FormEvent) => Promise<void>;
  reset:         () => void;
}

export function useOtpAuth(): OtpAuthState & OtpAuthActions {
  const [step,    setStep]    = useState<OtpStep>("PHONE");
  const [phone,   setPhone]   = useState("");
  const [otp,     setOtp]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [devOtp,  setDevOtp]  = useState<string | null>(null);
  const [orders,  setOrders]  = useState<Order[]>([]);

  // Étape 1 - Demander l'OTP
  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidTogoPhone(phone)) {
      setError("Numéro invalide. Doit commencer par 70-72, 90-93 ou 96-99.");
      return;
    }
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/otp/request`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Erreur serveur. Veuillez réessayer.");
      }
      const data = await res.json();
      // dev_otp uniquement si DEBUG=True côté backend (jamais en prod)
      if (data.dev_otp) {
        setDevOtp(data.dev_otp);
      }
      setStep("OTP");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally { setLoading(false); }
  }

  // Étape 2 - Vérifier l'OTP et récupérer les tickets
  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 4) return;
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/otp/verify`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone, otp }),
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
    } finally { setLoading(false); }
  }

  // Reset complet - retour à l'étape PHONE
  function reset() {
    setStep("PHONE"); setPhone(""); setOtp(""); setOrders([]); setDevOtp(null); setError("");
  }

  return { step, phone, otp, loading, error, devOtp, orders, setPhone, setOtp, requestOtp, verifyOtp, reset };
}
