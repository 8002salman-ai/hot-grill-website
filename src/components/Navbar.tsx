import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Flame, Clock, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO, isOpenNow } from '../config/restaurant';

interface NavbarProps {
  onSearchOpen: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(isOpenNow());

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearchOpen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSearchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setOpenStatus(isOpenNow()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-dark-surface border-b border-dark-border py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 lg:gap-6">
              <a 
                href={RESTAURANT_INFO.phoneLink} 
                className="flex items-center gap-2 text-gray-300 hover:text-flame transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-flame" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-flame" />
                <span className="hidden lg:inline">{RESTAURANT_INFO.address.full}</span>
                <span className="lg:hidden">{RESTAURANT_INFO.address.short}</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              openStatus.isOpen 
                ? 'bg-green-500/15 text-green-400' 
                : 'bg-red-500/15 text-red-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${openStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span>{openStatus.status}</span>
              <span className="hidden md:inline text-gray-500">· {openStatus.nextChange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/98 backdrop-blur-xl border-b border-dark-border shadow-2xl'
            : 'bg-dark-surface/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="relative">
                <Flame className="w-8 h-8 text-flame group-hover:text-flame-orange transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white leading-tight">
                  Hot <span className="text-flame">Grill</span>
                </span>
                <span className="text-[8px] tracking-[0.2em] text-flame/70 font-semibold uppercase -mt-0.5">
                  {RESTAURANT_INFO.tagline}
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-flame transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-flame-red to-flame-orange transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onSearchOpen}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-border bg-dark-card/50 text-gray-400 text-sm hover:border-flame/30 hover:text-flame transition-all"
              >
                <Search className="w-4 h-4" />
                <kbd className="hidden lg:inline text-xs px-1.5 py-0.5 rounded bg-dark-border text-gray-500">⌘K</kbd>
              </button>
              <a
                href={RESTAURANT_INFO.phoneLink}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full flame-gradient text-white font-semibold text-sm hover:scale-105 transition-all flame-glow-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">Call Now</span>
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-flame"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl pt-24"
          >
            <div className="flex flex-col items-center gap-5 p-6">
              {/* Mobile Status & Contact */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  openStatus.isOpen 
                    ? 'bg-green-500/15 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{openStatus.status} · {openStatus.nextChange}</span>
                </div>
                <a href={RESTAURANT_INFO.phoneLink} className="flex items-center gap-2 text-flame font-medium">
                  <Phone className="w-4 h-4" />
                  {RESTAURANT_INFO.phone}
                </a>
                <p className="text-gray-500 text-sm text-center">{RESTAURANT_INFO.address.full}</p>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-display font-semibold text-white hover:text-flame transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => { onSearchOpen(); setMobileOpen(false); }}
                className="flex items-center gap-2 text-lg text-gray-400 hover:text-flame"
              >
                <Search className="w-5 h-5" /> Search Menu
              </motion.button>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href={RESTAURANT_INFO.phoneLink}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-8 py-3 rounded-full flame-gradient text-white font-bold text-lg flame-glow"
              >
                <Phone className="w-5 h-5" />
                Call to Order
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
