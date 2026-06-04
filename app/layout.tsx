import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduBoost - La Grande Tombola Solidaire | YAS TOGO",
  description:
    "Participez à EduBoost, la Grande Tombola Solidaire organisée par YAS TOGO. " +
    "Ticket 250 FCFA — Prix total 10 000 000 FCFA. Tirage en direct le 01/09/2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focusable fixed top-4 left-4 z-[9999] bg-[#FFD100] text-[#00377D] font-bold px-4 py-2 rounded-xl shadow-lg"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
