import type { User } from '@/lib/types';

interface Props {
  user: User;
  light?: boolean;
}

/**
 * Peer reputation shown next to a seller.
 * In a P2P marketplace there is no central shop to trust,
 * so buyers rely on community verification and reviews from other peers.
 */
const TrustBadge = ({ user, light = false }: Props) => (
  <span className={`inline-flex items-center gap-1.5 text-xs ${light ? 'text-white/90' : 'text-gray-600'}`}>
    {user.verified && (
      <span
        title="Verified by the community"
        className={`rounded-full px-1.5 py-0.5 font-semibold ${light ? 'bg-white/20' : 'bg-emerald-50 text-emerald-700'}`}
      >
        ✓ Verified
      </span>
    )}
    <span title={`${user.reviewCount} reviews`}>
      ★ {user.rating.toFixed(1)} <span className="opacity-60">({user.reviewCount})</span>
    </span>
  </span>
);

export default TrustBadge;
