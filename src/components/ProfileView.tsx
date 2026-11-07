'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { isVideoUrl } from '@/lib/utils';
import AddProductSheet from './AddProductSheet';
import Avatar from './Avatar';
import OrderList from './OrderList';
import ProductCard from './ProductCard';
import ProductSheet from './ProductSheet';
import TrustBadge from './TrustBadge';

type Tab = 'shop' | 'posts' | 'orders';

/**
 * A peer's profile: shop, posts and (for your own profile) orders.
 * Used by /mypage (your profile) and /sellers/[username] (other peers).
 * Opening with ?productId=... shows that product right away (link from Reels).
 */
const ProfileView = ({ username }: { username: string }) => {
  const searchParams = useSearchParams();
  const { getUser, getProduct, products, posts, orders, currentUser } = useStore();

  const user = getUser(username);
  const isOwner = username === currentUser.username;

  const [tab, setTab] = useState<Tab>('shop');
  const [selected, setSelected] = useState<Product | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const product = getProduct(searchParams.get('productId'));
    if (product) setSelected(product);
    // Only react to URL changes, not to every store update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!user) {
    return (
      <main className="p-10 text-center text-sm text-gray-500">
        User not found. <Link href="/reels" className="font-bold text-emerald-700">Back to Reels</Link>
      </main>
    );
  }

  const shop = products.filter((p) => p.sellerUsername === username);
  const userPosts = posts.filter((p) => p.username === username);
  const incoming = orders.filter((o) => o.sellerUsername === username);
  const purchases = orders.filter((o) => o.buyerUsername === username);
  const pending = incoming.filter((o) => o.status === 'requested').length;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'shop', label: '🧺 Shop' },
    { key: 'posts', label: '🎬 Posts' },
    ...(isOwner ? [{ key: 'orders' as Tab, label: `📦 Orders${pending ? ` (${pending})` : ''}` }] : []),
  ];

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-white pb-16 text-black">
      {/* Header */}
      <header className="p-4">
        <div className="flex items-center gap-4">
          <Avatar username={user.username} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold">{user.displayName}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <div className="mt-1">
              <TrustBadge user={user} />
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm">{user.bio}</p>
        <p className="mt-1 text-xs text-gray-500">📍 {user.location}</p>

        <div className="mt-3 flex gap-4 text-sm">
          <span>
            <b>{shop.length}</b> products
          </span>
          <span>
            <b>{userPosts.length}</b> posts
          </span>
        </div>

        {isOwner && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="mt-4 w-full rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white transition-transform active:scale-[0.98]"
          >
            ＋ List a product
          </button>
        )}
      </header>

      {/* Tabs */}
      <div className="flex border-y">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 border-b-2 py-3 text-sm font-bold ${tab === key ? 'border-black' : 'border-transparent text-gray-400'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'shop' &&
        (shop.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">No products yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-px bg-gray-200">
            {shop.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setSelected(product)} />
            ))}
          </div>
        ))}

      {tab === 'posts' &&
        (userPosts.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-px bg-gray-200">
            {userPosts.map((post) => {
              const isVideo = post.mediaType ? post.mediaType === 'video' : isVideoUrl(post.mediaUrl);
              return (
                <Link key={post.id} href="/reels" className="relative aspect-[3/4] bg-black">
                  {post.mediaUrl &&
                    (isVideo ? (
                      <video src={post.mediaUrl} muted className="h-full w-full object-cover" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.mediaUrl} alt="" className="h-full w-full object-cover" />
                    ))}
                  {post.productId && <span className="absolute right-1 top-1 text-xs">🛒</span>}
                </Link>
              );
            })}
          </div>
        ))}

      {tab === 'orders' && isOwner && (
        <div>
          <h2 className="bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500">Incoming requests</h2>
          <OrderList orders={incoming} role="seller" emptyText="No requests yet." />
          <h2 className="bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500">My purchases</h2>
          <OrderList orders={purchases} role="buyer" emptyText="You haven't ordered anything yet." />
        </div>
      )}

      <ProductSheet product={selected} onClose={() => setSelected(null)} />
      {isOwner && <AddProductSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};

export default ProfileView;
