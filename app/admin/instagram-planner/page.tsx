// app/admin/instagram-planner/page.tsx
// Instagram grid planner - drag & drop media onto a visual grid

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InstagramPlanner from '@/components/admin/instagram/InstagramPlanner';

export default function InstagramPlannerPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check auth
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin');
          return;
        }
      } catch (err) {
        router.push('/admin');
        return;
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">ReTurn Admin</h1>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/admin/newsletter"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/admin/email-settings"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Email Settings
            </Link>
            <span className="text-[#A32015] font-medium">Instagram Planner</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Instagram Planner</h2>
          <p className="text-gray-600 mt-1">
            Plan your Instagram grid by dragging media into position
          </p>
        </div>

        <InstagramPlanner />
      </main>
    </div>
  );
}
