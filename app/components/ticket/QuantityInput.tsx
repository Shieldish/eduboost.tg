"use client";

// components/ticket/QuantityInput.tsx - Compteur +/- quantité de tickets

interface Props {
  id:       string;
  value:    number;
  onChange: (value: number) => void;
}

export default function QuantityInput({ id, value, onChange }: Props) {
  return (
    <div>
      <label htmlFor={id} className="text-[#00377D] font-bold text-sm flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-full bg-[#00377D] text-[#FFD100] text-xs font-black flex items-center justify-center" aria-hidden="true">3</span>
        Nombre de tickets
      </label>
      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden min-h-[50px]">
        <button type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-14 flex items-center justify-center text-[#00377D] font-black text-xl hover:bg-gray-100 active:bg-gray-200 transition self-stretch"
          aria-label="Réduire la quantité">
          <span aria-hidden="true" className="text-2xl font-black leading-none">−</span>
        </button>
        <input
          id={id} type="number" inputMode="numeric" min={1} max={100} value={value}
          onChange={e => onChange(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          className="flex-1 text-center font-black text-xl outline-none py-3 min-w-0"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          aria-label="Nombre de tickets"
        />
        <button type="button"
          onClick={() => onChange(Math.min(100, value + 1))}
          className="w-14 flex items-center justify-center text-[#00377D] font-black text-xl hover:bg-gray-100 active:bg-gray-200 transition self-stretch"
          aria-label="Augmenter la quantité">
          <span aria-hidden="true" className="text-2xl font-black leading-none">+</span>
        </button>
      </div>
    </div>
  );
}
