// components/mes-tickets/TicketsList.tsx - Étape 3 : affichage des commandes

import Link from "next/link";

interface Ticket { ticket_code: string; created_at: string; }
interface Order  { ref: string; qty: number; amount: number; channel: string; status: string; date: string; tickets: Ticket[]; }

interface Props {
  phone:    string;
  orders:   Order[];
  onLogout: () => void;
}

export default function TicketsList({ phone, orders, onLogout }: Props) {
  const masked = phone.slice(0, 2) + " XX XX " + phone.slice(-2);
  const total  = orders.reduce((s, o) => s + o.qty, 0);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#00377D] font-black text-xl sm:text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Mes tickets
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            +228 {masked} - {total} ticket{total > 1 ? "s" : ""} au total
          </p>
        </div>
        <button onClick={onLogout}
          className="text-[#00377D] text-xs underline hover:opacity-70 transition flex items-center gap-1">
          <i className="bi bi-box-arrow-right" aria-hidden="true" /> Déconnexion
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <i className="bi bi-ticket-perforated text-4xl text-gray-300 block mb-3" aria-hidden="true" />
          <p className="text-gray-500 text-sm">Aucun ticket trouvé pour ce numéro.</p>
          <Link href="/ticket"
            className="mt-4 inline-flex items-center gap-2 bg-[#FFD100] text-[#00377D] font-bold px-6 py-3 rounded-xl text-sm">
            <i className="bi bi-plus-circle-fill" aria-hidden="true" /> Acheter des tickets
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map(order => (
            <div key={order.ref} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* En-tête */}
              <div className="bg-[#00377D] px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[#FFD100] font-black text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {order.ref}
                  </div>
                  <div className="text-white/60 text-xs">
                    {order.date} · {order.channel.toUpperCase()} · {order.amount.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <i className="bi bi-check-circle-fill" aria-hidden="true" /> Livré
                </span>
              </div>

              {/* Codes */}
              <div className="p-5">
                <div className="text-[#00377D] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1">
                  <i className="bi bi-ticket-perforated-fill text-[#FFD100]" aria-hidden="true" />
                  {order.qty} code{order.qty > 1 ? "s" : ""} ticket
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list" aria-label="Codes tickets">
                  {order.tickets.map((t, i) => (
                    <div key={t.ticket_code} role="listitem"
                      className="bg-[#00377D] text-[#FFD100] font-black text-center py-2.5 px-3 rounded-xl text-sm tracking-widest"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <div className="text-white/40 text-xs font-normal mb-0.5">#{i + 1}</div>
                      {t.ticket_code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link href="/ticket"
              className="inline-flex items-center gap-2 bg-[#FFD100] text-[#00377D] font-bold px-7 py-3.5 rounded-2xl text-sm hover:bg-yellow-400 transition shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <i className="bi bi-plus-circle-fill" aria-hidden="true" /> Acheter d&apos;autres tickets
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
