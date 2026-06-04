import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import FaqSection from "../components/landing/FaqSection";

export const metadata: Metadata = {
  title: "FAQ — EduBoost by YAS TOGO",
  description: "Questions fréquentes sur la tombola EduBoost de YAS TOGO.",
};

export default function FaqPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-gray-50">
      <PageHeader secure={false} />
      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <FaqSection />
      </main>
      <PageFooter />
    </div>
  );
}
