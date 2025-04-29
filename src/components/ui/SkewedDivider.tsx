'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from '@/components/hooks/useMediaQuery'; // путь проверь

export const SkewedDivider = () => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // true для мобильных

  return (
    <motion.div
      initial={{ x: isMobile ? -100 : -220, opacity: 0 }}
      whileInView={{ x: isMobile ? -40 : -80, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative h-18 sm:h-22 md:h-26 overflow-hidden mt-0 flex items-end justify-start"
    >
      <div
        className="absolute left-0 top-0 h-full w-full max-w-[700px] bg-[url('/divider-skewed.png')] bg-no-repeat bg-left bg-cover"
        style={{
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)',
        }}
      />
      <h2 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold text-white ml-6 sm:ml-10 mb-4 drop-shadow-lg">
        Виставки
      </h2>
    </motion.div>
  );
};
