/**
 * page.tsx - Landing page GTE (shell minimal)
 *
 * Rôle : assembler les sections de la landing page dans l'ordre.
 * Toute la logique et le JSX sont dans components/landing/.
 *
 * Sections :
 *   Navbar          → navigation sticky + burger mobile
 *   HeroSection     → titre + slideshow + CTA
 *   PrixSection     → 10M FCFA de prix
 *   ParticiperSection → SMS | Web | USSD avec séparateurs "OU"
 *   CtaSection      → tirage 01/09/2026 + bouton achat
 *   LandingFooter   → sponsors + 4 colonnes + copyright
 */

import Navbar            from "./components/landing/Navbar";
import HeroSection       from "./components/landing/HeroSection";
import PrixSection       from "./components/landing/PrixSection";
import ParticiperSection from "./components/landing/ParticiperSection";
import CtaSection        from "./components/landing/CtaSection";
import LandingFooter     from "./components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <PrixSection />
      <ParticiperSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
