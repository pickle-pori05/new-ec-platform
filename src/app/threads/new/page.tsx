'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, TAG_STYLES } from '@/components';
import { useStore } from '@/lib/store';
import type { ThreadTag } from '@/lib/types';

const MAX_LENGTH = 500;
const TAGS: ThreadTag[] = ['Harvest', 'Question', 'Event', 'Tips'];

/** New thread: text (up to 500 characters), an optional tag and an optional photo. */
export default function NewThreadPage() {
  const router = useRouter();
  const { addThread, currentUser } = useStore();
  const [text, setText] = useState('');
  const [tag, setTag] = useState<ThreadTag>();
  const [imageUrl, setImageUrl] = useState<string>();

  const canSubmit = text.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addThread({ text: text.trim(), tag, imageUrl });
    router.push('/threads');
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md flex-1 bg-white text-black">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4">
        <Link href="/threads" className="text-sm text-gray-500">
          Cancel
        </Link>
        <h1 className="font-bold">New thread</h1>
        <span className="w-12" />
      </header>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-3">
          <Avatar username={currentUser.username} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{currentUser.username}</p>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
              placeholder="Share news from your farm, ask a question…"
              rows={5}
              className="mt-1 w-full resize-none text-sm outline-none"
            />

            {imageUrl && (
              <div className="relative mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="" className="max-h-72 w-full rounded-xl border object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl(undefined)}
                  className="absolute right-2 top-2 h-7 w-7 rounded-full bg-black/60 text-sm text-white"
                  aria-label="Remove photo"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Tag picker */}
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(tag === t ? undefined : t)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    tag === t ? TAG_STYLES[t] + ' ring-1 ring-current' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="mt-3 inline-block cursor-pointer text-xl" aria-label="Add a photo">
              🖼
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageUrl(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-3">
          <span className={`text-xs ${text.length >= MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}`}>
            {text.length}/{MAX_LENGTH}
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white disabled:opacity-30"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
}
