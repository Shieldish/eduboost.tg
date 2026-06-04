"use client";

import PageHeader  from "../components/PageHeader";
import PageFooter  from "../components/PageFooter";
import PhoneStep   from "../components/mes-tickets/PhoneStep";
import OtpStep     from "../components/mes-tickets/OtpStep";
import TicketsList from "../components/mes-tickets/TicketsList";
import { useOtpAuth } from "@/hooks/useOtpAuth";

export default function MesTicketsPage() {
  const auth = useOtpAuth();
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-gray-50">
      <PageHeader secure={false} />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-10 sm:py-14 max-w-xl mx-auto w-full">
        {auth.step === "PHONE" && (
          <PhoneStep phone={auth.phone} loading={auth.loading} error={auth.error} onChange={auth.setPhone} onSubmit={auth.requestOtp} />
        )}
        {auth.step === "OTP" && (
          <OtpStep phone={auth.phone} otp={auth.otp} devOtp={auth.devOtp} loading={auth.loading} error={auth.error} onChange={auth.setOtp} onSubmit={auth.verifyOtp} onBack={auth.reset} />
        )}
        {auth.step === "TICKETS" && (
          <TicketsList phone={auth.phone} orders={auth.orders} onLogout={auth.reset} />
        )}
      </main>
      <PageFooter />
    </div>
  );
}
