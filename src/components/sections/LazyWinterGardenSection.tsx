'use client';

import dynamic from 'next/dynamic';


const WinterGarden = dynamic(() => import('@/components/sections/WinterGarden').then(mod => mod.default), {
  loading: () => <p>Завантаження...</p>,
});

export function LazyWinterGarden() {
  return (
    <>
     
      <WinterGarden />
    </>
  );
}
