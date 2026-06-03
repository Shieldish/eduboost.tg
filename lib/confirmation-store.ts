/**
 * confirmation-store.ts — Stockage sécurisé des données de confirmation
 *
 * POURQUOI :
 *   Mettre les codes tickets, numéro et montant dans l'URL expose ces données :
 *   - Dans l'historique du navigateur
 *   - Dans les logs Nginx / Gunicorn (gunicorn_access.log)
 *   - Dans les referrer headers si l'utilisateur clique un lien externe
 *
 * SOLUTION :
 *   sessionStorage (pas localStorage) : effacé à la fermeture de l'onglet.
 *   Lecture unique : les données sont supprimées après la première lecture.
 *   Expiration 5 minutes : si l'utilisateur revient après 5 min, redirigé vers /.
 *
 * UTILISATION :
 *   // Dans ticket/page.tsx — après réception des codes
 *   import { saveConfirmation } from '@/lib/confirmation-store'
 *   saveConfirmation({ ref, codes, qty, total, phone })
 *   router.push('/confirmation')  // URL propre, sans données sensibles
 *
 *   // Dans confirmation/page.tsx — au montage
 *   import { readConfirmation } from '@/lib/confirmation-store'
 *   const data = readConfirmation()
 *   if (!data) router.push('/')  // Expiré ou accès direct
 */

const STORAGE_KEY = 'gte_confirmation'
const TTL_MS      = 5 * 60 * 1000  // 5 minutes

export interface ConfirmationData {
  ref:   string
  codes: string[]
  qty:   number
  total: number
  phone: string
}

interface StoredConfirmation extends ConfirmationData {
  expiresAt: number
}

/** Sauvegarde les données de confirmation en sessionStorage avec TTL. */
export function saveConfirmation(data: ConfirmationData): void {
  if (typeof window === 'undefined') return
  const payload: StoredConfirmation = {
    ...data,
    expiresAt: Date.now() + TTL_MS,
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // sessionStorage plein ou désactivé (mode privé strict) → silencieux
  }
}

/**
 * Lit et supprime les données de confirmation.
 * Retourne null si absentes, expirées ou corrompues.
 * LECTURE UNIQUE — les données sont effacées immédiatement après lecture.
 */
export function readConfirmation(): ConfirmationData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    // Supprimer AVANT de parser — empêche la lecture multiple
    sessionStorage.removeItem(STORAGE_KEY)

    const stored: StoredConfirmation = JSON.parse(raw)

    // Vérification expiration
    if (Date.now() > stored.expiresAt) return null

    // Validation minimale des données
    if (!stored.ref || !Array.isArray(stored.codes)) return null

    const { expiresAt: _exp, ...data } = stored
    return data
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
    return null
  }
}
