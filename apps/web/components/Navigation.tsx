'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Roadmap', href: '/roadmap' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/docs')) {
    return null;
  }

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
      >
        <div className={`flex items-center gap-6 px-4 py-2.5 rounded-full border transition-all duration-500 ${
          scrolled 
            ? 'bg-white/20 dark:bg-black/20 backdrop-blur-[40px] border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
            : 'bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-white/20 dark:border-white/5 shadow-lg'
        }`}>
          
          <Link href="/" className="pl-3 pr-2 flex items-center group relative">
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white transition-all transform group-hover:scale-105" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              disapp.
            </span>
          </Link>

          <div className="flex items-center bg-white/30 dark:bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)] border border-white/20 dark:border-white/5 rounded-full p-1 relative">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-semibold transition-colors"
                >
                  <span className={`relative z-10 drop-shadow-sm ${
                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="capsule"
                      className="absolute inset-0 bg-white/60 dark:bg-white/10 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/40 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pr-1">
            <Link href="https://github.com/dis-app/disapp" target="_blank">
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/5 shadow-sm hover:bg-white/60 dark:hover:bg-white/20 transition-all text-gray-800 dark:text-gray-200 relative group overflow-hidden">
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform drop-shadow-md" />
              </button>
            </Link>
          </div>

        </div>
      </motion.header>

      <header className={`lg:hidden fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-white/30 dark:bg-black/30 backdrop-blur-[40px] border-b border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Link href="/" className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white drop-shadow-sm">
            disapp.
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 text-gray-700 dark:text-gray-300 active:scale-95 transition-transform drop-shadow-md"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-[50px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border-b border-white/30 dark:border-white/10"
            >
              <div className="px-4 pb-8 space-y-2 pt-2">
                {navigationItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={item.name}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-[20px] px-6 py-4 text-lg font-bold transition-all border ${
                          isActive
                            ? 'bg-white/60 dark:bg-white/10 border-white/40 dark:border-white/20 text-gray-900 dark:text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]'
                            : 'bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navigationItems.length * 0.1 }}
                  className="pt-4 mt-4 border-t border-white/30 dark:border-white/10"
                >
                  <Link 
                    href="https://github.com/dis-app/disapp" 
                    target="_blank"
                    className="flex items-center justify-center gap-3 rounded-[20px] px-6 py-4 text-lg font-bold text-gray-900 dark:text-white border border-white/40 dark:border-white/20 bg-white/50 dark:bg-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:scale-[0.98] transition-all"
                  >
                    <Github className="h-5 w-5" />
                    View on GitHub
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
