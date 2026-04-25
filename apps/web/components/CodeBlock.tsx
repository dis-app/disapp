'use client';

import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-one-dark.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  const language = className?.replace('language-', '') || 'typescript';

  return (
    <pre className="not-prose overflow-x-auto bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
      <code
        ref={codeRef}
        className={`language-${language} text-sm`}
      >
        {children}
      </code>
    </pre>
  );
}
