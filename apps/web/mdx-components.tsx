import Link from 'next/link';
import { CodeBlock } from './CodeBlock';
import { AlertCircle, Lightbulb, CheckCircle2, Flame, Hash, User, Search, Download, Upload, ChevronRight } from 'lucide-react';

const slugify = (text: any) => {
  if (typeof text !== 'string') return '';
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const iconMap: any = {
  user: <User className="w-6 h-6" />,
  search: <Search className="w-6 h-6" />,
  download: <Download className="w-6 h-6" />,
  upload: <Upload className="w-6 h-6" />,
};

export function useMDXComponents(components: any) {
  return {
    Callout: ({ title, children, type = 'info' }: any) => {
      const types = {
        info: { color: 'text-blue-500', bg: 'bg-[#0f172a]/50', border: 'border-blue-500/30', icon: Lightbulb },
        warning: { color: 'text-amber-500', bg: 'bg-amber-950/30', border: 'border-amber-500/30', icon: AlertCircle },
        success: { color: 'text-emerald-500', bg: 'bg-[#051f16]/80', border: 'border-emerald-500/30', icon: Lightbulb },
        danger: { color: 'text-red-500', bg: 'bg-red-950/30', border: 'border-red-500/30', icon: Flame },
      };
      const style = types[type as keyof typeof types] || types.info;
      const Icon = style.icon;
      return (
        <div className={`my-8 border rounded-xl p-5 shadow-sm ${style.bg} ${style.border}`}>
          <div className="flex gap-4">
            <div className={`mt-0.5 ${style.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-light text-[15px] leading-relaxed text-gray-300 [&>p]:mb-0 [&>p]:mt-0 w-full">
              {children}
            </div>
          </div>
        </div>
      );
    },

    Steps: ({ children }: any) => (
      <div className="border-l border-gray-200 dark:border-gray-800 ml-4 pl-10 space-y-12 my-12 relative">
        {children}
      </div>
    ),
    Step: ({ title, children, stepNumber }: any) => (
      <div className="relative">
        <div className="absolute -left-[58px] top-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border flex items-center justify-center text-[13px] font-bold text-gray-900 dark:text-gray-300">
          {stepNumber}
        </div>
        <h3 className="text-[19px] font-bold text-gray-900 dark:text-white mb-4 -mt-1">{title}</h3>
        <div className="text-gray-600 dark:text-gray-400 font-normal leading-relaxed text-[16px] [&>p]:mb-4">
          {children}
        </div>
      </div>
    ),

    CardGroup: ({ children }: any) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {children}
      </div>
    ),
    Card: ({ title, icon, children, href }: any) => {
      const content = (
        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800/80 dark:bg-[#0c0c0c] hover:bg-gray-50 dark:hover:bg-[#111111] p-6 transition-all duration-300 group">
          {icon && (
            <div className="mb-4 text-blue-500">
              {iconMap[icon] || <span className="text-2xl">{icon}</span>}
            </div>
          )}
          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{title}</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-normal m-0 leading-relaxed">
            {children}
          </p>
        </div>
      );
      return href ? <Link href={href} className="block no-underline">{content}</Link> : content;
    },

    AccordionGroup: ({ children }: any) => (
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden my-8">
        {children}
      </div>
    ),
    Accordion: ({ title, children }: any) => (
      <details className="group border-b border-gray-200 dark:border-gray-800 last:border-none">
        <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 font-semibold text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#111] transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-400 transition group-open:rotate-90" />
          {title}
        </summary>
        <div className="px-5 pb-5 pt-2 text-[15px] font-normal leading-relaxed text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-[#0a0a0a]">
          {children}
        </div>
      </details>
    ),

    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 dark:text-white mb-6 mt-2 leading-[1.1]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => {
      const id = slugify(children);
      return (
        <h2 id={id} className="group relative text-2xl sm:text-[28px] font-bold tracking-tight text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-32">
          {children}
          <a href={`#${id}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block text-gray-400 hover:text-blue-500">
            <Hash className="w-5 h-5" />
          </a>
        </h2>
      )
    },
    h3: ({ children }: any) => {
      const id = slugify(children);
      return (
        <h3 id={id} className="group relative text-[20px] font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-4 scroll-mt-32">
          {children}
          <a href={`#${id}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block text-gray-400 hover:text-blue-500">
            <Hash className="w-4 h-4" />
          </a>
        </h3>
      )
    },
    h4: ({ children }: any) => (
      <h4 className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="leading-[1.7] text-[16px] text-gray-700 dark:text-gray-300/90 mb-5 font-normal">
        {children}
      </p>
    ),
    a: ({ href, children }: any) => {
      const isInternal = href && href.startsWith('/');
      return (
        <Link
          href={href || '#'}
          target={isInternal ? '_self' : '_blank'}
          className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </Link>
      );
    },
    pre: ({ children }: any) => {
      const codeProps = children?.props || {};
      const className = codeProps.className || 'language-text';
      const codeContent = codeProps.children || children;
      return <CodeBlock className={className}>{codeContent}</CodeBlock>;
    },
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-300 px-1.5 py-0.5 rounded-[4px] text-[13.5px] font-mono break-words">
        {children}
      </code>
    ),
    ul: ({ children }: any) => (
      <ul className="list-none list-inside space-y-3 mb-6">
        {children}
      </ul>
    ),
    li: ({ children }: any) => (
      <li className="relative pl-6 leading-[1.7] text-[16px] text-gray-700 dark:text-gray-300/90 before:content-[''] before:absolute before:left-2 before:top-[12px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
        {children}
      </li>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-8">
        <table className="w-full text-left border-collapse border-b border-gray-200 dark:border-gray-800">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="py-4 px-2 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white text-[15px]">
        {children}
      </th>
    ),
    tr: ({ children }: any) => (
      <tr className="[&>td:first-child]:font-bold [&>td:first-child]:text-gray-900 [&>td:first-child]:dark:text-white border-b border-gray-100 dark:border-gray-800/60 last:border-0 hover:bg-gray-50/50 dark:hover:bg-[#111111]/50 transition-colors">
        {children}
      </tr>
    ),
    td: ({ children }: any) => (
      <td className="py-4 px-2 text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed align-top">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-12 border-t border-gray-200 dark:border-gray-800" />
    ),
    ...components,
  };
}
