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
        <div className="icon-badge h-16 w-16 rounded-2xl mx-auto mb-4">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 0 1 6 0v3H9Z"/>
          </svg>
        </div>
        <h1 className="text-[#00377D] font-black text-2xl sm:text-3xl mb-2">
          Code de vérification
        </h1>
        <p className="text-gray-500 text-sm">
          Un code a été envoyé au <strong>+228 {masked}</strong>.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        {devOtp && process.env.NODE_ENV === "development" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
            <svg className="h-5 w-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/>
            </svg>
            <div>
              <div className="text-orange-700 font-bold text-sm">Mode développement</div>
              <div className="text-orange-600 text-sm">
                Code OTP simulé : <strong className="font-black text-lg tracking-widest">{devOtp}</strong>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-[#00377D] font-bold text-sm block mb-2">Code à 4 chiffres</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="_ _ _ _"
              value={otp}
              onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              className="w-full text-center font-black text-3xl tracking-[1rem] border-2 border-gray-200 rounded-xl py-4 outline-none focus:border-[#00377D] transition"
              autoFocus
            />
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
            disabled={otp.length !== 4 || loading}
            className="w-full py-4 rounded-full font-extrabold uppercase text-base flex items-center justify-center gap-2 transition bg-[#FFD100] text-[#00377D] hover:brightness-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4Z"/>
                </svg>
                Vérification…
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 13 4 4L19 7"/>
                </svg>
                Vérifier le code
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-[#00377D] text-sm underline text-center hover:opacity-70 transition flex items-center justify-center gap-1"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Changer de numéro
          </button>
        </form>
      </div>
    </>
  );
}
