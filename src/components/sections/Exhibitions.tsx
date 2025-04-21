import { Card } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

export const Exhibitions = () => (
  <section className="py-20 px-6 md:px-20 bg-gray-50">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-semibold mb-4">Current & Upcoming Exhibitions</h2>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        Discover what’s on view at ArtVibe. From immersive installations to classic reimaginings.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[1, 2, 3].map((item, index) => (
        <AnimatedCard key={item} delay={index * 0.1}>
          <Card
            image={`/exhibit${item}.jpg`}
            title={`Exhibition Title ${item}`}
            href={`/exhibitions/exhibit-${item}`}
          >
            Brief description of the exhibition and what visitors can expect to see.
          </Card>
        </AnimatedCard>
      ))}
    </div>
  </section>
);