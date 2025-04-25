import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Exhibitions } from '@/components/sections/Exhibitions';
import { NewsBlock } from '@/components/sections/NewsBlock';

export const metadata = {
  title: 'ПХМГМ імені Миколи Ярошенка',
  description: 'A contemporary art museum with modern exhibitions.',
};
export default function HomePage() {
  return (
    <>
      <Head>
        <title>ПХМГМ імені Миколи Ярошенка</title>
        <meta name="description" content="ArtVibe Museum is a modern space for contemporary art exhibitions, events, and cultural inspiration." />
        <meta name="keywords" content="art museum, contemporary art, exhibitions, modern art, gallery, culture" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
      <main>
        <Hero />
        <Exhibitions />
         <NewsBlock />
      </main>
     
    </>
  );
}
