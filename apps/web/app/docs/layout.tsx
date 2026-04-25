import Link from 'next/link';
import { AlignLeft, Search, Command } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#09090b]">
      <aside className="w-72 fixed inset-y-0 left-0 pt-8 pb-8 px-5 overflow-y-auto border-r border-gray-100 dark:border-gray-800/60 hidden md:flex flex-col bg-[#fdfdfd] dark:bg-[#09090b] z-40 custom-scrollbar">
        
        <div className="flex items-center justify-between mb-8 px-1">
          <Link href="/" className="flex items-center gap-0.5 shrink-0 group">
            <img 
              src="/disapp.svg" 
              alt="d Logo" 
              width={64} 
              height={64} 
              className="transition-opacity group-hover:opacity-80 [image-rendering:pixelated]" 
            />
            <span className="font-extrabold text-3xl leading-tight text-gray-900 dark:text-white tracking-tighter mt-1">isapp.</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="mb-8 px-1">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search wiki..." 
              className="w-full bg-white dark:bg-[#111115] border border-gray-200 dark:border-gray-800 rounded-lg pl-9 pr-14 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-[4px] border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#09090b] px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-400">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-8 text-[14px] px-1">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-[13px]">Getting Started</h4>
            <ul className="space-y-1 flex flex-col border-l border-gray-200 dark:border-gray-800/80 ml-1">
              <li><Link href="/docs" className="block py-1.5 pl-4 -ml-[1px] border-l border-blue-500 text-blue-600 dark:text-blue-400 font-medium">Introduction to Disapp</Link></li>
              <li><Link href="/docs/installation" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Installation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-[13px]">Dive Deeper (Creators)</h4>
            <ul className="space-y-1 flex flex-col border-l border-gray-200 dark:border-gray-800/80 ml-1">
              <li><Link href="/docs/commands" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Advanced Commands</Link></li>
              <li><Link href="/docs/events" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Modules and Events</Link></li>
              <li><Link href="/docs/fluent-api" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Fluent API Management</Link></li>
              <li><Link href="/docs/hot-reload" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Live Hot Reload</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-[13px]">Addons & Infrastructure</h4>
            <ul className="space-y-1 flex flex-col border-l border-gray-200 dark:border-gray-800/80 ml-1">
              <li><Link href="/docs/database" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Database Layer</Link></li>
              <li><Link href="/docs/i18n" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Multi-Language (i18n)</Link></li>
              <li><Link href="/docs/leaderboard" className="block py-1.5 pl-4 -ml-[1px] border-l border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Leaderboard Builder</Link></li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="flex-1 md:ml-72 xl:mr-64 pt-16 pb-24 px-6 md:px-12 w-full">
        <div className="max-w-4xl mx-auto">
          <article className="min-w-0 flex-auto pb-24 lg:pb-16 text-gray-700 dark:text-gray-300 antialiased font-sans transition-colors">
            {children}
          </article>
        </div>
      </main>

      <aside className="hidden xl:block w-64 fixed inset-y-0 right-0 pt-16 px-8 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h5 className="font-semibold text-gray-900 dark:text-white text-[13px] flex items-center gap-2">
            <AlignLeft className="w-4 h-4" /> On this page
          </h5>
          <ul className="space-y-2.5 text-[13px] font-medium text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-800/80">
            <li className="pl-4 border-l border-blue-500 text-blue-600 dark:text-blue-400 -ml-[1px] cursor-pointer">What is Disapp?</li>
            <li className="pl-4 border-l border-transparent hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">Core Concepts</li>
            <li className="pl-4 border-l border-transparent hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">Modules</li>
            <li className="pl-4 border-l border-transparent hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors">Deprecation Guide</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
