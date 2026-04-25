'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Code2, Zap, Database, Flame, FileText } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Documentation', href: '/docs', icon: BookOpen, section: true },
  { name: 'Getting Started', href: '/docs/getting-started', icon: Zap, indent: true },
  { name: 'Installation', href: '/docs/installation', icon: Code2, indent: true },
  { name: 'Quick Start', href: '/docs/quick-start', icon: Flame, indent: true },
  { name: 'Guides', href: '/docs/guides', icon: FileText, section: true },
  { name: 'Commands', href: '/docs/commands', indent: true },
  { name: 'Events', href: '/docs/events', indent: true },
  { name: 'Fluent API', href: '/docs/fluent-api', indent: true },
  { name: 'Components', href: '/docs/components', indent: true },
  { name: 'Hot Reload', href: '/docs/hot-reload', indent: true },
  { name: 'Database', href: '/docs/database', icon: Database, indent: true },
  { name: 'API Reference', href: '/docs/api', section: true },
  { name: 'DisappClient', href: '/docs/api/client', indent: true },
  { name: 'Command', href: '/docs/api/command', indent: true },
  { name: 'MessageBuilder', href: '/docs/api/message-builder', indent: true },
  { name: 'Shortcuts', href: '/docs/api/shortcuts', indent: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <nav className="flex-1 overflow-y-auto p-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${item.indent ? 'pl-6' : ''}
                  ${item.section ? 'mt-6 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold' : ''}
                  ${isActive && !item.section
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : !item.section
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : ''
                  }
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
