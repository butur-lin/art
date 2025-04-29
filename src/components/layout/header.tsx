'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Facebook, Youtube, PhoneCall, MapPin } from 'lucide-react';
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
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 150);
      setLastScrollY(currentScrollY);
      if (currentScrollY > 50) closeMenus();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    setActiveMenu(null);
  };

  const toggleSubMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
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
        className="block py-2 text-white relative transition-all duration-300 font-ermilov hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-300 after:transition-all after:duration-300"
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
      className={`w-full px-6 md:px-20 sticky top-0 z-50 shadow-md transition-all duration-300 ease-in-out ${isScrolled ? 'bg-green-900/80 backdrop-blur-md py-2' : 'bg-green-800 py-6'}`}
    >
      <div className="flex justify-between items-center">
        {/* Left links near Logo */}
        <div className="hidden md:flex items-center font-ermilov gap-6 text-white">
          <motion.a
            href="tel:+380123456789"
            className="flex items-center gap-1 hover:text-green-300 transition"
            whileHover={{ scale: 1.1 }}
          >
            <PhoneCall size={18} /> +380 12 345 67 89
          </motion.a>
          <motion.a
            href="https://www.google.com/maps/place/Your+Museum+Address"
            target="_blank"
            className="flex items-center gap-1 hover:text-green-300 transition"
            whileHover={{ scale: 1.1 }}
          >
            <MapPin size={18} /> Карта
          </motion.a>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: isScrolled ? 0.7 : 1, x: isScrolled ? -50 : 0, y: isScrolled ? -50 : 0, scale: isScrolled ? 0.7 : 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <Image src="/logo.webp" alt="Логотип" width={50} height={56} priority className="transition-all duration-300" />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center font-ermilov space-x-6">
          <motion.nav initial={{ opacity: 1, x: 0 }} animate={{ opacity: isScrolled ? 0 : 1, x: isScrolled ? 100 : 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="flex space-x-6 font-ermilov text-white">
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(link.label)}
                      className="hover:underline hover:scale-110 flex items-center gap-1 transition-all"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeMenu === link.label && (
                      <div className="absolute left-0 mt-2 bg-green-800 text-white rounded-lg shadow-lg w-[300px] p-4 z-50">
                        {link.subLinks.map(subLink => (
                          <AnimatedLink key={subLink.href} href={subLink.href}>
                            {subLink.label}
                          </AnimatedLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link key={link.href} href={link.href} className="hover:underline hover:scale-110 transition-all">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.nav>

          <motion.button onClick={toggleDesktopMenu} className="text-white" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            {isDesktopMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </motion.button>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <motion.button onClick={toggleMobileMenu} className="text-white" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Dropdowns */}
      <AnimatePresence>
        {(isMobileMenuOpen || isDesktopMenuOpen) && (
          <motion.div
            ref={menuRef}
            key="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`font-ermilov flex flex-col bg-green-700 p-6 rounded-lg mt-4 z-40 ${isMobileMenuOpen ? 'md:hidden' : 'hidden md:flex fixed top-10 right-0 w-[350px] rounded-l-2xl shadow-lg'}`}
          >
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(link.label)}
                      className="w-full text-left py-2 text-white hover:underline flex items-center gap-2"
                    >
                      {link.label}
                      <ChevronDown size={16} />
                    </button>
                    {activeMenu === link.label && (
                      <div className="mt-2 ml-4 bg-green-700 rounded-md p-2">
                        {link.subLinks.map(subLink => (
                          <AnimatedLink key={subLink.href} href={subLink.href}>
                            {subLink.label}
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

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6 border-t border-green-600 pt-4">
              <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#a7f3d0' }} className="text-white transition">
                <Facebook size={20} />
              </motion.a>
              <motion.a href="https://youtube.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: '#a7f3d0' }} className="text-white transition">
                <Youtube size={20} />
              </motion.a>
            </div>

            {/* Phone and Map */}
            <div className="flex flex-col gap-2 mt-4 border-t border-green-600 pt-4">
              <motion.a
                href="tel:+380123456789"
                className="flex items-center gap-2 text-green-300 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                <PhoneCall size={20} /> Телефон
              </motion.a>
              <motion.a
                href="https://www.google.com/maps/place/Your+Museum+Address"
                target="_blank"
                className="flex items-center gap-2 text-green-300 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin size={20} /> Карта
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
