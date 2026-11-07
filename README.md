# 🌱 Hatake — a P2P marketplace for local farmers

**Fresh food, straight from your neighbours.**

Hatake (畑, *"field"* in Japanese) is a peer-to-peer marketplace where small, local producers —
family farms, beekeepers, home gardeners and bakers — sell **directly** to people nearby,
with an Instagram-style interface (Reels, Threads, profile shops).

> ⚠️ This is a **front-end prototype**. Data is mocked in memory and resets on reload.
> The backend (Supabase) is planned — see [`docs/database.md`](docs/database.md).

## Features

- 🎬 **Reels** — full-screen vertical feed of farm videos/photos. Like, comment, and open the attached product. Swipe left to visit the seller's shop.
- 🧵 **Threads** — community posts tagged *Harvest*, *Question*, *Event* or *Tips*, with filters and replies.
- 🧺 **Profile shops** — every user (peer) has a shop on their profile (`/mypage`, `/sellers/[username]`).
- 🤝 **Direct order requests** — choose quantity, pickup or delivery, and send a message. The seller accepts, declines, or marks the order as handed over. No checkout middleman, no fees.
- ⭐ **Peer trust** — verified badge, rating and review count on every seller.
- ➕ **Posting** — upload a reel (and attach one of your products), write a thread, or list a new product.

## Tech stack

| | |
| :--- | :--- |
| Framework | [Next.js](https://nextjs.org) (App Router) + React + TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Gestures | [Framer Motion](https://motion.dev) |
| Planned backend | [Supabase](https://supabase.com) (Auth, PostgreSQL, Storage) |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The UI is designed for mobile — use your browser's device mode,
or open the "Network" URL shown in the terminal on your phone.

## Project structure

```text
src/
├── app/                      # Pages (App Router)
│   ├── layout.tsx            # Wraps every page with StoreProvider + BottomNav
│   ├── page.tsx              # Landing page
│   ├── reels/                # Feed + /reels/new
│   ├── threads/              # Feed + /threads/new
│   ├── mypage/               # Your profile, shop and orders
│   └── sellers/[username]/   # Other peers' profiles
├── components/               # UI components (exported from index.ts)
└── lib/
    ├── types.ts              # Domain types (UUID ids)
    ├── config.ts             # App name, currency, current user
    ├── mockData.ts           # Mock users, products, posts, threads, orders
    ├── store.tsx             # Shared state — the only file to replace for a real backend
    └── utils.ts              # Formatting helpers
docs/
├── concept.md                # Problem, idea, trust model
├── database.md               # ER diagram (Mermaid) for Supabase
└── sprints/                  # One Markdown file per sprint ("Docs as Code")
```

## How we work

We follow a lightweight agile process with **Docs as Code**: each sprint has one Markdown file
in [`docs/sprints/`](docs/sprints) with its goals, tasks and retrospective.

## Roadmap

- [x] Mockups: Reels, Threads, profiles, posting pages
- [x] P2P order requests and peer trust badges
- [ ] Supabase: authentication, database, media storage
- [ ] Reviews after completed orders → reputation score
- [ ] "Near me" map / distance filter
- [ ] Sybil-resistant reputation (research topic, see [`docs/concept.md`](docs/concept.md))

## License

[MIT](LICENSE) © 2026 Misato Kanayama. All illustrations in `public/images` are original.
