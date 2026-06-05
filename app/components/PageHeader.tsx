import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  secure?: boolean;
}

export default function PageHeader({ secure = true }: PageHeaderProps) {
  return (
    <header className="bg-[#FFD100] sticky top-0 z-40">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">

        {/* Logo gauche */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/yas-logo.png" alt="YAS" width={52} height={44} className="h-12 w-auto object-contain" priority />
          <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#00377D]">TOGO</span>
        </Link>

        {/* Centre - wordmark EduBoost */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <svg className="h-6 w-6 text-[#00377D]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3ZM5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.18-7-3.18Z"/>
            </svg>
            <span className="wordmark text-3xl text-[#00377D]">EduBoost</span>
          </div>
          <p className="mt-1 inline-block rounded bg-[#00377D] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
            La Grande Tombola Solidaire
          </p>
          <p className="mt-1 text-[11px] font-bold text-[#00377D]">BY YAS TOGO</p>
        </div>

        {/* Droite - sécurité + lien mes tickets */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {secure && (
            <div className="hidden sm:flex items-center gap-2">
              <svg className="h-6 w-6 text-[#00377D]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 0 1 6 0v3H9Z"/>
              </svg>
              <p className="text-xs font-bold text-[#00377D]">
                Paiement sécurisé<br/>YAS TOGO
              </p>
            </div>
          )}
          <Link
            href="/mes-tickets"
            className="flex items-center gap-1.5 text-[#00377D] font-bold text-xs hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
            </svg>
            <span className="hidden sm:inline">Mes tickets</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
