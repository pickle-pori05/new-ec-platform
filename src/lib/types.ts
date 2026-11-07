// Shared domain types.
// All IDs are UUID strings from day one, so the data can later move to a
// distributed database without changing the schema (see docs/database.md).

export type MediaType = 'video' | 'image';
export type Fulfillment = 'pickup' | 'delivery';
export type OrderStatus = 'requested' | 'accepted' | 'completed' | 'declined';
export type ThreadTag = 'Harvest' | 'Question' | 'Event' | 'Tips';

/** A person on the network. Every user can both buy and sell (peer-to-peer). */
export interface User {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  verified: boolean; // identity checked by other peers / the community
  rating: number; // average review score, 0–5
  reviewCount: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Product {
  id: string;
  sellerUsername: string;
  name: string;
  price: number;
  unit: string; // e.g. "1 kg", "10 eggs", "jar (300 g)"
  stock: number;
  imageUrl: string;
  description?: string;
  harvestedAt?: string; // ISO date
  pickup: boolean;
  delivery: boolean;
}

/** A short video or photo in the Reels feed. */
export interface Post {
  id: string;
  username: string;
  caption: string;
  mediaUrl?: string;
  mediaType?: MediaType; // needed for uploaded files (blob URLs have no extension)
  likes: number;
  comments: Comment[];
  productId?: string; // shows the "View product" button when set
}

/** A text post in the community Threads feed. */
export interface Thread {
  id: string;
  username: string;
  text: string;
  tag?: ThreadTag;
  imageUrl?: string;
  likes: number;
  replies: Comment[];
  createdAt: string; // ISO date-time
}

/** A direct order request from a buyer to a seller (no middleman). */
export interface Order {
  id: string;
  productId: string;
  buyerUsername: string;
  sellerUsername: string;
  quantity: number;
  fulfillment: Fulfillment;
  note?: string;
  status: OrderStatus;
  createdAt: string;
}
