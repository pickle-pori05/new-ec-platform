'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Fulfillment, Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { formatDate, formatPrice, profileUrl } from '@/lib/utils';
import BottomSheet from './BottomSheet';
import TrustBadge from './TrustBadge';

interface Props {
  product: Product | null;
  onClose: () => void;
}

/**
 * Product details + a direct order request to the seller.
 * There is no checkout in the middle: the buyer sends a request,
 * and the seller accepts or declines it (see the Orders tab on My page).
 */
const ProductSheet = ({ product, onClose }: Props) => {
  const { getUser, currentUser, placeOrder } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  // Reset the form every time a different product is opened.
  useEffect(() => {
    setQuantity(1);
    setNote('');
    setSent(false);
    if (product) setFulfillment(product.pickup ? 'pickup' : 'delivery');
  }, [product]);

  const seller = product ? getUser(product.sellerUsername) : undefined;
  const isOwn = product?.sellerUsername === currentUser.username;
  const soldOut = !product || product.stock <= 0;

  const handleOrder = () => {
    if (!product || soldOut) return;
    placeOrder({ productId: product.id, quantity, fulfillment, note: note.trim() || undefined });
    setSent(true);
  };

  return (
    <BottomSheet isOpen={!!product} onClose={onClose}>
      {product && (
        <div className="p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.imageUrl} alt={product.name} className="mb-4 h-56 w-full rounded-2xl object-cover" />

          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="mt-1 text-lg font-semibold">
            {formatPrice(product.price)} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
          </p>

          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="rounded-full bg-gray-100 px-2 py-1">{product.stock} left</span>
            {product.harvestedAt && (
              <span className="rounded-full bg-gray-100 px-2 py-1">🌱 Harvested {formatDate(product.harvestedAt)}</span>
            )}
            {product.pickup && <span className="rounded-full bg-gray-100 px-2 py-1">📍 Pickup</span>}
            {product.delivery && <span className="rounded-full bg-gray-100 px-2 py-1">🚚 Delivery</span>}
          </div>

          {product.description && <p className="mt-3 text-sm text-gray-700">{product.description}</p>}

          {/* Seller (peer) information */}
          {seller && (
            <Link
              href={profileUrl(seller.username, currentUser.username)}
              onClick={onClose}
              className="mt-4 flex items-center justify-between rounded-xl border p-3"
            >
              <span>
                <span className="block text-sm font-bold">{seller.displayName}</span>
                <span className="block text-xs text-gray-500">📍 {seller.location}</span>
              </span>
              <TrustBadge user={seller} />
            </Link>
          )}

          {/* Order request */}
          {isOwn ? (
            <p className="mt-6 rounded-xl bg-gray-50 p-3 text-center text-sm text-gray-500">This is one of your products.</p>
          ) : sent ? (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-800">
              <p className="font-bold">✓ Request sent to @{product.sellerUsername}</p>
              <p className="mt-1">They will confirm the details with you. You can follow it in My page → Orders.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-8 w-8 rounded-full bg-gray-100 font-bold"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="h-8 w-8 rounded-full bg-gray-100 font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['pickup', 'delivery'] as const).map((option) => {
                  const available = product[option];
                  return (
                    <button
                      key={option}
                      disabled={!available}
                      onClick={() => setFulfillment(option)}
                      className={`rounded-xl border py-2 text-sm font-semibold capitalize disabled:opacity-30
                        ${fulfillment === option ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200'}`}
                    >
                      {option === 'pickup' ? '📍 Pickup' : '🚚 Delivery'}
                    </button>
                  );
                })}
              </div>

              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Message to the seller (optional)"
                className="w-full rounded-xl border px-3 py-2 text-sm"
              />

              <button
                onClick={handleOrder}
                disabled={soldOut}
                className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:bg-gray-300"
              >
                {soldOut ? 'Sold out' : `Request order · ${formatPrice(product.price * quantity)}`}
              </button>
              <p className="text-center text-[11px] text-gray-400">
                You pay the seller directly when you receive the food. No platform fees.
              </p>
            </div>
          )}

          <button onClick={onClose} className="mt-3 w-full py-2 text-sm font-semibold text-gray-500">
            Close
          </button>
        </div>
      )}
    </BottomSheet>
  );
};

export default ProductSheet;
