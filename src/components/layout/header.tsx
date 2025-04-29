'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const slideDownVariants = {
  hidden: { opacity: 0, x: 300 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 300 },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };
const logoVariants = {
  initial: { opacity: 1, x: 0, y: 0 },
  down: { 
    y: 50, 
    transition: { 
      duration: 0.6, 
      ease: 'easeInOut' 
    } 
  },
  right: { 
    x: 500, 
    opacity: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeInOut', 
      delay: 0.2 // Пауза перед сдвигом вправо
    } 
  },
};
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsDesktopMenuOpen(false);
  };

  const closeDesktopMenu = () => setIsDesktopMenuOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const logoPath = '/logo.webp';

  const menuVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
  };

  const linkHoverAnimation = {
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const AnimatedLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <motion.div {...linkHoverAnimation}>
      <Link
        href={href}
        onClick={onClick}
        className="block py-2 relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-300 after:transition-all after:duration-300"
      >
        {children}
      </Link>
    </motion.div>
  );

  return (
<motion.header
  initial={{ y: 0 }}
  animate={{ y: isVisible ? 0 : -100 }}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
  className={`w-full px-6 md:px-20 sticky top-0 z-50 transition-all duration-300 ease-in-out shadow-md
  ${isScrolled ? 'bg-green-900/80 backdrop-blur-md py-2' : 'bg-green-800 py-6'}`}
>
  <div className="flex justify-between items-center relative z-50">
    <Link href="/" className="flex items-center transition-all duration-300 overflow-hidden relative z-50">
      <motion.div
        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        animate={{
          opacity: isScrolled ? 0.7 : 1,
          x: isScrolled ? -50 : 0,
          y: isScrolled ? -50 : 0,
          scale: isScrolled ? 0.7 : 1,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="z-50"
      >
        <Image
          src={logoPath}
          alt="Логотип"
          width={50}
          height={56}
          priority
          className="transition-all duration-300"
        />
      </motion.div>
    </Link>

    {/* Desktop Menu Button */}
    <div className="hidden md:flex items-center space-x-6 relative z-50">
      <motion.nav
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          x: isScrolled ? 100 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex space-x-6 transition-all duration-300 text-white relative z-40"
      >
        <Link href="/exhibitions" className="hover:underline hover:scale-110 transition-all">Виставки</Link>
        <Link href="/about" className="hover:underline hover:scale-110 transition-all">Про музей</Link>
        <Link href="/contact" className="hover:underline hover:scale-110 transition-all">Контакти</Link>
      </motion.nav>

      {/* Кнопка для открытия сайдбара */}
      <motion.button
        onClick={toggleDesktopMenu}
        className="text-white relative z-50"
        aria-label="Toggle desktop menu"
        animate={isDesktopMenuOpen ? 'open' : 'closed'}
        variants={iconVariants}
        transition={{ duration: 0.4 }}
      >
        {isDesktopMenuOpen ? <X size={30} /> : <Menu size={30} />}
      </motion.button>
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <motion.button
        onClick={toggleMobileMenu}
        className="text-white relative z-50"
        aria-label="Toggle mobile menu"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>
    </div>
  </div>

  {/* Desktop Sidebar Menu */}
  <AnimatePresence>
    {isDesktopMenuOpen && (
      <motion.div
        key="desktop-menu"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
        className="hidden md:flex flex-col bg-green-800 fixed top-20 right-0 w-[300px] p-8 rounded-l-2xl shadow-lg z-40"
      >
        <AnimatedLink href="/exhibitions" onClick={closeDesktopMenu}>Виставки</AnimatedLink>
        <AnimatedLink href="/about" onClick={closeDesktopMenu}>Про музей</AnimatedLink>
        <AnimatedLink href="/contact" onClick={closeDesktopMenu}>Контакти</AnimatedLink>
        <AnimatedLink href="/events" onClick={closeDesktopMenu}>Події</AnimatedLink>
        <AnimatedLink href="/shop" onClick={closeDesktopMenu}>Магазин</AnimatedLink>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Mobile Dropdown Menu */}
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div
        key="mobile-menu"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
        className="md:hidden flex flex-col bg-green-800 p-6 rounded-lg mt-4 z-40"
      >
        <AnimatedLink href="/exhibitions" onClick={closeMobileMenu}>Виставки</AnimatedLink>
        <AnimatedLink href="/about" onClick={closeMobileMenu}>Про музей</AnimatedLink>
        <AnimatedLink href="/contact" onClick={closeMobileMenu}>Контакти</AnimatedLink>
        <AnimatedLink href="/events" onClick={closeMobileMenu}>Події</AnimatedLink>
        <AnimatedLink href="/shop" onClick={closeMobileMenu}>Магазин</AnimatedLink>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>
  );
};
