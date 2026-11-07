'use client';

import type { Order, OrderStatus } from '@/lib/types';
import { useStore } from '@/lib/store';
import { formatPrice, timeAgo } from '@/lib/utils';

const STATUS_STYLES: Record<OrderStatus, string> = {
  requested: 'bg-amber-50 text-amber-700',
  accepted: 'bg-sky-50 text-sky-700',
  completed: 'bg-emerald-50 text-emerald-700',
  declined: 'bg-gray-100 text-gray-500',
};

interface Props {
  orders: Order[];
  role: 'seller' | 'buyer';
  emptyText: string;
}

/** Orders as seen by the seller (incoming) or by the buyer (my purchases). */
const OrderList = ({ orders, role, emptyText }: Props) => {
  const { getProduct, setOrderStatus } = useStore();

  if (orders.length === 0) return <p className="py-8 text-center text-sm text-gray-400">{emptyText}</p>;

  return (
    <ul className="divide-y">
      {orders.map((order) => {
        const product = getProduct(order.productId);
        const otherPeer = role === 'seller' ? order.buyerUsername : order.sellerUsername;

        return (
          <li key={order.id} className="flex gap-3 p-4">
            {product && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold">
                  {product?.name ?? 'Product'} × {order.quantity}
                </p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {role === 'seller' ? 'from' : 'to'} @{otherPeer} · {order.fulfillment === 'pickup' ? '📍 Pickup' : '🚚 Delivery'} ·{' '}
                {timeAgo(order.createdAt)}
              </p>
              {product && <p className="text-xs font-semibold">{formatPrice(product.price * order.quantity)}</p>}
              {order.note && <p className="mt-1 rounded-lg bg-gray-50 px-2 py-1 text-xs italic">“{order.note}”</p>}

              {/* Seller actions */}
              {role === 'seller' && order.status === 'requested' && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setOrderStatus(order.id, 'accepted')}
                    className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white"
                  >
                    Accept
                  </button>
                  <button onClick={() => setOrderStatus(order.id, 'declined')} className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold">
                    Decline
                  </button>
                </div>
              )}
              {role === 'seller' && order.status === 'accepted' && (
                <button
                  onClick={() => setOrderStatus(order.id, 'completed')}
                  className="mt-2 rounded-lg bg-gray-900 px-3 py-1 text-xs font-bold text-white"
                >
                  Mark as handed over
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderList;
