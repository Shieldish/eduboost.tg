import Navbar            from "./components/landing/Navbar";
import HeroSection       from "./components/landing/HeroSection";
import PrixSection       from "./components/landing/PrixSection";
import ParticiperSection from "./components/landing/ParticiperSection";
import CtaSection        from "./components/landing/CtaSection";
import LandingFooter     from "./components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#FFD100]">
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col gap-6 pb-6">
        <HeroSection />
        <PrixSection />
        <ParticiperSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
