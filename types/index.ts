// types/index.ts - Interfaces TypeScript du projet GTE Frontend

// ── Paiement ──────────────────────────────────────────────────────────────────

export type PaymentMethod = "MIXX" | "CREDIT_YAS" | null;

// ── Tickets & Commandes ───────────────────────────────────────────────────────

export interface Ticket {
  ticket_code: string;
  created_at:  string;
}

export interface Order {
  ref:     string;
  qty:     number;
  amount:  number;
  channel: string;
  status:  string;
  date:    string;
  tickets: Ticket[];
}

// ── Réponses API backend ──────────────────────────────────────────────────────

export interface BuyResponse {
  status:      string;
  status_url?: string;
  codes?:      string[];
  idempotent?: boolean;
}

export interface StatusResponse {
  status:    string;
  codes:     string[];
  acks_late?: boolean;
  reference?: string;
}

export interface OtpRequestResponse {
  status:   string;
  dev_otp?: string;   // Uniquement si DEBUG=True côté backend
}

export interface OtpVerifyResponse {
  phone:  string;
  total:  number;
  orders: Order[];
}

export interface MyTicketsResponse {
  phone:  string;
  total:  number;
  orders: Order[];
}

// ── Flow OTP ──────────────────────────────────────────────────────────────────

export type OtpStep = "PHONE" | "OTP" | "TICKETS";
