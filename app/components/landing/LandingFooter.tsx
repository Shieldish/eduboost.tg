import Image from "next/image";
import Link from "next/link";
import { SPONSORS_OFFICIELS, SPONSORS_MEDIAS } from "../../../constants/sponsors";

export default function LandingFooter() {
  return (
    <footer className="mt-6 bg-[#0B1F5B]" id="sponsors">

      {/* SPONSORS */}
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <h2 className="text-center text-xl font-black uppercase text-white">
          Nos sponsors et partenaires
        </h2>

        <p className="mt-6 text-center text-xs font-extrabold uppercase tracking-widest text-white/70">
          Sponsors officiels
        </p>
        <div className="mt-3 grid grid-cols-2 items-center gap-4 sm:grid-cols-5">
          {SPONSORS_OFFICIELS.map(({ src, alt }) => (
            <div key={alt} className="sponsor-logo flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
              <Image src={src} alt={alt} width={96} height={48} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs font-extrabold uppercase tracking-widest text-white/70">
          Partenaires médias
        </p>
        <div className="mt-3 grid grid-cols-2 items-center gap-4 sm:grid-cols-6">
          {SPONSORS_MEDIAS.map(({ src, alt }) => (
            <div key={alt} className="sponsor-logo flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
              <Image src={src} alt={alt} width={72} height={40} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 text-white sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD100] rounded-xl p-1.5 flex items-center justify-center">
              <Image src="/yas-logo.png" alt="YAS TOGO" width={44} height={38} className="h-9 w-auto object-contain" />
            </div>
            <p className="text-xs font-medium text-white/90">
              YAS TOGO, engagé pour l&apos;éducation<br/>et l&apos;avenir de la jeunesse.
            </p>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-xs flex-wrap justify-center">
            <span className="font-semibold text-white/70">8200 | www.yas.tg</span>
            <span>·</span>
            <Link href="#" className="hover:text-[#FFD100] transition font-bold uppercase tracking-wide text-white/70">
              Plus d&apos;infos
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#FFD100] transition">Mentions légales</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#FFD100] transition">Règlement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
