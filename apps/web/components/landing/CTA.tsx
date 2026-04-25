'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Terminal } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] pointer-events-none opacity-50 select-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 via-emerald-400/20 to-transparent dark:from-blue-600/30 dark:via-emerald-600/20 blur-[130px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-400/30 via-fuchsia-400/20 to-transparent dark:from-purple-600/30 dark:via-fuchsia-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.3 }}
          className="relative rounded-[40px] overflow-hidden p-12 sm:p-20 text-center 
            bg-white/40 dark:bg-black/40 
            backdrop-blur-[60px] 
            border border-white/50 dark:border-white/10 
            shadow-[0_16px_64px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_64px_rgba(0,0,0,0.5)]
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] pointer-events-none" />
          
          <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent pointer-events-none rounded-t-[40px]" />

          <div className="relative z-10 flex flex-col items-center">
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[24px] 
                bg-white/50 dark:bg-white/10 
                border border-white/60 dark:border-white/20 
                shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400 drop-shadow-md" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Ready to build your next big Discord bot?
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Reduce weeks of infrastructure preparation to just a few minutes. Start coding your bot today with Disapp's powerful and type-safe architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/docs">
                <button className="group px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105
                  bg-blue-600/90 dark:bg-blue-500/90 text-white
                  backdrop-blur-md 
                  border border-blue-400/50 dark:border-blue-300/30
                  shadow-lg hover:shadow-xl">
                  Browse Documentation
                </button>
              </Link>
              
              <Link href="https://github.com/dis-app/disapp" target="_blank">
                <button className="px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105
                  text-gray-900 dark:text-white
                  bg-white/40 dark:bg-black/40 
                  backdrop-blur-xl 
                  border border-white/60 dark:border-white/10
                  shadow-sm
                  hover:bg-white/60 dark:hover:bg-white/10">
                  <Terminal className="w-5 h-5" />
                  npm create disapp
                </button>
              </Link>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
