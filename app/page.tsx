import Navbar            from "./components/landing/Navbar";
import HeroSection       from "./components/landing/HeroSection";
import PrixSection       from "./components/landing/PrixSection";
import ParticiperSection from "./components/landing/ParticiperSection";
import CtaSection        from "./components/landing/CtaSection";
import LandingFooter     from "./components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#F4F5F7]">
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
        <HeroSection />
        <div className="w-full bg-[#F4F5F7]">
          <div className="container mx-auto max-w-6xl px-4 py-4 xl:pt-3 flex flex-col gap-6">
            <PrixSection />
            <ParticiperSection />
            <CtaSection />
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
