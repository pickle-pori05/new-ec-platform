'use client';

import { useState, type FormEvent } from 'react';
import type { Comment } from '@/lib/types';
import Avatar from './Avatar';
import BottomSheet from './BottomSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onSubmit: (text: string) => void;
  title?: string;
}

/** Comment list + input, used for Reels comments and Thread replies. */
const CommentSheet = ({ isOpen, onClose, comments, onSubmit, title = 'Comments' }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={`${title} (${comments.length})`}
      height="h-[60vh]"
      footer={
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm outline-none"
          />
          <button type="submit" disabled={!text.trim()} className="text-sm font-bold text-emerald-600 disabled:opacity-40">
            Post
          </button>
        </form>
      }
    >
      <div className="p-4">
        {comments.length === 0 && (
          <p className="mt-8 text-center text-sm text-gray-400">No comments yet. Start the conversation!</p>
        )}
        {comments.map((c) => (
          <section key={c.id} className="mb-3 flex items-start gap-2">
            <Avatar username={c.username} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{c.username}</p>
              <p className="whitespace-pre-wrap break-words text-sm">{c.text}</p>
            </div>
          </section>
        ))}
      </div>
    </BottomSheet>
  );
};

export default CommentSheet;
