import { Card } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import exhibitions from '@/components/data/exhibitions.json'; // 

export const Exhibitions = () => (
  <section className="py-5 px-6 md:px-20 bg-gray-50">
    <div className="text-center mb-12">
	  
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
     У 1999 році, у дні урочистостей з нагоди 1100-річного ювілею міста, Полтава отримала прекрасний подарунок у вигляді сучасної будівлі Галереї мистецтв  (архітектор Ю. Олійник).
Полтавський художній музей (Галерея мистецтв) імені Миколи Ярошенка</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {exhibitions.map((exhibit, index) => (
        <AnimatedCard key={exhibit.title} delay={index * 0.1}>
          <Card
            image={exhibit.image}
            title={exhibit.title}
            href={exhibit.href}
          >
            {exhibit.description}
          </Card>
        </AnimatedCard>
      ))}
    </div>
  </section>
);
