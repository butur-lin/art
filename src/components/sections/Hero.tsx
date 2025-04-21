'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Автовоспроизведение видео для некоторых браузеров
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Видео фон */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-intro.mp4" type="video/mp4" />
        {/* Фолбэк если видео не поддерживается */}
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center" />
      </video>
      
      {/* Затемнение фона */}
      <div className="bg-black/60 w-full h-full absolute top-0 left-0 z-1" />
      
      {/* Контент */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">ArtVibe Museum</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
          Dive into the world of contemporary creativity. Explore exhibitions, events, and the soul of modern art.
        </p>
        <Link href="/exhibitions">
          <Button className="text-lg px-6 py-3 rounded-2xl bg-white text-black hover:bg-gray-100">
            Explore Exhibitions
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};