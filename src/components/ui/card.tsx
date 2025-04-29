import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';

interface CardProps {
  image: string;
  title: string;
  href: string;
  children: React.ReactNode; // description
}

export const Card = ({ image, title, href, children }: CardProps) => (
  <a href={href} className="group relative block rounded-xl overflow-hidden shadow-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    {/* Темно-зелёное затемнение */}
    <div className="absolute inset-0 bg-green-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Описание при ховере */}
    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      <p className="text-sm">{children}</p>
    </div>

    {/* Заголовок — всегда виден */}
    <div className="absolute top-4 left-4 text-white px-3 py-1 rounded shadow text-m font-semibold z-10">
      {title}
    </div>
  </a>
);

