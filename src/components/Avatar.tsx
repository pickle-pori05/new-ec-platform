'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';
import { profileUrl } from '@/lib/utils';

interface Props {
  username: string;
  size?: 'sm' | 'md' | 'lg';
  light?: boolean; // use on dark backgrounds (e.g. over a video)
}

const SIZES = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-20 h-20 text-2xl' };

/** Round avatar with the user's initial. Links to the user's profile. */
const Avatar = ({ username, size = 'md', light = false }: Props) => {
  const { currentUser } = useStore();

  return (
    <Link href={profileUrl(username, currentUser.username)} aria-label={`Open ${username}'s profile`}>
      <div
        className={`${SIZES[size]} shrink-0 rounded-full flex items-center justify-center font-bold uppercase
          ${light ? 'bg-white/30 text-white border border-white' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}
      >
        {username.charAt(0)}
      </div>
    </Link>
  );
};

export default Avatar;
