'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/reels', label: 'Reels', icon: '🎬' },
  { href: '/threads', label: 'Threads', icon: '🧵' },
  { href: '/reels/new', label: 'Post', icon: '➕' },
  { href: '/mypage', label: 'My page', icon: '👤' },
];

// No navigation bar on the landing page and on the "new post" forms.
const HIDDEN_PATHS = ['/', '/reels/new', '/threads/new'];

const BottomNav = () => {
  const pathname = usePathname();
  if (HIDDEN_PATHS.includes(pathname)) return null;

  // The Reels page shows media behind the bar, so use a dark style there.
  const dark = pathname === '/reels';

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t
        ${dark ? 'border-white/10 bg-black/70 text-white backdrop-blur' : 'border-gray-200 bg-white text-gray-800'}`}
    >
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-[10px] ${active ? 'font-bold' : 'opacity-60'}`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
