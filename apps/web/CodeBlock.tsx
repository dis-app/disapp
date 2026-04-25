'use client';

import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { Copy, Sparkles, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  const language = className?.replace('language-', '') || 'typescript';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full group my-8 bg-[#09090b] border border-gray-800/80 rounded-[12px] shadow-sm">
      
      <div className="absolute right-3 top-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-800/60"
          title="Kopyala"
        >
          {copied ? <Check className="w-[18px] h-[18px] text-green-400" /> : <Copy className="w-[18px] h-[18px]" />}
        </button>
      </div>

      <pre 
        className="not-prose m-0 p-5 pt-5 overflow-x-auto text-[14px] leading-[1.6] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
        style={{ background: 'transparent', margin: 0 }}
      >
        <code
          ref={codeRef}
          className={`language-${language} font-mono block min-w-full`}
          style={{ background: 'transparent', textShadow: 'none', padding: 0 }}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
