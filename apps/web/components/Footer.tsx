'use client';

import Link from 'next/link';
import { Github, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 border-t border-gray-200/50 dark:border-white/5">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          <div className="flex flex-col gap-8 max-w-md w-full">
            <div>
              <Link href="/" className="inline-flex items-center gap-1 group">
                <img 
                  src="/disapp.svg" 
                  alt="d Logo" 
                  width={64} 
                  height={64} 
                  className="transition-opacity group-hover:opacity-80" 
                />
                <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-opacity group-hover:opacity-80 mt-1">
                  isapp.
                </span>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                The perfect glass architecture that makes Discord bot development modern, fast, and error-free for everyone.
              </p>
            </div>

            <Link 
              href="https://discord.gg/dqArfzANGp" 
              target="_blank"
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] 
                bg-white/40 dark:bg-black/30 backdrop-blur-xl 
                border border-white/50 dark:border-white/10 
                shadow-sm"
            >
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 dark:from-white/5 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center z-10 relative">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Online Community</span>
                  </div>
                  <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Join Discord</h4>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/10 flex items-center justify-center shadow-sm group-hover:bg-white dark:group-hover:bg-white/20 transition-colors">
                  <ArrowUpRight className="h-5 w-5 text-gray-900 dark:text-white" />
                </div>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto mt-4 lg:mt-0">
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide mb-6">
                Product
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/docs" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://discord.js.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Discord.js
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/developers/docs" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Discord API
                  </a>
                </li>
                <li>
                  <a href="https://www.npmjs.com/package/@disapp/core" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    NPM Package
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 border-t border-gray-200 dark:border-white/10 pt-8 relative">

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Disapp Framework. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              <Link 
                href="https://github.com/dis-app/disapp" 
                target="_blank"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full text-gray-700 dark:text-gray-300 transition-all hover:scale-110 active:scale-95
                bg-white/40 dark:bg-black/30 backdrop-blur-xl 
                border border-white/50 dark:border-white/10 
                shadow-sm
                hover:bg-white/60 dark:hover:bg-white/10"
              >
                <Github className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </Link>
              <Link 
                href="https://discord.gg/dqArfzANGp" 
                target="_blank"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full text-gray-700 dark:text-gray-300 transition-all hover:scale-110 active:scale-95
                bg-white/40 dark:bg-black/30 backdrop-blur-xl 
                border border-white/50 dark:border-white/10 
                shadow-sm
                hover:bg-white/60 dark:hover:bg-white/10"
              >
                <img 
                  src="/discord-logo.svg" 
                  alt="Discord" 
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
