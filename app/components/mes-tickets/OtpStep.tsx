// components/mes-tickets/OtpStep.tsx - Étape 2 : saisie du code OTP

interface Props {
  phone:    string;
  otp:      string;
  devOtp:   string | null;
  loading:  boolean;
  error:    string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack:   () => void;
}

export default function OtpStep({ phone, otp, devOtp, loading, error, onChange, onSubmit, onBack }: Props) {
  const masked = phone.slice(0, 2) + " XX XX " + phone.slice(-2);

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-[#FFD100] flex items-center justify-center mx-auto mb-4">
          <i className="bi bi-shield-lock-fill text-3xl text-[#00377D]" aria-hidden="true" />
        </div>
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Code de vérification
        </h1>
        <p className="text-gray-500 text-sm">
          Un code a été envoyé au <strong>+228 {masked}</strong>.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Encart dev - jamais affiché en production */}
        {devOtp && process.env.NODE_ENV === "development" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
            <i className="bi bi-bug-fill text-orange-500" aria-hidden="true" />
            <div>
              <div className="text-orange-700 font-bold text-sm">Mode développement</div>
              <div className="text-orange-600 text-sm">
                Code OTP simulé : <strong className="font-black text-lg tracking-widest">{devOtp}</strong>
              </div>
              <div className="text-orange-500 text-xs">Supprimer cet encart en production</div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-[#00377D] font-bold text-sm block mb-2">Code à 4 chiffres</label>
            <input type="text" inputMode="numeric" placeholder="_ _ _ _"
              value={otp} onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              className="w-full text-center font-black text-3xl tracking-[1rem] border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#00377D] transition"
              style={{ fontFamily: "'Montserrat', sans-serif" }} autoFocus />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2" role="alert">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" /> {error}
            </div>
          )}

          <button type="submit" disabled={otp.length !== 4 || loading}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition bg-[#FFD100] text-[#00377D] hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {loading
              ? <><i className="bi bi-arrow-clockwise animate-spin" aria-hidden="true" /> Vérification…</>
              : <><i className="bi bi-check-circle-fill" aria-hidden="true" /> Vérifier le code</>}
          </button>

          <button type="button" onClick={onBack}
            className="text-[#00377D] text-sm underline text-center hover:opacity-70 transition">
            <i className="bi bi-arrow-left" aria-hidden="true" /> Changer de numéro
          </button>
        </form>
      </div>
    </>
  );
}
