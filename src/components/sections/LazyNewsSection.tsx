'use client';

import dynamic from 'next/dynamic';


const NewsBlock = dynamic(() => import('@/components/sections/NewsBlock').then(mod => mod.default), {
  loading: () => <p>Завантаження...</p>,
});

export function LazyNewsSection() {
  return (
    <>
     
      <NewsBlock />
    </>
  );
}
