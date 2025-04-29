import { Suspense } from 'react';
import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Exhibitions } from '@/components/sections/Exhibitions';
import { TitledDivider } from '@/components/ui/TitledDivider';
import { ClientWrapper } from '@/components/sections/ClientWrapper';
import { LazyNewsSection } from '@/components/sections/LazyNewsSection'; 
import LazyCTE from '@/components/sections/LazyCTE';

import LazyWinterGarden from '@/components/sections/WinterGarden'; // Импортируем по умолчанию

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
        <TitledDivider title="Виставкові Зали " />
        <Exhibitions />

        <TitledDivider title="Афіша" />

        {/* Оборачиваем в Suspense! */}
        <Suspense fallback={<div>Завантаження афіші...</div>}>
          <ClientWrapper>
    <LazyNewsSection />
  </ClientWrapper>
        </Suspense>
		<Suspense fallback={<div>Завантаження афіші...</div>}>
		<TitledDivider title="Зимовий сад " />
		<LazyWinterGarden />
		</Suspense>
		<Suspense fallback={<div>Завантаження афіші...</div>}>
		<TitledDivider title="Костюмовано-театралізована екскурсія " />
		<LazyCTE />
		</Suspense>
	       <section className="py-5 px-6 md:px-20 bg-gray-50">
		 <div className="text-center mb-2 max-w-4xl mx-auto">
      <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none text-lg text-gray-600 ">Полтавський художній музей (галерея мистецтв) імені Миколи Ярошенка розташована у затишному куточку центральної частини міста. Галерея дуже швидко набула популярності у полтавців. Це заклад культури нового зразка з просторими залами, холом, анфіладами, прес-центром на 100 місць і «зимовим садом», загальною площею більше 2 тис. кв. м.</p>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">У 2000 році до приміщення Галереї мистецтв через катастрофічний стан власної «домівки», колишнього маєтку поміщика Болюбаша – будівлі 1912 року, переїхав Полтавський художній музей. Тут він отримав постійну прописку, розмістивши експозицію у трьох анфіладах першого поверху, а фонди – у спеціально обладнаному фондосховищі.</p>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">У 2008 році Полтавський художній музей (галерея мистецтв) отримала, нарешті, ім’я Миколи Ярошенка.</p>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">У 2001 році до складу музею увійшла дитяча художня галерея  імені Саші Путрі, яка діє в окремій затишній залі художнього музею. Отже, Полтава має приклад закладу культури нового зразка, де одночасно взаємодіють усі існуючі види мистецтв.
      </p>
    </div>
		       </section>
      </main>
    </>
  );
}
