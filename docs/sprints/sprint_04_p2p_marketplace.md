# 🚀 Sprint 04 — New direction: P2P marketplace for local farmers (2026/11)

## Premise

- The project restarts with a clear direction: a **peer-to-peer marketplace** where
  **small, local producers (farmers, beekeepers, home bakers…) sell directly to people nearby**.
- See [`docs/concept.md`](../concept.md) for the full concept.

## 🎯 Goals

1. Finish every mockup from Sprints 02–03
2. Adapt the UI and data model to the P2P farmer marketplace
3. Translate the project into English and make it ready for GitHub

## Tasks

### 1. Finish the mockups

- [x] Reels: likes, comments (with input), product card, swipe to the seller's shop
- [x] New reel page: upload video/photo, caption, attach one of your products
- [x] My page: shop / posts / orders tabs, "List a product" form
- [x] Threads: feed with tags (Harvest, Question, Event, Tips) and filters
- [x] New thread page: text (500 chars), tag, photo

### 2. P2P marketplace features

- [x] Seller profiles at `/sellers/[username]`
- [x] Peer trust: verified badge + rating and number of reviews (`TrustBadge`)
- [x] Direct order requests (quantity, pickup / delivery, message) — no checkout middleman
- [x] Seller can accept / decline / mark as handed over; declined requests return stock
- [x] Product details: unit, stock, harvest date, pickup / delivery

### 3. Code quality and English

- [x] All UI text, comments and docs in English
- [x] Shared types in `src/lib/types.ts`; **all IDs are UUID strings**
- [x] `productFlg: "true"` (string) → `productId` (real link to a product)
- [x] One shared state file `src/lib/store.tsx` — the only file to change when adding Supabase
- [x] Renamed `SwipePagenation` → `SwipeNavigation`; absolute links (`/mypage`) everywhere
- [x] Routes renamed: `/scrollpage` → `/reels`, `/thread` → `/threads`
- [x] Original SVG illustrations instead of third-party photos (safe for a public repo)

### 4. Sprint review

- [ ] Test on a phone (`npm run dev` and open the local network URL)

## 📅 Next sprint (proposal)

- Supabase: auth, database (schema in [`docs/database.md`](../database.md)) and storage for uploads
- Real reviews after a completed order (feeds the peer rating)
- Map / distance filter: "producers near me"

## Retrospective

### 👍 Good

### 👎 Bad

### ➡️ Next
