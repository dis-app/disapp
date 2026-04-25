'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Code2, CheckCircle2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';

const TABS = [
  {
    id: "disapp",
    label: "Disapp Core",
    language: "typescript",
    icon: <Zap className="w-4 h-4 text-blue-500 dark:text-blue-400 group-hover:text-blue-400 transition-colors drop-shadow-sm" />,
    code: `import { Command } from '@disapp/core';

export default class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Replies with Pong!'
    });
  }

  async execute(interaction) {
    await interaction.reply('Pong! 🏓');
  }
}`
  },
  {
    id: "vanilla",
    label: "Vanilla Discord.js",
    language: "javascript",
    icon: <Terminal className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors drop-shadow-sm" />,
    code: `const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};

+ 25 lines of independent deployment loop required`
  }
];

export function CodeComparison() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [highlightedCode, setHighlightedCode] = useState<Record<string, string>>({});
  const activeContent = TABS.find((t) => t.id === activeTab);

  useEffect(() => {
    const highlighted: Record<string, string> = {};
    TABS.forEach((tab) => {
      highlighted[tab.id] = Prism.highlight(
        tab.code,
        Prism.languages[tab.language],
        tab.language
      );
    });
    setHighlightedCode(highlighted);
  }, []);

  return (
    <section className="relative py-28 sm:py-36 px-4">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[700px] pointer-events-none opacity-50 select-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent dark:from-cyan-600/30 dark:via-blue-600/20 blur-[130px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400/30 via-purple-400/20 to-transparent dark:from-indigo-600/30 dark:via-purple-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm font-semibold mb-6 shadow-sm backdrop-blur-md">
            <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Object-Oriented Engine
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Write Less.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              Ship Faster.
            </span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Disapp eliminates the tedious Slash Command deployment overhead. With pure Class-based structure, parameters synchronize directly on boot. No separate REST API scripts required.
          </p>
          
          <div className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-normal border-b border-gray-200 dark:border-gray-800/60 pb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Automatically maps parameters to API.
            </div>
            <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-normal border-b border-gray-200 dark:border-gray-800/60 pb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Native Middleware hooks (Cooldowns, Auth).
            </div>
            <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-normal">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Strongly typed constructor bounds.
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-[600px] xl:w-[680px] shrink-0"
        >
          <div className="rounded-[32px] border border-white/50 dark:border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_48px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-white/40 dark:bg-black/40 backdrop-blur-[60px] overflow-hidden flex flex-col relative group transition-transform duration-500 hover:scale-[1.01]">
            
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 dark:from-white/[0.03] to-transparent pointer-events-none z-0" />

            <div className="h-14 bg-white/20 dark:bg-white/5 border-b border-white/30 dark:border-white/10 flex items-center px-6 relative z-20 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 dark:bg-red-500 border border-black/10 dark:border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 dark:bg-yellow-500 border border-black/10 dark:border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 dark:bg-green-500 border border-black/10 dark:border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
              </div>
              
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/30 dark:bg-black/30 p-1 rounded-xl border border-white/30 dark:border-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-1.5 text-xs font-bold tracking-wide flex items-center gap-2 rounded-lg transition-all z-10 ${
                      activeTab === tab.id 
                        ? 'text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="tabMarker"
                        className="absolute inset-0 bg-white/70 dark:bg-white/10 rounded-lg border border-white/50 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                      {tab.icon}
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-x-auto min-h-[400px] text-[13px] sm:text-[14px] font-mono leading-[1.7] relative z-10">
              <AnimatePresence mode="wait">
                {activeContent && highlightedCode[activeTab] && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <pre className="!bg-transparent !p-0 !m-0">
                      <code 
                        className={`language-${activeContent.language} !text-[13px] sm:!text-[14px]`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode[activeTab] }}
                      />
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
