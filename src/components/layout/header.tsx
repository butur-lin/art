'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type MotionButtonProps = MotionProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Header = () => {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const slideDownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };

  const iconVariants = {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  };

  return (
    <header className="w-full py-6 px-6 md:px-20 bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          ArtVibe
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-gray-700">
            <Link href="/exhibitions">Exhibitions</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <motion.button
            onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
            className="text-gray-700"
            aria-label="Toggle desktop menu"
            animate={isDesktopMenuOpen ? 'open' : 'closed'}
            variants={iconVariants}
            transition={{ duration: 0.3 }}
            {...({} as MotionButtonProps)}
          >
            {isDesktopMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
            aria-label="Toggle mobile menu"
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            variants={iconVariants}
            transition={{ duration: 0.3 }}
            {...({} as MotionButtonProps)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isDesktopMenuOpen && (
          <motion.div
            key="desktop-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideDownVariants}
            className="hidden md:block overflow-hidden"
          >
            <motion.nav className="flex flex-col space-y-2 py-4 text-gray-700">
              <motion.div variants={itemVariants}>
                <Link href="/explore" className="block py-1">
                  Explore
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/events" className="block py-1">
                  Events
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/shop" className="block py-1">
                  Shop
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideDownVariants}
            className="md:hidden overflow-hidden"
          >
            <motion.nav className="flex flex-col space-y-4 py-4 text-gray-700">
              <motion.div variants={itemVariants}>
                <Link href="/explore" className="block py-1">
                  Explore
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/news" className="block py-1">
                  News
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/visit" className="block py-1">
                  Visit
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
