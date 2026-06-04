# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important**: This is Next.js 16 with React 19 — APIs and conventions differ from older versions. Read `node_modules/next/dist/docs/` if unsure about a specific API.

---

## Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check (tests excluded from main tsconfig)
npm test             # Run all Vitest tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

Run a single test file:

```bash
npx vitest run tests/components.test.tsx
```

---

## Architecture

**Stack**: Next.js 16 (standalone output) + React 19 + TypeScript + Tailwind CSS 4 + Vitest

**What this is**: Frontend for EduBoost / GTE (Grande Tombola pour l'Education), a national tombola run by YAS TOGO. Tickets at 250 FCFA, prize 10M FCFA.

### Routing (4 pages)

| Route          | File                              | Notes                                             |
| -------------- | --------------------------------- | ------------------------------------------------- |
| `/`            | `app/page.tsx`                    | Landing (SSG), all marketing sections             |
| `/ticket`      | `app/ticket/page.tsx`             | Purchase form (MIXX / Crédit YAS)                 |
| `/confirmation`| `app/confirmation/page.tsx`       | Reads confirmation from localStorage (5-min TTL)  |
| `/mes-tickets` | `app/mes-tickets/page.tsx`        | OTP SMS auth flow → display tickets               |

All pages except landing are Client Components. No SSR — auth is OTP-based, no server sessions.

### State & Data Flow

No global state manager. Each page owns its state via custom hooks:

- **`hooks/useTicketPurchase.ts`** — POST `/buy`, then polls GET `/status?request_id=...` with AbortController (90s timeout, 1.5s interval). On success, saves to `lib/confirmation-store.ts` and redirects to `/confirmation`.
- **`hooks/useOtpAuth.ts`** — State machine: `PHONE → OTP → TICKETS`. Calls POST `/auth/otp/request` then POST `/auth/otp/verify`.

### Key Modules

- **`config/index.ts`** — `API_URL`, polling constants, `TOGO_PHONE_REGEX`, `isValidTogoPhone()`
- **`types/index.ts`** — All TypeScript interfaces (`PaymentMethod`, `OtpStep`, `Order`, `Ticket`, API response types)
- **`constants/brand.ts`** — Colors, tombola config (price, prize, draw date, shortcodes), social links
- **`lib/confirmation-store.ts`** — localStorage with 5-min TTL for confirmation data
- **`lib/requestId.ts`** — UUID v4 via `crypto.randomUUID()` for idempotent requests

### Components Layout

```text
app/components/
  landing/        # Navbar, HeroSection, HeroSlideshow, PrixSection, ParticiperSection, CtaSection, LandingFooter
  ticket/         # PaymentMethodSelector, PhoneInput, QuantityInput
  mes-tickets/    # PhoneStep, OtpStep, TicketsList
  PageHeader.tsx  # Shared header for /ticket, /confirmation, /mes-tickets
  PageFooter.tsx  # Shared footer
```

### API Endpoints (backend at `NEXT_PUBLIC_API_URL`)

```text
POST /buy                    # { phone, qty, payment_method, request_id, ... }
GET  /status?request_id=...  # Poll payment status
POST /auth/otp/request       # { phone }
POST /auth/otp/verify        # { phone, otp } → returns orders with ticket codes
```

In production, `NEXT_PUBLIC_API_URL` is empty — Nginx routes `/api/*` to the backend.

### Testing

Vitest with jsdom. Tests in `tests/` use a separate `tsconfig.test.json`. Coverage thresholds: 70% statements/functions/lines, 60% branches.

Mocks (in `tests/setup.ts`): Next.js router, Next.js Image, localStorage, sessionStorage.

### Styling

Tailwind CSS 4 with CSS custom properties for brand colors (`--yellow` #FFD100, `--navy` #00377D, `--sky` #5F99D2). Fonts: Montserrat (headings/CTAs), Poppins (body). Bootstrap Icons loaded via CDN in root layout.

Focus-visible uses color-inversion pattern: yellow outline on navy backgrounds, navy outline on yellow backgrounds. All interactive elements have 44px minimum touch targets.

### Deployment

Docker multi-stage build (node:20-alpine), Next.js standalone output. CI runs lint + typecheck + tests before Docker build/push to GitLab registry.

---

## Known TODOs (before production)

- Custom 404 page (`app/not-found.tsx`)
- Convert `public/adds.png` / `adds2.png` to WebP (performance)
- Open Graph image (1200×630px)
- JWT + httpOnly cookie for `/mes-tickets` (currently no token after OTP)
- Payment error page (`/echec`)
