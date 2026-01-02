// app/admin/email-settings/page.tsx
// Email settings management page with tabs for different email types

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailPreview from '@/components/admin/EmailPreview';
import WelcomeEmailForm from '@/components/admin/WelcomeEmailForm';
import OneTimeEmailForm from '@/components/admin/OneTimeEmailForm';

// Tab types
type TabType = 'welcome' | 'one-time';

// Welcome email settings interface
interface WelcomeEmailSettings {
  subject: string;
  greeting: string;
  body_sections: string;
  cta_text: string;
  cta_url: string;
  quote_text: string;
  quote_author: string;
  featured_post_id: number | null;
  enabled: boolean;
}

// One-time email data interface
interface OneTimeEmailData {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  content: string;
}

export default function EmailSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('welcome');

  // Welcome email settings from database
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeEmailSettings | null>(null);

  // Preview data for each tab
  const [welcomePreviewData, setWelcomePreviewData] = useState<WelcomeEmailSettings>({
    subject: '',
    greeting: '',
    body_sections: '[]',
    cta_text: '',
    cta_url: '',
    quote_text: '',
    quote_author: '',
    featured_post_id: null,
    enabled: true,
  });

  const [oneTimePreviewData, setOneTimePreviewData] = useState<OneTimeEmailData>({
    recipientEmail: '',
    recipientName: '',
    subject: '',
    content: '',
  });

  // Check authentication and load settings
  useEffect(() => {
    async function init() {
      try {
        // Check auth
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin');
          return;
        }

        // Load welcome email settings
        const settingsRes = await fetch('/api/admin/email/settings?type=welcome');
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          setWelcomeSettings(settings);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  // Memoized callback for welcome form data changes
  const handleWelcomeDataChange = useCallback((data: WelcomeEmailSettings) => {
    setWelcomePreviewData(data);
  }, []);

  // Memoized callback for one-time form data changes
  const handleOneTimeDataChange = useCallback((data: OneTimeEmailData) => {
    setOneTimePreviewData(data);
  }, []);

  // Get preview data based on active tab
  const getPreviewData = () => {
    switch (activeTab) {
      case 'welcome':
        return {
          name: 'Test User',
          featured_post_id: welcomePreviewData.featured_post_id,
        };
      case 'one-time':
        return {
          recipientName: oneTimePreviewData.recipientName,
          subject: oneTimePreviewData.subject,
          content: oneTimePreviewData.content,
        };
      default:
        return {};
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
            <span className="text-[#A32015] font-medium">Email Settings</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Email Settings</h2>
          <p className="text-gray-600 mt-1">
            Configure email templates and send one-time emails
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('welcome')}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'welcome'
                  ? 'border-b-2 border-[#A32015] text-[#A32015]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Welcome Email
            </button>
            <button
              onClick={() => setActiveTab('one-time')}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'one-time'
                  ? 'border-b-2 border-[#A32015] text-[#A32015]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              One-Time Email
            </button>
          </nav>
        </div>

        {/* Content Grid: Form + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              {activeTab === 'welcome' && (
                <WelcomeEmailForm
                  onDataChange={handleWelcomeDataChange}
                  initialSettings={welcomeSettings}
                />
              )}
              {activeTab === 'one-time' && (
                <OneTimeEmailForm
                  onDataChange={handleOneTimeDataChange}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow overflow-hidden h-[800px]">
            <EmailPreview
              type={activeTab}
              previewData={getPreviewData()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

