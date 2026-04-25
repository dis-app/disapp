'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Terminal, Shield, Zap, Cloud } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">

      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-100px] w-[700px] h-[700px] bg-gradient-to-tr from-purple-400/20 via-indigo-500/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105
            bg-white/40 dark:bg-black/30 backdrop-blur-[50px] 
            border border-white/50 dark:border-white/10 
            shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
          ">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Disapp Core Beta Now Live
            </span>
            <div className="h-5 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1" />
            <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
              Explore &rarr;
            </span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.15] max-w-4xl"
        >
          Build Discord Bots{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            Without Limits
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-normal leading-relaxed"
        >
          A completely streamlined architecture for modern Discord.js development. Say goodbye to complex boilerplate; say hello to a type-safe, clean, and powerful experience.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <Link href="/docs" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-gray-900 dark:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3
              bg-white/60 dark:bg-white/10 
              backdrop-blur-[50px] 
              border border-white/80 dark:border-white/20
              shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
              hover:bg-white/80 dark:hover:bg-white/20"
            >
              Get Started
              <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link href="https://github.com/dis-app/disapp" target="_blank" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105
              text-blue-900 dark:text-blue-100
              bg-blue-500/20 dark:bg-blue-500/20 
              backdrop-blur-[50px] 
              border border-blue-400/50 dark:border-blue-400/20
              shadow-[0_8px_32px_rgba(59,130,246,0.15)] dark:shadow-[0_8px_32px_rgba(59,130,246,0.3)]
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
              hover:bg-blue-500/30 dark:hover:bg-blue-500/30"
            >
              <Terminal className="w-5 h-5" />
              npm create disapp
            </button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { icon: Shield, text: "Fully Type-Safe", color: "text-emerald-600 dark:text-emerald-400" },
            { icon: Zap, text: "Hot Reloadable", color: "text-amber-600 dark:text-amber-400" },
            { icon: Cloud, text: "Cloud Ready", color: "text-blue-600 dark:text-blue-400" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full 
              bg-white/30 dark:bg-black/30 backdrop-blur-[50px] 
              border border-white/50 dark:border-white/10 
              shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
