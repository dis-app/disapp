'use client';

import { motion } from 'framer-motion';
import { 
  FileCode2, 
  Zap, 
  Globe, 
  Database, 
  LayoutTemplate, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';

const features = [
  {
    title: "Less Code",
    description: "Get rid of repetitive boilerplate code. Focus only on your application's core logic.",
    icon: FileCode2,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Hot Reload",
    description: "Updates instantly the moment you save your code. No more constantly restarting your bot.",
    icon: Zap,
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Built-in i18n",
    description: "Add multi-language support to your bot instantly without any reconfiguration needed.",
    icon: Globe,
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Database Management",
    description: "Manage your ORM and database connections effortlessly. Fully integrated with Prisma or Drizzle.",
    icon: Database,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Components V2 Support",
    description: "Use Discord's next-generation modern UI components (Select, Button, Modal) seamlessly.",
    icon: LayoutTemplate,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Error Handling",
    description: "Your bot never crashes thanks to the built-in error catching architecture (Global Error Handler).",
    icon: ShieldAlert,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Advanced Middleware",
    description: "Filter conditions (admin-only, etc.) with advanced middleware layers before commands execute.",
    icon: Layers,
    colSpan: "md:col-span-2 lg:col-span-2",
  }
];

export function Features() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">

      <div className="absolute top-1/4 left-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/20 via-teal-400/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-200px] w-[700px] h-[700px] bg-gradient-to-tr from-violet-400/20 via-purple-500/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-200">In The Box.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Not just a Discord framework. Everything you need to manage complex systems without thinking twice is ready to go.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.4 }}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.02] ${feature.colSpan} 
                bg-white/40 dark:bg-black/40 
                backdrop-blur-[50px] 
                shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
                border border-white/50 dark:border-white/10
              `}
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 dark:from-white/[0.03] to-transparent opacity-50 rounded-t-[32px] pointer-events-none" />
              
              <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl 
                  bg-white/50 dark:bg-white/10 
                  border border-white/60 dark:border-white/20 
                  shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
                  group-hover:scale-110 transition-transform duration-300 ease-out"
                >
                  <feature.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow text-sm">
                  {feature.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
