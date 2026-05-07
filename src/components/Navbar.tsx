import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-4 backdrop-blur-[20px] bg-bg/80 border-b border-card-border' : 'py-6 bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl tracking-tight relative group">
            <span className="text-white">Lemt.</span>
            <span className="text-electric group-hover:text-cyan transition-colors">dev</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={clsx(
                    'text-[13px] font-medium uppercase tracking-[1px] transition-colors relative py-2',
                    isActive ? 'text-white' : 'text-text-muted hover:text-white'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-electric"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-full border border-card-hover bg-card hover:bg-card-hover text-sm font-medium text-white transition-all hover:border-electric/50 hover:shadow-[0_0_15px_rgba(79,140,255,0.2)]"
            >
              Resume
            </a>
          </nav>

          <button
            className="md:hidden text-text-soft hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-lg flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-text-soft hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-6 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-2xl font-display font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="/assets/resume.pdf"
                className="mt-6 px-8 py-3 rounded-full bg-white text-black font-semibold"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
