# Concept

## Problem

Small, local producers — family farms, beekeepers, people with a large garden, home bakers —
often depend on intermediaries (wholesalers, supermarkets, big e-commerce platforms) to reach customers.

- Intermediaries take a large share of the price.
- Big platforms are built for large sellers, not for someone with 20 jars of honey.
- Customers can't easily see **who** grew their food and **how**.

## Idea

**Hatake** (畑, "field" in Japanese) is a **peer-to-peer marketplace**:
every user is a *peer* who can both buy and sell, and orders go **directly** from buyer to producer.

| Feature | What it does | Why it matters |
| :--- | :--- | :--- |
| **Reels** | Short videos/photos from the farm, with an attached product | Builds a personal connection; shows freshness and methods |
| **Threads** | Community posts: harvest news, questions, events, tips | Producers help each other; buyers hear about what is available |
| **Shop** | Each peer has a small shop on their profile | No separate store setup needed |
| **Direct order requests** | Buyer sends a request; seller accepts, declines or completes it | No checkout middleman, no platform fees |
| **Peer trust** | Verified badge, ratings and review counts | Replaces the trust normally given by a big brand |

## Trust without a central authority

In a P2P marketplace there is no big company that guarantees quality.
Trust has to come from the network itself:

1. **Verification by other peers** — e.g. existing members vouch for a new producer.
2. **Reputation** — reviews after completed orders, weighted by how trusted the reviewer is.
3. **Resistance to fake accounts** — a reputation system must resist Sybil attacks
   (one person creating many accounts to give themselves good reviews).

This part connects to my research interest in **decentralized trust and reputation in P2P networks**
(graph-based reputation, Sybil resistance, and privacy-preserving proofs of reputation).

## Out of scope (for now)

- Online payment (buyers pay the seller directly at pickup/delivery)
- Logistics / shipping integration
- Blockchain — the trust model is designed first, independently of any specific technology
