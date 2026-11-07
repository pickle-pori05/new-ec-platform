'use client';

import { useState } from 'react';
import type { Thread, ThreadTag } from '@/lib/types';
import { useStore } from '@/lib/store';
import { formatNum, timeAgo } from '@/lib/utils';
import Avatar from './Avatar';
import CommentSheet from './CommentSheet';

export const TAG_STYLES: Record<ThreadTag, string> = {
  Harvest: 'bg-emerald-50 text-emerald-700',
  Question: 'bg-sky-50 text-sky-700',
  Event: 'bg-amber-50 text-amber-700',
  Tips: 'bg-violet-50 text-violet-700',
};

/** One post in the community Threads feed. */
const ThreadItem = ({ thread }: { thread: Thread }) => {
  const { addThreadReply } = useStore();
  const [liked, setLiked] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <article className="flex gap-3 border-b border-gray-100 px-4 py-3">
      <Avatar username={thread.username} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold">{thread.username}</span>
          {thread.tag && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TAG_STYLES[thread.tag]}`}>
              {thread.tag}
            </span>
          )}
          <span className="text-xs text-gray-400">{timeAgo(thread.createdAt)}</span>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-sm">{thread.text}</p>

        {thread.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thread.imageUrl} alt="" className="mt-2 max-h-80 w-full rounded-xl border border-gray-200 object-cover" />
        )}

        <div className="mt-2 flex gap-5 text-sm text-gray-600">
          <button onClick={() => setLiked(!liked)} className="flex items-center gap-1 transition-transform active:scale-90">
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>{formatNum(thread.likes + (liked ? 1 : 0))}</span>
          </button>
          <button onClick={() => setIsReplyOpen(true)} className="flex items-center gap-1">
            <span>💬</span>
            <span>{formatNum(thread.replies.length)}</span>
          </button>
        </div>
      </div>

      <CommentSheet
        title="Replies"
        isOpen={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        comments={thread.replies}
        onSubmit={(text) => addThreadReply(thread.id, text)}
      />
    </article>
  );
};

export default ThreadItem;
