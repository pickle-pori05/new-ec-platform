'use client';

import { PostItem } from '@/components';
import { useStore } from '@/lib/store';

/** Reels: full-screen vertical feed, one post per screen. */
export default function ReelsPage() {
  const { posts } = useStore();

  return (
    <main className="no-scrollbar h-dvh w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </main>
  );
}
