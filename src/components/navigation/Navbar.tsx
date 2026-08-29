import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, Sparkles, HardDrive, ExternalLink } from 'lucide-react';
import { mainDriveUrl } from '../../data/portfolioData';

interface NavbarProps {
  onOpenHireModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'categories', label: 'GENRES' },
    { id: 'gallery', label: 'EDITS' },
    { id: 'socials', label: 'SOCIALS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'tools', label: 'TOOLS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto w-full max-w-5xl rounded-full px-5 md:px-8 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'glass-nav rim-light shadow-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-surface/50 backdrop-blur-xl border border-white/5 shadow-lg'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-red-glow">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
            </div>
            <span className="font-anton text-xl sm:text-2xl tracking-wider text-white group-hover:text-primary transition-colors">
              PRTHM
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white font-bold' : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-primary/20 border border-primary/50 shadow-red-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Google Drive Link */}
            <a
              href={mainDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-dim hover:bg-primary/20 border border-white/10 hover:border-primary/40 font-mono text-xs text-on-surface-variant hover:text-primary transition-all"
              title="Open Google Drive Archive"
            >
              <HardDrive className="w-3.5 h-3.5 text-primary" />
              <span>DRIVE</span>
            </a>

            <button
              onClick={onOpenHireModal}
              className="relative group overflow-hidden rounded-full bg-primary px-3.5 sm:px-5 py-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-red-glow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 sm:gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CONNECT ME</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-surface border border-white/10 text-white hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-6 sm:px-8 pt-24 pb-8 h-[100dvh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 text-center my-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-anton text-3xl sm:text-4xl tracking-wide uppercase transition-all py-1 ${
                    activeSection === item.id ? 'text-primary' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={mainDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-surface border border-primary/40 text-primary font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <HardDrive className="w-4 h-4" />
                <span>OPEN MASTER GOOGLE DRIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHireModal();
                }}
                className="w-full py-4 rounded-xl bg-primary text-white font-anton text-xl uppercase tracking-wider shadow-red-glow"
              >
                CONNECT WITH ME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
