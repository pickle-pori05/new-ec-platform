import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/config';

const FEATURES = [
  { icon: '🤝', title: 'Peer to peer', text: 'Buy directly from the person who grew it. No middleman, no platform fees.' },
  { icon: '🎬', title: 'See the farm', text: 'Short videos from the field, the hives and the greenhouse.' },
  { icon: '⭐', title: 'Community trust', text: 'Verified peers and reviews from other buyers instead of a big brand.' },
];

const PAGES = [
  { href: '/reels', label: '🎬 Reels' },
  { href: '/threads', label: '🧵 Threads' },
  { href: '/mypage', label: '👤 My page' },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col bg-white px-6 py-12 text-black">
      <p className="text-5xl">🌱</p>
      <h1 className="mt-4 text-3xl font-bold">{APP_NAME}</h1>
      <p className="mt-1 text-gray-600">{APP_TAGLINE}</p>
      <p className="mt-4 text-sm text-gray-500">
        A peer-to-peer marketplace where small, local farmers and producers sell directly to people nearby.
      </p>

      <ul className="mt-8 space-y-4">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex gap-3">
            <span className="text-2xl">{f.icon}</span>
            <span>
              <span className="block font-bold">{f.title}</span>
              <span className="block text-sm text-gray-600">{f.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <Link href="/reels" className="mt-10 rounded-xl bg-emerald-600 py-3 text-center font-bold text-white">
        Start exploring
      </Link>

      <nav className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href} className="hover:text-black">
            {p.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
