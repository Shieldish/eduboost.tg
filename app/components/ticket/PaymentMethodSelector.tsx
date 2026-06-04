"use client";

// components/ticket/PaymentMethodSelector.tsx - Sélection MIXX / Crédit YAS

import Image from "next/image";
import type { PaymentMethod } from "@/types";

// Logos définis comme composants (pas JSX statique au module scope)
function MixxLogo() {
  return <Image src="/mixx-logo.webp" alt="MIXX by YAS" width={64} height={32} className="object-contain rounded-lg h-8 w-auto" />;
}
function AirtimeLogo() {
  return <Image src="/airtime-logo.webp" alt="Crédit YAS - Airtime" width={52} height={32} className="object-contain h-8 w-auto" />;
}

const METHODS = [
  { id: "MIXX" as PaymentMethod,       Logo: MixxLogo,   sub: "Mobile money"   },
  { id: "CREDIT_YAS" as PaymentMethod, Logo: AirtimeLogo, sub: "Airtime / Crédit" },
];

interface Props {
  value:    PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="text-[#00377D] font-bold text-sm mb-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">1</span>
        Choisissez votre moyen de paiement
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Méthode de paiement">
        {METHODS.map(({ id, Logo, sub }) => (
          <button
            key={id as string}
            type="button"
            role="radio"
            aria-checked={value === id}
            onClick={() => onChange(id)}
            className={`border-2 rounded-2xl p-4 flex items-center gap-3 transition cursor-pointer min-h-[72px] ${
              value === id ? "border-[#00377D] bg-blue-50" : "border-gray-200 hover:border-gray-300 active:bg-gray-50"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                value === id ? "border-[#00377D] bg-[#00377D]" : "border-gray-300"
              }`}
              aria-hidden="true"
            >
              {value === id && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 13 4 4L19 7"/>
                </svg>
              )}
            </div>
            <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1">
              <Logo />
              <div className="text-gray-400 text-xs">{sub}</div>
            </div>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
