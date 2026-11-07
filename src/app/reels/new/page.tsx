'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components';
import { useStore } from '@/lib/store';
import type { MediaType } from '@/lib/types';

const MAX_LENGTH = 300;

/**
 * New reel: upload a video or photo, write a caption,
 * and optionally attach one of your products (adds a "View product" button).
 */
export default function NewReelPage() {
  const router = useRouter();
  const { addPost, products, currentUser } = useStore();
  const myProducts = products.filter((p) => p.sellerUsername === currentUser.username);

  const [mediaUrl, setMediaUrl] = useState<string>();
  const [mediaType, setMediaType] = useState<MediaType>();
  const [caption, setCaption] = useState('');
  const [attachProduct, setAttachProduct] = useState(false);
  const [productId, setProductId] = useState<string>();

  const canSubmit = !!mediaUrl && caption.trim().length > 0 && (!attachProduct || !!productId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addPost({ caption: caption.trim(), mediaUrl, mediaType, productId: attachProduct ? productId : undefined });
    router.push('/reels');
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md flex-1 bg-white text-black">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4">
        <Link href="/reels" className="text-sm text-gray-500">
          Cancel
        </Link>
        <h1 className="font-bold">New reel</h1>
        <button form="reel-form" type="submit" disabled={!canSubmit} className="text-sm font-bold text-emerald-600 disabled:opacity-30">
          Share
        </button>
      </header>

      <form id="reel-form" onSubmit={handleSubmit} className="flex flex-col gap-5 p-4">
        {/* Media picker + preview */}
        <label className="relative mx-auto block aspect-[9/16] max-h-[60vh] w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
          {mediaUrl ? (
            mediaType === 'video' ? (
              <video src={mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaUrl} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-gray-400">
              <span className="text-4xl">🎬</span>
              Choose a video or photo
            </span>
          )}
          <input
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setMediaUrl(URL.createObjectURL(file));
              setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
            }}
          />
        </label>

        {/* Caption */}
        <div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="What's happening on the farm today?"
            rows={3}
            className="w-full resize-none rounded-xl border px-3 py-2 text-sm"
          />
          <p className="text-right text-xs text-gray-400">
            {caption.length}/{MAX_LENGTH}
          </p>
        </div>

        {/* Attach a product */}
        <div className="rounded-2xl border p-4">
          <label className="flex cursor-pointer items-center justify-between">
            <span>
              <span className="block text-sm font-bold">🛒 Attach a product</span>
              <span className="block text-xs text-gray-500">Viewers can order it directly from the reel.</span>
            </span>
            <input
              type="checkbox"
              checked={attachProduct}
              onChange={(e) => setAttachProduct(e.target.checked)}
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          {attachProduct &&
            (myProducts.length === 0 ? (
              <p className="mt-3 text-xs text-gray-500">
                You have no products yet.{' '}
                <Link href="/mypage" className="font-bold text-emerald-700">
                  List one on My page
                </Link>
                .
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {myProducts.map((p) => (
                  <ProductCard key={p.id} product={p} selected={productId === p.id} onClick={() => setProductId(p.id)} />
                ))}
              </div>
            ))}
        </div>
      </form>
    </main>
  );
}
