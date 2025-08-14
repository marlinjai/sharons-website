// app/(blog)/layout.tsx - Blog layout that replaces root layout
import type { Metadata } from 'next';
import '../globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ReTurn Blog - Regression Hypnosis Insights',
  description:
    "Explore deep insights into regression hypnosis, personal transformation, and healing through Sharon Di Salvo's expert articles and client stories.",
  keywords:
    'regression hypnosis, past life regression, hypnotherapy, personal transformation, healing, Sharon Di Salvo, blog',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className="font-sans bg-black text-gray-900 overflow-x-hidden">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
