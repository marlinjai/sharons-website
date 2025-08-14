// app/(main)/layout.tsx - Layout for main website pages
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
