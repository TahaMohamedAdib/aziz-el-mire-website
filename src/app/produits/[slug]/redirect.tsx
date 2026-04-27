'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LegacyRedirect({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/product/${slug}`);
  }, [slug, router]);

  return null;
}
