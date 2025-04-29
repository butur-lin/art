'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '/exhibitions', label: 'Афіша' },
  { href: '/services', label: 'Послуги' },
  { href: '/names', label: 'Імена' },
  { href: '/events', label: 'Події' },
  { href: '/abouts', label: 'Про музей', subLinks: [{ href: '/contact', label: 'Контакти' }, { href: '/public-information', label: 'Публічна інформація' }] },
  { href: '/archive', label: 'Архів', subLinks: [{ href: '/archive-yaroshenko', label: 'Архів творів М. О. Ярошенка' }, { href: '/archive-tsiss', label: 'Архів творів Г. І. Цисса' }] },
  { href: '/media', label: 'Медіа' },
  { href: '/awards', label: 'Премія', subLinks: [{ href: '/prize-regulations', label: 'Положення про премію' }, { href: '/award-winners', label: 'Лауреати премії' }] },
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
            {navLinks.slice(4).map(link => (
              <div key={link.href} className="relative">
                <button
                  onClick={() => toggleSubMenu(link.label)}
                  className="hover:underline hover:scale-110 transition-all"
                >
                  {link.label}
                </button>
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

          <div className="flex items-center space-x-4">
            {/* Phone & Address */}
            <a href="tel:+1234567890" className="text-white hover:text-green-300 transition-all">
              <Phone size={20} />
            </a>
            <a
              href="https://www.google.com/maps?q=your+museum+address"
              target="_blank"
              className="text-white hover:text-green-300 transition-all"
            >
              <MapPin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <motion.button onClick={toggleMobileMenu} whileHover={{ scale: 1.1 }} className="text-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="dropdown-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="flex flex-col bg-green-800 p-6 rounded-lg mt-4 z-40 md:hidden"
          >
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
                {link.subLinks && activeMenu === link.label && (
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
            {/* Social Media Links */}
            <div className="mt-6 space-y-4">
              <a href="https://facebook.com/yourmuseum" className="text-white hover:text-blue-600 transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com/yourmuseum" className="text-white hover:text-red-600 transition-all">
                <Youtube size={20} />
              </a>
            </div>

            {/* Phone & Address in Mobile Menu */}
            <div className="mt-6 flex flex-col space-y-4">
              <a href="tel:+1234567890" className="text-white hover:text-green-300 transition-all">
                <Phone size={20} />
                Телефон
              </a>
              <a
                href="https://www.google.com/maps?q=your+museum+address"
                target="_blank"
                className="text-white hover:text-green-300 transition-all"
              >
                <MapPin size={20} />
                Адреса
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
