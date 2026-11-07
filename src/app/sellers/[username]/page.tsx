'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { ProfileView } from '@/components';

/** Another peer's public profile and shop. */
export default function SellerPage() {
  const params = useParams<{ username: string }>();

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <ProfileView username={decodeURIComponent(params.username)} />
    </Suspense>
  );
}
