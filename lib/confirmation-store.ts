/**
 * confirmation-store.ts — Stockage sécurisé des données de confirmation
 *
 * Utilise localStorage (survit à la navigation entre pages) avec TTL 5 min.
 * Lecture unique : les données sont supprimées après lecture.
 *
 * Fix StrictMode : React 18 monte les composants deux fois en dev.
 * On utilise un flag de session pour ne pas supprimer les données
 * lors du premier mount si elles viennent d'être écrites.
 */

const STORAGE_KEY = 'gte_confirmation';
const TTL_MS      = 5 * 60 * 1000; // 5 minutes

export interface ConfirmationData {
  ref:   string;
  codes: string[];
  qty:   number;
  total: number;
  phone: string;
}

interface StoredConfirmation extends ConfirmationData {
  expiresAt: number;
}

/** Sauvegarde les données de confirmation. */
export function saveConfirmation(data: ConfirmationData): void {
  if (typeof window === 'undefined') return;
  const payload: StoredConfirmation = {
    ...data,
    expiresAt: Date.now() + TTL_MS,
  };
  try {
    // localStorage survit à la navigation entre pages (contrairement à sessionStorage)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Fallback silencieux si localStorage indisponible (mode privé strict)
  }
}

/**
 * Lit les données de confirmation SANS les supprimer.
 * À appeler pour afficher les données.
 * Retourne null si absentes ou expirées.
 */
export function readConfirmation(): ConfirmationData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored: StoredConfirmation = JSON.parse(raw);

    if (Date.now() > stored.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (!stored.ref || !Array.isArray(stored.codes)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { expiresAt, ...data } = stored;
    return data;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

/**
 * Supprime les données de confirmation (après affichage ou fermeture).
 * À appeler explicitement, pas automatiquement à la lecture.
 */
export function clearConfirmation(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
}
