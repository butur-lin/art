'use client';

import dynamic from 'next/dynamic';

const CTE = dynamic(() => import('@/components/sections/CTE').then(mod => mod.default), {
  loading: () => <p>Завантаження...</p>,
});

export default function LazyCTE() {
  return (
    <>
      <CTE />
    </>
  );
}
