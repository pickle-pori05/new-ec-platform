'use client';

// In-memory app state shared by all pages.
// This is the single place to replace when connecting a real backend (e.g. Supabase).
// Note: everything resets when the page is reloaded.
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Fulfillment, MediaType, Order, OrderStatus, Post, Product, Thread, ThreadTag, User } from './types';
import { MOCK_ORDERS, MOCK_POSTS, MOCK_PRODUCTS, MOCK_THREADS, MOCK_USERS } from './mockData';
import { CURRENT_USERNAME } from './config';
import { newId } from './utils';

interface StoreValue {
  currentUser: User;
  users: User[];
  posts: Post[];
  threads: Thread[];
  products: Product[];
  orders: Order[];

  getUser: (username: string) => User | undefined;
  getProduct: (id?: string | null) => Product | undefined;

  addPost: (input: { caption: string; mediaUrl?: string; mediaType?: MediaType; productId?: string }) => void;
  addComment: (postId: string, text: string) => void;
  addThread: (input: { text: string; tag?: ThreadTag; imageUrl?: string }) => void;
  addThreadReply: (threadId: string, text: string) => void;
  addProduct: (input: Omit<Product, 'id' | 'sellerUsername'>) => void;
  placeOrder: (input: { productId: string; quantity: number; fulfillment: Fulfillment; note?: string }) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const getUser = (username: string) => users.find((u) => u.username === username);
  const getProduct = (id?: string | null) => (id ? products.find((p) => p.id === id) : undefined);
  const currentUser = getUser(CURRENT_USERNAME) as User;
  const now = () => new Date().toISOString();

  const value: StoreValue = {
    currentUser,
    users,
    posts,
    threads,
    products,
    orders,
    getUser,
    getProduct,

    addPost: ({ caption, mediaUrl, mediaType, productId }) =>
      setPosts((prev) => [
        { id: newId(), username: CURRENT_USERNAME, caption, mediaUrl, mediaType, productId, likes: 0, comments: [] },
        ...prev,
      ]),

    addComment: (postId, text) =>
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: [...p.comments, { id: newId(), username: CURRENT_USERNAME, text }] } : p,
        ),
      ),

    addThread: ({ text, tag, imageUrl }) =>
      setThreads((prev) => [
        { id: newId(), username: CURRENT_USERNAME, text, tag, imageUrl, likes: 0, replies: [], createdAt: now() },
        ...prev,
      ]),

    addThreadReply: (threadId, text) =>
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId ? { ...t, replies: [...t.replies, { id: newId(), username: CURRENT_USERNAME, text }] } : t,
        ),
      ),

    addProduct: (input) =>
      setProducts((prev) => [{ ...input, id: newId(), sellerUsername: CURRENT_USERNAME }, ...prev]),

    placeOrder: ({ productId, quantity, fulfillment, note }) => {
      const product = getProduct(productId);
      if (!product) return;
      setOrders((prev) => [
        {
          id: newId(),
          productId,
          buyerUsername: CURRENT_USERNAME,
          sellerUsername: product.sellerUsername,
          quantity,
          fulfillment,
          note,
          status: 'requested',
          createdAt: now(),
        },
        ...prev,
      ]);
      // Reserve the stock until the seller answers.
      setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - quantity } : p)));
    },

    setOrderStatus: (orderId, status) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
      // A declined request gives the reserved stock back to the seller.
      if (status === 'declined' && order.status !== 'declined') {
        setProducts((prev) =>
          prev.map((p) => (p.id === order.productId ? { ...p, stock: p.stock + order.quantity } : p)),
        );
      }
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
};
