import { CURRENCY, LOCALE } from './config';

/** Generates a UUID (with a fallback for very old browsers). */
export const newId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

/** Short number format: 1000 → "1K", 1250000 → "1.3M". */
export const formatNum = (num: number | undefined): string => {
  if (!num) return '0';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
};

/** Price format, e.g. 1200 → "¥1,200". */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(price);

/** Relative time, e.g. "5m ago", "3h ago", "2d ago". */
export const timeAgo = (iso: string): string => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

/** Date format, e.g. "7 Nov". */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' });

/** True if the URL looks like a video file. */
export const isVideoUrl = (url?: string): boolean => !!url && /\.(mp4|webm|mov)$/i.test(url);

/** Profile URL for a user (your own profile lives at /mypage). */
export const profileUrl = (username: string, currentUsername: string): string =>
  username === currentUsername ? '/mypage' : `/sellers/${username}`;
