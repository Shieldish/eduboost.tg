"use client";

// components/ticket/PhoneInput.tsx - Champ numéro de téléphone togolais

import Image from "next/image";
export { isValidTogoPhone } from "@/config";

interface Props {
  id:       string;
  value:    string;
  error:    string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ id, value, error, onChange }: Props) {
  function handleChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    onChange(digits);
  }

  return (
    <div>
      <label htmlFor={id} className="text-[#00377D] font-bold text-sm flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">2</span>
        Numéro de téléphone
      </label>
      <div className={`flex border-2 rounded-xl overflow-hidden min-h-[50px] transition ${
        error ? "border-red-400 focus-within:border-red-500" : "border-gray-200 focus-within:border-[#00377D]"
      }`}>
        <div className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
          <Image src="/flag-tg.png" alt="Togo" width={24} height={16} className="object-contain rounded-sm" />
          <span className="text-[#00377D] font-semibold text-sm">+228</span>
        </div>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          placeholder="90 XX XX XX"
          value={value}
          onChange={e => handleChange(e.target.value)}
          maxLength={8}
          className="flex-1 px-3 py-3 text-base outline-none min-w-0"
          autoComplete="tel"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1" role="alert">
          <i className="bi bi-exclamation-circle mr-1" aria-hidden="true" />{error}
        </p>
      )}
    </div>
  );
}
