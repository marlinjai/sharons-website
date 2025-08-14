// app/(blog)/layout.tsx - Blog layout wrapper (no html/body tags needed)
import type { Metadata } from 'next';
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
    <div className="relative overflow-x-hidden">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
