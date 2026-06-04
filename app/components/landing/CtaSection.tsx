"use client";

import Link from "next/link";
import { Tv2 } from "lucide-react";
import { useEffect, useState } from "react";

/* ── Icônes brand (SVG inline) ───────────────────────────────── */
function FacebookIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-9h3l.5-3.5H13V7.3c0-1 .3-1.7 1.8-1.7H17V2.4c-.4-.05-1.5-.15-2.8-.15-2.8 0-4.7 1.7-4.7 4.8V9.5H6V13h3.5v9H13Z"/></svg>;
}
function InstagramIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 12 18.7 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.3a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0Z"/></svg>;
}
function XIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 2h3l-7.5 8.6L21 22h-6.3l-4.9-6.4L4 22H1l8-9.2L3 2h6.4l4.5 5.9L17 2Zm-1.1 18h1.7L8.2 3.8H6.4L15.9 20Z"/></svg>;
}
function YoutubeIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.5a7.5 7.5 0 0 0-1.3-4.1c-.6-.7-1.3-1.1-2.2-1.2C17.4 2 12 2 12 2s-5.4 0-7.5.2c-.9.1-1.6.5-2.2 1.2A7.5 7.5 0 0 0 1 7.5C.8 9 .8 12 .8 12s0 3 .2 4.5a7.5 7.5 0 0 0 1.3 4.1c.6.7 1.4 1.1 2.2 1.2 2.1.2 7.5.2 7.5.2s5.4 0 7.5-.2c.9-.1 1.6-.5 2.2-1.2a7.5 7.5 0 0 0 1.3-4.1c.2-1.5.2-4.5.2-4.5s0-3-.2-4.5ZM9.8 15.5v-7l6 3.5-6 3.5Z"/></svg>;
}
function TiktokIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2c.3 2.2 1.6 3.9 3.9 4.1v2.6c-1.3.1-2.5-.3-3.9-1v6.3c0 4-2.8 6.7-6.4 6-3.1-.6-5-3.6-4.2-6.7.6-2.4 2.9-4 5.4-3.7v2.8c-.4-.1-.8-.2-1.2-.1-1.2.1-2 1.1-1.9 2.3.1 1.1 1.1 2 2.3 1.9 1.2-.1 2-1 2-2.3V2h3Z"/></svg>;
}

const SOCIALS = [
  { Icon: FacebookIcon,  label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: XIcon,         label: "X Twitter" },
  { Icon: YoutubeIcon,   label: "YouTube" },
  { Icon: TiktokIcon,    label: "TikTok" },
];

/* ── Countdown jusqu'au 01/09/2026 ──────────────────────────── */
const DRAW_DATE = new Date("2026-09-01T00:00:00");

function useCountdown() {
  const calc = () => {
    const diff = DRAW_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  
  }, []);
  return time;
}

function CountBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="min-w-[3.5rem] rounded-xl bg-white/10 px-3 py-2.5 text-center">
        <span className="block text-2xl font-black text-[#FFD100] tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{label}</span>
    </div>
  );
}

export default function CtaSection() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section className="my-6 mx-auto max-w-6xl px-4 w-full">
      <div className="grid gap-6 rounded-3xl bg-[#0B1F5B] p-6 text-white md:grid-cols-2 md:p-8">

        {/* Gauche — CTA achat */}
        <div className="md:border-r md:border-white/20 md:pr-8 flex flex-col justify-center">
          <h3 className="text-2xl font-black uppercase leading-tight text-[#FFD100]">
            1 ticket = 1 chance<br/>d&apos;offrir un meilleur avenir !
          </h3>
          <p className="mt-3 max-w-md text-sm font-medium text-white/90">
            En participant, vous soutenez l&apos;éducation des jeunes et contribuez à bâtir un Togo meilleur.
          </p>
          <Link href="/ticket" className="btn-yellow mt-6 text-sm inline-flex self-start">
            Acheter un ticket maintenant
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
          </Link>
        </div>

        {/* Droite — Tirage + countdown */}
        <div className="flex flex-col items-start gap-3 md:items-center md:text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">
            Tirage au sort le
          </p>
          <p className="text-3xl font-black text-[#FFD100] leading-none">01 SEPT 2026</p>

          <div className="flex items-center gap-2 mt-1">
            <Tv2 className="h-4 w-4 text-white/70 flex-shrink-0" strokeWidth={1.5} />
            <p className="text-sm font-extrabold uppercase">En direct sur YAS TOGO TV</p>
          </div>

          <p className="text-xs font-semibold text-white/60">et nos réseaux sociaux</p>

          {/* Countdown */}
          <div className="flex gap-3 mt-1">
            <CountBlock value={days}    label="Jours" />
            <CountBlock value={hours}   label="Hrs" />
            <CountBlock value={minutes} label="Min" />
            <CountBlock value={seconds} label="Sec" />
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-2.5 mt-1">
            {SOCIALS.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="icon-badge h-10 w-10 transition hover:brightness-90">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
