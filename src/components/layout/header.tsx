'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '/exhibitions', label: 'Афіша' },
  { href: '/services', label: 'Послуги' },
  { href: '/names', label: 'Імена' },
  { href: '/events', label: 'Події' },
  { href: '/abouts', label: 'Про музей', subLinks: [{ href: '/contact', label: 'Контакти' }, { href: '/public-information', label: 'Публічна інформація' }] },
  { href: '/archive', label: 'Архів', subLinks: [{ href: '/archive-yaroshenko', label: 'Архів творів М. О. Ярошенка' }, { href: '/archive-tsiss', label: 'Архів творів Г. І. Цисса' }] },
  { href: '/awards', label: 'Премія', subLinks: [{ href: '/prize-regulations', label: 'Положення про премію' }, { href: '/award-winners', label: 'Лауреати премії' }] },
  { href: '/media', label: 'Медіа' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const toggleSubMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
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
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                {link.subLinks ? (
                  <button
                    onClick={() => toggleSubMenu(link.label)}
                    className="text-white py-2 px-4 hover:underline"
                  >
                    {link.label}
                    <ChevronDown className="inline w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
                )}
                {activeMenu === link.label && link.subLinks && (
                  <div className="absolute left-0 mt-2 bg-green-800 text-white rounded-lg shadow-lg w-[200px] p-4">
                    {link.subLinks.map(subLink => (
                      <AnimatedLink key={subLink.href} href={subLink.href}>
                        {subLink.label}
                      </AnimatedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.nav>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, x: 300 },
              visible: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 300 },
            }}
            className="flex flex-col bg-green-800 p-6 rounded-lg mt-4 z-40"
          >
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                {link.subLinks ? (
                  <button
                    onClick={() => toggleSubMenu(link.label)}
                    className="w-full text-left py-2 text-white hover:underline"
                  >
                    {link.label}
                  </button>
                ) : (
                  <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
                )}
                {activeMenu === link.label && link.subLinks && (
                  <div className="mt-2 ml-4 bg-green-700 rounded-md p-2">
                    {link.subLinks.map(subLink => (
                      <AnimatedLink key={subLink.href} href={subLink.href}>
                        {subLink.label}
                      </AnimatedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6 border-t border-green-600 pt-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#a7f3d0' }}
                className="text-white transition"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#a7f3d0' }}
                className="text-white transition"
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
