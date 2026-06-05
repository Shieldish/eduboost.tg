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
          <h1 className="text-[#00377D] font-black text-xl sm:text-2xl">Mes tickets</h1>
          <p className="text-gray-500 text-xs mt-0.5">
            +228 {masked} - {total} ticket{total > 1 ? "s" : ""} au total
          </p>
        </div>
        <button
          onClick={onLogout}
          className="text-[#00377D] text-xs font-bold underline hover:opacity-70 transition flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v1"/>
          </svg>
          Déconnexion
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-8 text-center">
          <svg className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
          </svg>
          <p className="text-gray-500 text-sm mb-4">Aucun ticket trouvé pour ce numéro.</p>
          <Link href="/ticket" className="btn-yellow text-sm inline-flex">
            Acheter des tickets
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map(order => (
            <div key={order.ref} className="bg-white rounded-2xl shadow-card overflow-hidden">
              {/* En-tête commande */}
              <div className="bg-[#00377D] px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="text-[#FFD100] font-black text-sm">{order.ref}</div>
                  <div className="text-white/60 text-xs">
                    {order.date} · {order.channel.toUpperCase()} · {order.amount.toLocaleString("fr-FR")} FCFA
                  </div>
                </div>
                <span className="bg-[#1E9E4A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7"/>
                  </svg>
                  Livré
                </span>
              </div>

              {/* Codes tickets */}
              <div className="p-5">
                <div className="text-[#00377D] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#FFD100]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/>
                  </svg>
                  {order.qty} code{order.qty > 1 ? "s" : ""} ticket
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="list" aria-label="Codes tickets">
                  {order.tickets.map((t, i) => (
                    <div
                      key={t.ticket_code}
                      role="listitem"
                      className="bg-[#00377D] text-[#FFD100] font-black text-center py-2.5 px-3 rounded-xl text-sm tracking-widest"
                    >
                      <div className="text-white/40 text-xs font-normal mb-0.5">#{i + 1}</div>
                      {t.ticket_code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link href="/ticket" className="btn-yellow text-sm inline-flex">
              Acheter d&apos;autres tickets
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
