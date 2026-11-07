'use client';

import { useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/types';
import { useStore } from '@/lib/store';
import { formatNum, formatPrice, isVideoUrl, profileUrl } from '@/lib/utils';
import Avatar from './Avatar';
import CommentSheet from './CommentSheet';
import SwipeNavigation from './SwipeNavigation';
import TrustBadge from './TrustBadge';

/** One full-screen item in the Reels feed. Swipe left to open the seller's shop. */
const PostItem = ({ post }: { post: Post }) => {
  const router = useRouter();
  const { addComment, getProduct, getUser, currentUser } = useStore();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const author = getUser(post.username);
  const product = getProduct(post.productId);
  const isVideo = post.mediaType ? post.mediaType === 'video' : isVideoUrl(post.mediaUrl);

  // Product post → open the product in the seller's shop. Otherwise → seller's profile.
  const baseUrl = profileUrl(post.username, currentUser.username);
  const shopUrl = product ? `${baseUrl}?productId=${product.id}` : baseUrl;

  return (
    <section className="relative flex h-dvh w-full snap-start flex-col overflow-hidden">
      <SwipeNavigation nextUrl={shopUrl}>
        <div className="relative h-full w-full">
          {/* Background media (plain <img>/<video> so uploaded blob URLs also work) */}
          {post.mediaUrl ? (
            isVideo ? (
              <video src={post.mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.mediaUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )
          ) : (
            <div className="h-full w-full bg-black" />
          )}

          {/* Gradient so the text stays readable */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Right side: actions */}
          <div className="absolute bottom-36 right-4 z-10 flex flex-col gap-5">
            <button style={actionStyle} className="transition-transform active:scale-90" onClick={() => setLiked(!liked)}>
              <span className="text-2xl">{liked ? '❤️' : '🤍'}</span>
              <span style={countStyle}>{formatNum(post.likes + (liked ? 1 : 0))}</span>
            </button>
            <button style={actionStyle} onClick={() => setIsCommentOpen(true)}>
              <span className="text-2xl">💬</span>
              <span style={countStyle}>{formatNum(post.comments.length)}</span>
            </button>
          </div>

          {/* Bottom left: product, author and caption */}
          <div className="absolute bottom-20 left-4 right-20 z-10 text-white drop-shadow-md">
            {product && (
              <button
                onClick={() => router.push(shopUrl)}
                className="mb-4 flex items-center gap-2 rounded-xl border border-white/60 bg-white/15 px-3 py-2 text-left backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <span className="text-lg">🛒</span>
                <span>
                  <span className="block text-xs font-semibold">{product.name}</span>
                  <span className="block text-[11px] opacity-90">
                    {formatPrice(product.price)} / {product.unit} · View product
                  </span>
                </span>
              </button>
            )}

            <div className="mb-2 flex items-center gap-2">
              <Avatar username={post.username} light />
              <div>
                <p className="text-sm font-bold">@{post.username}</p>
                {author && <TrustBadge user={author} light />}
              </div>
            </div>
            <p className="my-1 whitespace-pre-wrap text-sm font-medium">{post.caption}</p>
          </div>
        </div>
      </SwipeNavigation>

      <CommentSheet
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
        comments={post.comments}
        onSubmit={(text) => addComment(post.id, text)}
      />
    </section>
  );
};

const actionStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: 0,
};

const countStyle: CSSProperties = { fontSize: '12px', fontWeight: 'bold', marginTop: '4px' };

export default PostItem;
