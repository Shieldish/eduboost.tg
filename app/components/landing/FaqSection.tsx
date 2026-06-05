"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "Qu'est-ce qu'EduBoost ?",
    a: "EduBoost est la Grande Tombola Solidaire nationale organisée par YAS TOGO pour financer l'éducation des jeunes au Togo. Chaque ticket à 250 FCFA vous donne une chance de remporter de magnifiques lots tout en contribuant à un projet éducatif d'envergure nationale. Les fonds collectés servent à financer des bourses scolaires et des kits pour les élèves togolais.",
  },
  {
    q: "Comment acheter un ticket ?",
    a: "Vous pouvez acheter un ticket EduBoost de 3 façons : (1) Sur le Web - rendez-vous sur www.eduboost.tg/ticket. (2) Par SMS - envoyez le mot BOURSE au 8998 et suivez les instructions. (3) Par USSD - composez *909*5# depuis votre téléphone et sélectionnez EduBoost dans le menu.",
  },
  {
    q: "Combien coûte un ticket ?",
    a: "Un ticket EduBoost coûte 250 FCFA. Vous pouvez acheter plusieurs tickets en une seule commande (jusqu'à 100 tickets), ce qui multiplie vos chances de gagner.",
  },
  {
    q: "Quand aura lieu le tirage au sort ?",
    a: "Le tirage au sort est fixé au 1er Septembre 2026. Il se déroulera en direct sur YAS TOGO TV et sera diffusé sur tous les réseaux sociaux de YAS TOGO. La date et l'heure exactes seront communiquées ultérieurement.",
  },
  {
    q: "Quels sont les lots à gagner ?",
    a: "Plus de 10 000 000 FCFA de prix sont à gagner ! Le lot comprend 5 000 000 FCFA en bons d'achat d'articles scolaires (fournitures, équipements, livres) et 5 000 000 FCFA en prise en charge de frais de scolarité.",
  },
  {
    q: "Comment recevoir mon ticket après l'achat ?",
    a: "Vos codes tickets sont envoyés automatiquement par SMS sur le numéro de téléphone utilisé lors de l'achat, dans les minutes qui suivent la confirmation du paiement. Conservez précieusement vos codes - ils sont votre participation officielle.",
  },
  {
    q: "Comment consulter mes tickets ?",
    a: "Rendez-vous sur la page « Mes tickets » et entrez votre numéro de téléphone togolais. Vous recevrez un code OTP à 4 chiffres par SMS pour accéder à la liste de tous vos tickets et commandes.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Oui, absolument. Tous les paiements sont traités de manière entièrement sécurisée via les systèmes officiels de YAS TOGO : MIXX by YAS (mobile money) et Crédit YAS Airtime. Aucune information bancaire sensible n'est stockée.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-4 p-5 text-left cursor-pointer group"
      >
        {/* Numéro badge */}
        <span className="icon-badge h-8 w-8 text-xs font-black flex-shrink-0">
          {index + 1}
        </span>
        {/* Question */}
        <span className="flex-1 font-bold text-[#00377D] text-sm sm:text-base group-hover:text-[#00377D]/70 transition-colors">
          {q}
        </span>
        {/* Chevron */}
        <svg
          className="h-5 w-5 flex-shrink-0 text-[#FFD100] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Réponse avec animation hauteur */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <p className="px-5 pb-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 w-full">
      <div className="rounded-3xl bg-white p-6 md:p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="icon-badge h-14 w-14 rounded-2xl mx-auto mb-4">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black uppercase text-[#00377D]">
            Questions fréquentes
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tout ce que vous devez savoir sur EduBoost
          </p>
        </div>

        {/* Liste FAQ */}
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* CTA bas */}
        <div className="mt-8 rounded-2xl bg-[#0B1F5B] p-6 text-center text-white max-w-3xl mx-auto">
          <p className="font-black text-lg mb-1 text-white">Une autre question ?</p>
          <p className="text-white/70 text-sm mb-4">
            Contactez-nous au <strong className="text-[#FFD100]">8200</strong> ou sur nos réseaux sociaux.
          </p>
          <Link href="/ticket" className="btn-yellow text-sm inline-flex">
            Acheter un ticket - 250 FCFA
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
