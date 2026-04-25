'use client';

import Link from 'next/link';

export function useMDXComponents(components: any) {
  return {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mb-4 mt-8 pb-2 border-b border-gray-200 dark:border-gray-800">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    a: ({ href, children }: any) => (
      <Link
        href={href || '#'}
        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
      >
        {children}
      </Link>
    ),
    code: ({ children, className }: any) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }: any) => (
      <pre className="mb-4 overflow-x-auto">{children}</pre>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="text-gray-700 dark:text-gray-300">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-left text-sm font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-sm">
        {children}
      </td>
    ),
    ...components,
  };
}
