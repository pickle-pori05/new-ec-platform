'use client';

import { Suspense } from 'react';
import { ProfileView } from '@/components';
import { CURRENT_USERNAME } from '@/lib/config';

/** My page: your own profile, shop and orders. */
export default function MyPage() {
  return (
    // ProfileView reads ?productId=..., so it must be inside <Suspense>.
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <ProfileView username={CURRENT_USERNAME} />
    </Suspense>
  );
}
