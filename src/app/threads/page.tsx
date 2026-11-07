'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThreadItem } from '@/components';
import { useStore } from '@/lib/store';
import type { ThreadTag } from '@/lib/types';

const FILTERS: (ThreadTag | 'All')[] = ['All', 'Harvest', 'Question', 'Event', 'Tips'];

/** Threads: community posts (harvest news, questions, events, tips). */
export default function ThreadsPage() {
  const { threads } = useStore();
  const [filter, setFilter] = useState<ThreadTag | 'All'>('All');

  const visible = filter === 'All' ? threads : threads.filter((t) => t.tag === filter);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md flex-1 bg-white pb-16 text-black">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-bold">Threads</h1>
          <Link href="/threads/new" className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
            ＋ New
          </Link>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                filter === f ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {visible.length === 0 && <p className="py-12 text-center text-sm text-gray-400">Nothing here yet.</p>}
      {visible.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </main>
  );
}
