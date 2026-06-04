import Image from "next/image";

interface Props {
  phone:    string;
  loading:  boolean;
  error:    string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PhoneStep({ phone, loading, error, onChange, onSubmit }: Props) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="icon-badge h-16 w-16 rounded-2xl mx-auto mb-4">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
          </svg>
        </div>
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2">
          Mes tickets EduBoost
        </h1>
        <p className="text-gray-500 text-sm">
          Saisissez votre numéro pour recevoir un code de vérification par SMS.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
                onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 8))}
                maxLength={8}
                className="flex-1 px-3 py-3 text-base outline-none min-w-0"
                autoComplete="tel"
                aria-required="true"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2" role="alert">
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={phone.length < 8 || loading}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition bg-[#00377D] text-[#FFD100] hover:bg-[#002A5E] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z"/>
                </svg>
                Envoi du code…
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v12h10V5H7Zm5 13.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/>
                </svg>
                Recevoir mon code SMS
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs text-center">
            Un code à 4 chiffres sera envoyé par SMS au +228 {phone || "XXXXXXXX"}.
          </p>
        </form>
      </div>
    </>
  );
}
