// components/mes-tickets/PhoneStep.tsx - Étape 1 : saisie du numéro

import Image from "next/image";

interface Props {
  phone:      string;
  loading:    boolean;
  error:      string;
  onChange:   (v: string) => void;
  onSubmit:   (e: React.FormEvent) => void;
}

export default function PhoneStep({ phone, loading, error, onChange, onSubmit }: Props) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-4">
          <i className="bi bi-ticket-perforated-fill text-3xl text-[#00377D]" aria-hidden="true" />
        </div>
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Mes tickets GTE
        </h1>
        <p className="text-gray-500 text-sm">
          Saisissez votre numéro pour recevoir un code de vérification par SMS.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-[#00377D] font-bold text-sm block mb-2">Votre numéro de téléphone</label>
            <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#00377D] transition min-h-[52px]">
              <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                <Image src="/flag-tg.png" alt="Togo" width={24} height={16} className="object-contain rounded-sm" />
                <span className="text-[#00377D] font-semibold text-sm">+228</span>
              </div>
              <input type="tel" inputMode="numeric" placeholder="90 XX XX XX"
                value={phone} onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 8))}
                maxLength={8} className="flex-1 px-3 py-3 text-base outline-none min-w-0" autoComplete="tel" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2" role="alert">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" /> {error}
            </div>
          )}

          <button type="submit" disabled={phone.length < 8 || loading}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition bg-[#00377D] text-[#FFD100] hover:bg-[#002A5E] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {loading
              ? <><i className="bi bi-arrow-clockwise animate-spin" aria-hidden="true" /> Envoi du code…</>
              : <><i className="bi bi-phone-fill" aria-hidden="true" /> Recevoir mon code SMS</>}
          </button>

          <p className="text-gray-400 text-xs text-center">
            <i className="bi bi-info-circle" aria-hidden="true" /> Un code à 4 chiffres sera envoyé par SMS au +228 {phone || "XXXXXXXX"}.
            {process.env.NODE_ENV === "development" && (
              <><br /><span className="text-orange-500">[Dev] OTP simulé - aucun SMS réel n&apos;est envoyé.</span></>
            )}
          </p>
        </form>
      </div>
    </>
  );
}
