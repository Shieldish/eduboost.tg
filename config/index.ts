// config/index.ts - Configuration globale de l'application GTE Frontend

// URL du backend GTE
// - Dev local   : http://localhost:8080 (défini dans .env.local)
// - Docker/Prod : vide (Nginx route automatiquement)
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// Polling statut après achat
export const POLL_INTERVAL_MS  = 1_500;  // 1.5s entre chaque tentative
export const POLL_TIMEOUT_MS   = 90_000; // timeout absolu 90s
export const POLL_MAX_ATTEMPTS = 60;

// Validation numéro Togo - tous les préfixes valides (Togocom + Moov)
// Format : 8 chiffres, commence par l'un de ces préfixes
export const TOGO_PHONE_REGEX = /^(70|71|72|73|78|79|90|91|92|93|96|97|98|99)/;

export function isValidTogoPhone(phone: string): boolean {
  return phone.length === 8 && TOGO_PHONE_REGEX.test(phone);
}
