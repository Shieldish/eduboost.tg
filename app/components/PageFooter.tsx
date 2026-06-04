import Image from "next/image";

export default function PageFooter() {
  return (
    <footer className="bg-[#0B1F5B] safe-bottom">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-6 text-white sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFD100] rounded-xl p-1.5 flex items-center justify-center">
            <Image src="/yas-logo.png" alt="YAS TOGO" width={44} height={38} className="h-9 w-auto object-contain" />
          </div>
          <p className="text-xs font-medium text-white/90">
            YAS TOGO, engagé pour l&apos;éducation<br/>et l&apos;avenir de la jeunesse.
          </p>
        </div>
        <p className="text-xs font-semibold text-white/70">8200 | www.yas.tg</p>
      </div>
    </footer>
  );
}
