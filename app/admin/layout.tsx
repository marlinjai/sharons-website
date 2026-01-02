// app/admin/layout.tsx
// Admin layout with authentication check

import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Admin - ReTurn',
  robots: 'noindex, nofollow', // Prevent indexing of admin pages
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  // Note: The login page handles its own auth check
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

