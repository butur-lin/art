import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';

interface CardProps {
  image: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

export const Card: React.FC<CardProps> = ({ image, title, children, href }) => (
  <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
    <Image src={image} alt={title} width={400} height={300} className="w-full h-60 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{children}</p>
      <Link href={href}>
        <Button className="text-sm px-4 py-2 rounded-xl">Learn More</Button>
      </Link>
    </div>
  </div>
);
