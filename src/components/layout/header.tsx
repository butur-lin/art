'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MapPin, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '/exhibitions', label: 'Афіша' },
  { href: '/services', label: 'Послуги' },
  { href: '/names', label: 'Імена' },
  { href: '/events', label: 'Події' },
  {
    href: '/abouts',
    label: 'Про музей',
    subLinks: [
      { href: '/contact', label: 'Контакти' },
      { href: '/public-information', label: 'Публічна інформація' },
    ],
  },
  {
    href: '/archive',
    label: 'Архів',
    subLinks: [
      { href: '/archive-yaroshenko', label: 'Архів творів М. О. Ярошенка' },
      { href: '/archive-tsiss', label: 'Архів творів Г. І. Цисса' },
    ],
  },
  { href: '/media', label: 'Медіа' },
  {
    href: '/awards',
    label: 'Премія',
    subLinks: [
      { href: '/prize-regulations', label: 'Положення про премію' },
      { href: '/award-winners', label: 'Лауреати премії' },
    ],
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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

  const toggleSubMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  };

  const AnimatedLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
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
      className={`w-full px-6 md:px-20 sticky top-0 z-50 shadow-md transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-green-900/80 backdrop-blur-md py-2' : 'bg-green-800 py-6'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Left section with contacts */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <Link href="tel:+380123456789" className="flex items-center gap-1 hover:text-green-300">
            <Phone size={16} />
            <span>+38 (012) 345 67 89</span>
          </Link>
          <Link
            href="https://maps.google.com/?q=Полтавський+художній+музей"
            target="_blank"
            className="flex items-center gap-1 hover:text-green-300"
          >
            <MapPin size={16} />
            <span>Полтава, вул. XYZ, 1</span>
          </Link>
        </div>

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
            <Image src="/logo.webp" alt="Логотип" width={50} height={56} priority />
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          {navLinks.map(link => (
            <div key={link.href} className="relative group">
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(link.label)}
                    className="flex items-center gap-1 hover:text-green-300"
                  >
                    {link.label} <ChevronDown size={16} />
                  </button>
                  {activeMenu === link.label && (
                    <div className="absolute top-full mt-2 bg-green-900 rounded-lg shadow-lg p-4 space-y-2 z-50">
                      {link.subLinks.map(sub => (
                        <AnimatedLink key={sub.href} href={sub.href}>
                          {sub.label}
                        </AnimatedLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
              )}
            </div>
          ))}

          <motion.button
            onClick={toggleDesktopMenu}
            whileHover={{ scale: 1.1 }}
            className="text-white"
          >
            {isDesktopMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <motion.button onClick={toggleMobileMenu} whileHover={{ scale: 1.1 }} className="text-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="md:hidden bg-green-900 mt-4 rounded-xl shadow-lg p-4 space-y-4 overflow-y-auto max-h-[80vh]"
          >
            {navLinks.map(link => (
              <div key={link.href} className="space-y-1">
                <AnimatedLink href={link.href}>
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.subLinks && <ChevronDown size={16} />}
                  </span>
                </AnimatedLink>
                {link.subLinks && (
                  <div className="ml-4 border-l border-green-500 pl-4 space-y-1">
                    {link.subLinks.map(sub => (
                      <AnimatedLink key={sub.href} href={sub.href}>
                        {sub.label}
                      </AnimatedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Social icons */}
            <div className="flex justify-center space-x-6 pt-4 border-t border-green-700">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-white"
              >
                <Facebook />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="text-white"
              >
                <Youtube />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
