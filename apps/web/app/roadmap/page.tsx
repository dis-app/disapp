'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  CircleDashed, 
  Zap, 
  Component, 
  Globe, 
  Database, 
  Terminal, 
  BookOpen, 
  Rocket, 
  Plug, 
  ShieldCheck, 
  Wrench,
  Server,
  Code
} from 'lucide-react';

const ROADMAP_DATA = [
  {
    version: "Version 0.1.0",
    title: "Core Features & Testing",
    quarter: "Completed",
    goal: "All core features implemented with comprehensive test coverage.",
    colorTheme: {
      text: "text-green-600 dark:text-green-400",
      border: "border-green-400 dark:border-green-500",
      bg: "bg-green-500",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.6)]"
    },
    milestones: [
      {
        id: "v0.0.1",
        name: "Core Architecture",
        status: "completed",
        time: "Completed",
        icon: <Component className="w-5 h-5 drop-shadow-md" />,
        tasks: [
           { text: "DisappClient with config-based initialization", done: true },
           { text: "Automatic command loading from directory", done: true },
           { text: "Automatic event loading from directory", done: true },
           { text: "Hot reload in development mode", done: true },
           { text: "Basic error handling", done: true },
           { text: "TypeScript support", done: true },
        ],
        deliverables: ["Working DisappClient", "Command/Event auto-loading", "Basic example bot"]
      },
      {
        id: "v0.1.0",
        name: "Comprehensive Testing",
        status: "completed",
        time: "Completed",
        icon: <CheckCircle2 className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "301 automated tests passing (100% success rate)", done: true },
          { text: "26 test files covering all core features", done: true },
          { text: "65%+ overall test coverage (exceeded 50% target)", done: true },
          { text: "Database integration tests (Supabase)", done: true },
          { text: "All repositories tested (User, Guild, Stats, Voice)", done: true },
          { text: "Components V2 tests (100% coverage)", done: true },
          { text: "i18n system tests (100% coverage)", done: true },
          { text: "Middleware tests (100% coverage)", done: true },
        ],
        deliverables: ["301 tests passing", "65%+ coverage", "All features tested", "Database migrations ready"]
      },
    ]
  },
  {
    version: "Version 0.2.0 - 0.3.0",
    title: "Documentation & Examples",
    quarter: "Q2 2026 (Weeks 1-4)",
    goal: "Complete documentation and multiple example bots.",
    colorTheme: {
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-400 dark:border-blue-500",
      bg: "bg-blue-500",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.6)]"
    },
    milestones: [
      {
        id: "v0.2.0",
        name: "Complete Documentation",
        status: "current",
        time: "Week 1-2",
        icon: <BookOpen className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Complete API documentation", done: false },
          { text: "Migration guide from vanilla Discord.js", done: false },
          { text: "Troubleshooting guide", done: false },
          { text: "Document all 8 middlewares with examples", done: false },
          { text: "Database setup guide", done: false },
          { text: "Testing utilities documentation", done: false },
        ],
        deliverables: ["Complete API reference", "Migration guide", "All features documented"]
      },
      {
        id: "v0.3.0",
        name: "Example Bots & Tutorials",
        status: "planned",
        time: "Week 3-4",
        icon: <Code className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Moderation bot (ban, kick, mute, warn)", done: false },
          { text: "Ticket system bot", done: false },
          { text: "Leveling/XP system bot", done: false },
          { text: "Custom commands bot", done: false },
          { text: "Poll/voting bot", done: false },
          { text: "Video tutorials (optional)", done: false },
        ],
        deliverables: ["6 example bots total", "Video tutorials", "Interactive examples"]
      },
    ]
  },
  {
    version: "Version 0.4.0 - 0.9.0",
    title: "Polish & Beta Testing",
    quarter: "Q2 2026 (Weeks 5-8)",
    goal: "Performance optimization and community beta testing.",
    colorTheme: {
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-400 dark:border-indigo-500",
      bg: "bg-indigo-500",
      glow: "shadow-[0_0_15px_rgba(99,102,241,0.6)]"
    },
    milestones: [
      {
        id: "v0.4.0-v0.5.0",
        name: "Performance & Optimization",
        status: "planned",
        time: "Week 5-6",
        icon: <Zap className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Performance optimization", done: false },
          { text: "Memory leak detection", done: false },
          { text: "Bundle size optimization", done: false },
          { text: "Improve startup time", done: false },
          { text: "Add performance benchmarks", done: false },
          { text: "Set up CI/CD pipeline", done: false },
        ],
        deliverables: ["Performance benchmarks", "CI/CD pipeline", "Optimized bundle"]
      },
      {
        id: "v0.6.0-v0.9.0",
        name: "Beta Testing",
        status: "planned",
        time: "Week 7-8",
        icon: <ShieldCheck className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Beta testing with community", done: false },
          { text: "Gather feedback", done: false },
          { text: "Fix reported bugs", done: false },
          { text: "Security audit", done: false },
          { text: "Final performance tuning", done: false },
        ],
        deliverables: ["Zero critical bugs", "Security audit complete", "Beta feedback addressed"]
      },
    ]
  },
  {
    version: "Version 1.0",
    title: "Stable Release",
    quarter: "Q2 2026 (Week 9-12)",
    goal: "Production-ready stable release with npm publication.",
    colorTheme: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-400 dark:border-purple-500",
      bg: "bg-purple-500",
      glow: "shadow-[0_0_15px_rgba(168,85,247,0.6)]"
    },
    milestones: [
      {
        id: "v1.0.0-rc.1",
        name: "Release Candidate 1",
        status: "planned",
        time: "Week 9-10",
        icon: <Rocket className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Final bug fixes", done: false },
          { text: "Complete all documentation", done: false },
          { text: "Performance tuning", done: false },
          { text: "Final security review", done: false },
        ],
        deliverables: ["Zero critical bugs", "Complete documentation", "Performance benchmarks"]
      },
      {
        id: "v1.0.0-rc.2",
        name: "Release Candidate 2",
        status: "planned",
        time: "Week 11",
        icon: <Terminal className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Address RC.1 feedback", done: false },
          { text: "Prepare changelog", done: false },
          { text: "Prepare release notes", done: false },
          { text: "Set up npm package", done: false },
        ],
        deliverables: ["Changelog", "Release notes", "npm package ready"]
      },
      {
        id: "v1.0.0",
        name: "Stable Release",
        status: "planned",
        time: "Week 12",
        icon: <Rocket className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Publish to npm", done: false },
          { text: "Create GitHub release", done: false },
          { text: "Announce on Discord/Twitter/Reddit", done: false },
          { text: "Create Discord community server", done: false },
        ],
        deliverables: ["Published to npm", "100+ GitHub stars", "Community server live"]
      }
    ]
  },
  {
    version: "Version 1.x",
    title: "Stability & Growth",
    quarter: "Q3 2026",
    goal: "Expanding via plugins and advanced middleware.",
    colorTheme: {
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-400 dark:border-emerald-500",
      bg: "bg-emerald-500",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.6)]"
    },
    milestones: [
      {
        id: "v1.1.0",
        name: "Plugin System",
        status: "planned",
        time: "Month 4",
        icon: <Plug className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Plugin API design & loader", done: false },
          { text: "Plugin lifecycle hooks & config", done: false },
          { text: "Official plugins (Logging, Metrics)", done: false },
        ],
        deliverables: ["5+ official plugins", "Plugin documentation", "Plugin marketplace setup"]
      },
      {
        id: "v1.2.0",
        name: "Advanced Features",
        status: "planned",
        time: "Month 5",
        icon: <ShieldCheck className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Middleware system enhancements", done: false },
          { text: "Command guards (permissions, cooldowns)", done: false },
          { text: "Dependency injection container", done: false },
        ],
        deliverables: ["Guard system working", "Middleware examples"]
      },
      {
        id: "v1.3.0",
        name: "Developer Tools",
        status: "planned",
        time: "Month 6",
        icon: <Wrench className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Debug mode improvements", done: false },
          { text: "Performance profiler", done: false },
          { text: "VS Code extension (syntax highlighting)", done: false },
        ],
        deliverables: ["VS Code extension published", "Testing utilities documented"]
      }
    ]
  },
  {
    version: "Version 2.0 & 3.0",
    title: "Ecosystem & Enterprise Scale",
    quarter: "Q4 2026 - 2027",
    goal: "Clustering, Sharding, and AI Command Generation.",
    colorTheme: {
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-400 dark:border-orange-500",
      bg: "bg-orange-500",
      glow: "shadow-[0_0_15px_rgba(249,115,22,0.6)]"
    },
    milestones: [
      {
        id: "v2.0 / v3.0",
        name: "Enterprise Scalability",
        status: "planned",
        time: "Month 7-12",
        icon: <Server className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "Clustering & Sharding integration", done: false },
          { text: "Redis integration & In-memory caching", done: false },
          { text: "Multi-tenancy support & RBAC", done: false },
        ],
        deliverables: ["Clustering working", "Redis enabled", "Audit logs complete"]
      },
      {
        id: "v4.0 / v5.0",
        name: "AI & Cross Platform",
        status: "planned",
        time: "2027",
        icon: <Code className="w-5 h-5 drop-shadow-md" />,
        tasks: [
          { text: "AI command generation", done: false },
          { text: "Natural language command parsing", done: false },
          { text: "Telegram & Slack platform bridges", done: false },
        ],
        deliverables: ["AI parsing engine", "Telegram support"]
      }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24 relative overflow-hidden">
        
        <div className="absolute top-[-100px] right-[-200px] w-[700px] h-[700px] bg-gradient-to-br from-blue-500/20 via-indigo-400/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 left-[-200px] w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/20 via-teal-500/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-100px] w-[650px] h-[650px] bg-gradient-to-bl from-purple-400/20 via-violet-500/20 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Disapp Framework <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">Roadmap</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed mb-8">
              Our transparent trajectory for building the ultimate modern Discord framework. Every milestone is measurable and strictly mapped.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-[50px] border border-gray-300/50 dark:border-white/10 text-gray-800 dark:text-gray-200 text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                Current: v0.1.0 (Tested & Ready)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 dark:bg-green-500/30 backdrop-blur-[50px] border border-green-400/30 dark:border-green-400/20 text-green-800 dark:text-green-300 text-sm font-semibold shadow-[0_4px_12px_rgba(34,197,94,0.15)] dark:shadow-[0_4px_12px_rgba(34,197,94,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <CheckCircle2 className="w-4 h-4" />
                65%+ Test Coverage
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-[50px] border border-blue-400/30 dark:border-blue-400/20 text-blue-800 dark:text-blue-300 text-sm font-semibold shadow-[0_4px_12px_rgba(59,130,246,0.15)] dark:shadow-[0_4px_12px_rgba(59,130,246,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                Target: v1.0.0 (Week 12)
              </span>
            </div>
          </motion.div>

          <div className="space-y-28">
            {ROADMAP_DATA.map((phase) => (
              <div key={phase.version}>
                
                <div className="mb-12 pb-4 border-b border-gray-300/50 dark:border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                      {phase.version} - {phase.title}
                      {phase.quarter === "Completed" && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                      )}
                    </h2>
                    <span className={`text-sm font-semibold ${phase.colorTheme.text}`}>{phase.quarter}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-base">{phase.goal}</p>
                </div>

                <div className="relative pl-6 md:pl-10 space-y-16">
                  
                  <div className="absolute top-4 bottom-0 left-[-1px] border-l-2 border-gray-300 dark:border-gray-800" />

                  {phase.milestones.map((milestone, mIndex) => {
                    const isCurrent = milestone.status === 'current';

                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        key={milestone.id}
                        className="relative"
                      >
                        <div className="absolute -left-[32px] md:-left-[48px] top-6">
                          <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-500 ${
                            milestone.status === 'completed'
                              ? 'bg-green-500 border-green-400 dark:border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]'
                              : isCurrent 
                              ? `${phase.colorTheme.bg} ${phase.colorTheme.border} ${phase.colorTheme.glow}` 
                              : 'bg-gray-200 dark:bg-black border-gray-400 dark:border-gray-600 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                          }`} />
                        </div>

                        <div className={`relative p-8 md:p-10 rounded-3xl overflow-hidden transition-all duration-300 border ${
                          milestone.status === 'completed'
                            ? 'border-green-400/50 dark:border-green-500/30 bg-green-50/60 dark:bg-green-950/30 backdrop-blur-[50px] shadow-[0_8px_32px_rgba(34,197,94,0.1)] dark:shadow-[0_8px_32px_rgba(34,197,94,0.2)]'
                            : isCurrent 
                            ? `border-white/80 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-[50px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]` 
                            : 'border-white/60 dark:border-white/5 bg-white/40 dark:bg-black/30 backdrop-blur-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        }`}>
                          
                          <div className={`absolute top-0 inset-x-0 h-1/3 pointer-events-none rounded-t-3xl ${isCurrent ? 'bg-gradient-to-b from-white/30 dark:from-white/5 to-transparent' : 'bg-gradient-to-b from-white/20 dark:from-white/5 to-transparent'}`} />

                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-gray-200/50 dark:border-gray-800/50 pb-6">
                              <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/10 border border-white/60 dark:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ${isCurrent ? phase.colorTheme.text : 'text-gray-500 dark:text-gray-400'}`}>
                                  {milestone.icon}
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {milestone.name}
                                  </h3>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                                    Target: {milestone.time}
                                  </div>
                                </div>
                              </div>

                              {milestone.status === 'completed' && (
                                <div className="shrink-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/50 dark:bg-green-500/20 backdrop-blur-[50px] border border-white/50 dark:border-green-400/20 shadow-[0_4px_12px_rgba(34,197,94,0.15)] dark:shadow-[0_4px_12px_rgba(34,197,94,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completed
                                </div>
                              )}
                              {isCurrent && (
                                <div className="shrink-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-500/20 backdrop-blur-[50px] border border-white/50 dark:border-blue-400/20 shadow-[0_4px_12px_rgba(59,130,246,0.15)] dark:shadow-[0_4px_12px_rgba(59,130,246,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">
                                  <div className={`w-2 h-2 rounded-full ${phase.colorTheme.bg} animate-pulse`} />
                                  In Progress
                                </div>
                              )}
                            </div>

                            <div className="space-y-4 mb-8">
                              {milestone.tasks.map((task: any, i: number) => (
                                <div key={i} className="flex items-start gap-3 group/task">
                                  <div className="shrink-0 mt-0.5">
                                    {task.done ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <CircleDashed className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                                    )}
                                  </div>
                                  <span className={`text-sm leading-snug transition-colors ${task.done ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-500'}`}>
                                    {task.text}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {(milestone.deliverables && milestone.deliverables.length > 0) && (
                              <div className="pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                                <div className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-4">Key Deliverables</div>
                                <div className="flex flex-wrap gap-2.5">
                                  {milestone.deliverables.map((dl: string, d: number) => (
                                    <span key={d} className="px-4 py-2 bg-white/40 dark:bg-black/30 backdrop-blur-[50px] border border-white/60 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-lg text-sm text-gray-800 dark:text-gray-300 font-semibold hover:bg-white/60 dark:hover:bg-black/50 transition-colors cursor-default">
                                      {dl}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
