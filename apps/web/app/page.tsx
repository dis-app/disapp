import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CodeComparison } from '@/components/landing/CodeComparison';
import { CTA } from '@/components/landing/CTA';
import { Syne } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });

export default function Home() {
  return (
    <main className={`relative min-h-screen overflow-hidden bg-[#fafafa] dark:bg-[#030303] selection:bg-blue-500 selection:text-white ${syne.className}`}>
      <Hero />
      <CodeComparison />
      <Features />
      <CTA />
    </main>
  );
}
