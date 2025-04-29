'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '/exhibitions', label: 'Виставки' },
  { href: '/about', label: 'Про музей' },
  { href: '/contact', label: 'Контакти' },
  { href: '/events', label: 'Події' },
  { href: '/shop', label: 'Магазин' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 150);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsDesktopMenuOpen(false);
  };

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  };

  const menuVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
  };

  const linkHoverAnimation = {
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const AnimatedLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <motion.div {...linkHoverAnimation}>
      <Link
        href={href}
        onClick={closeMenus}
        className="block py-2 text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-300 after:transition-all after:duration-300"
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
      className={`w-full px-6 md:px-20 sticky top-0 z-50 shadow-md transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-green-900/80 backdrop-blur-md py-2' : 'bg-green-800 py-6'}`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: isScrolled ? 0.7 : 1,
              x: isScrolled ? -50 : 0,
              y: isScrolled ? -50 : 0,
              scale: isScrolled ? 0.7 : 1,
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <Image
              src="/logo.webp"
              alt="Логотип"
              width={50}
              height={56}
              priority
              className="transition-all duration-300"
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <motion.nav
            initial={{ opacity: 1, x: 0 }}
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? 100 : 0,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex space-x-6 text-white"
          >
            {navLinks.slice(0, 3).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline hover:scale-110 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          <motion.button
            onClick={toggleDesktopMenu}
            className="text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {isDesktopMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </motion.button>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMobileMenu}
            className="text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Shared Dropdown */}
      <AnimatePresence>
        {(isMobileMenuOpen || isDesktopMenuOpen) && (
          <motion.div
            key="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`flex flex-col bg-green-800 p-6 rounded-lg mt-4 z-40 ${
              isMobileMenuOpen ? 'md:hidden' : 'hidden md:flex fixed top-20 right-0 w-[300px] rounded-l-2xl shadow-lg'
            }`}
          >
            {navLinks.map(link => (
              <AnimatedLink key={link.href} href={link.href}>
                {link.label}
              </AnimatedLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
