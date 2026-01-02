// components/admin/WelcomeEmailForm.tsx
// Welcome email configuration form with all customizable fields

'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  read_time: string;
  published: boolean;
}

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

interface WelcomeEmailFormProps {
  // Callback when form data changes (for live preview)
  onDataChange: (data: WelcomeEmailSettings) => void;
  // Initial settings from database
  initialSettings?: WelcomeEmailSettings | null;
}

export default function WelcomeEmailForm({ onDataChange, initialSettings }: WelcomeEmailFormProps) {
  // Form state
  const [subject, setSubject] = useState("Welcome {{name}}! Your ReTurn Newsletter Subscription");
  const [greeting, setGreeting] = useState("Hello {{name}}, and welcome! 👋");
  const [introText, setIntroText] = useState(
    "Thank you for joining our community of seekers and healers. You've just taken a beautiful step toward personal transformation through regression hypnosis."
  );
  const [ctaText, setCtaText] = useState('Have Questions? Reply Here');
  const [ctaUrl, setCtaUrl] = useState('mailto:hello@returnhypnosis.com');
  const [quoteText, setQuoteText] = useState(
    'The curious paradox is that when I accept myself just as I am, then I can change.'
  );
  const [quoteAuthor, setQuoteAuthor] = useState('Carl Rogers');
  const [featuredPostId, setFeaturedPostId] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(true);

  // Posts for featured selection
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Saving state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState('');
  const [testError, setTestError] = useState('');

  // Load posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/admin/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.filter((p: Post) => p.published));
        }
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    }
    loadPosts();
  }, []);

  // Load initial settings
  useEffect(() => {
    if (initialSettings) {
      setSubject(initialSettings.subject || subject);
      setGreeting(initialSettings.greeting || greeting);
      setCtaText(initialSettings.cta_text || ctaText);
      setCtaUrl(initialSettings.cta_url || ctaUrl);
      setQuoteText(initialSettings.quote_text || quoteText);
      setQuoteAuthor(initialSettings.quote_author || quoteAuthor);
      setFeaturedPostId(initialSettings.featured_post_id);
      setEnabled(initialSettings.enabled);

      // Parse body sections to get intro text
      try {
        const sections = JSON.parse(initialSettings.body_sections || '[]');
        const textSection = sections.find((s: { type: string; content?: string }) => s.type === 'text');
        if (textSection?.content) {
          setIntroText(textSection.content);
        }
      } catch {
        // Keep default intro text
      }
    }
  }, [initialSettings]);

  // Notify parent of data changes for preview
  useEffect(() => {
    const settings: WelcomeEmailSettings = {
      subject,
      greeting,
      body_sections: JSON.stringify([{ type: 'text', content: introText }]),
      cta_text: ctaText,
      cta_url: ctaUrl,
      quote_text: quoteText,
      quote_author: quoteAuthor,
      featured_post_id: featuredPostId,
      enabled,
    };
    onDataChange(settings);
  }, [subject, greeting, introText, ctaText, ctaUrl, quoteText, quoteAuthor, featuredPostId, enabled, onDataChange]);

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/email/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'welcome',
          subject,
          greeting,
          body_sections: JSON.stringify([{ type: 'text', content: introText }]),
          cta_text: ctaText,
          cta_url: ctaUrl,
          quote_text: quoteText,
          quote_author: quoteAuthor,
          featured_post_id: featuredPostId,
          enabled,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Send test email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestError('Please enter a valid email address');
      return;
    }

    setSendingTest(true);
    setTestError('');
    setTestSuccess('');

    try {
      const res = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'welcome',
          testEmail,
          name: 'Test User',
          subject,
          featured_post_id: featuredPostId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send test');
      }

      setTestSuccess(`Test email sent to ${testEmail}`);
      setTimeout(() => setTestSuccess(''), 5000);
    } catch (err) {
      setTestError(err instanceof Error ? err.message : 'Failed to send test email');
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enable/Disable Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Welcome Email</h4>
          <p className="text-sm text-gray-500">Automatically send when someone subscribes</p>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-[#A32015]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Subject Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject Line
          <span className="text-gray-400 font-normal ml-2">
            (use {'{{name}}'} for personalization)
          </span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          placeholder="Welcome {{name}}! Your Newsletter Subscription"
        />
      </div>

      {/* Greeting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Greeting
          <span className="text-gray-400 font-normal ml-2">
            (use {'{{name}}'} for personalization)
          </span>
        </label>
        <input
          type="text"
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          placeholder="Hello {{name}}, and welcome!"
        />
      </div>

      {/* Intro Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Introduction Text
        </label>
        <textarea
          value={introText}
          onChange={(e) => setIntroText(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none resize-none"
          placeholder="Welcome message for new subscribers..."
        />
      </div>

      {/* Quote Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quote Text
          </label>
          <textarea
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none resize-none"
            placeholder="An inspiring quote..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quote Author
          </label>
          <input
            type="text"
            value={quoteAuthor}
            onChange={(e) => setQuoteAuthor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="Author name"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CTA Button Text
          </label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="Have Questions? Reply Here"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CTA Button URL
          </label>
          <input
            type="text"
            value={ctaUrl}
            onChange={(e) => setCtaUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="mailto:hello@returnhypnosis.com"
          />
        </div>
      </div>

      {/* Featured Blog Post */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Blog Post (optional)
        </label>
        <select
          value={featuredPostId || ''}
          onChange={(e) => setFeaturedPostId(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          disabled={loadingPosts}
        >
          <option value="">-- No featured post --</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Include a link to your latest or most relevant blog post
        </p>
      </div>

      {/* Test Email Section */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">Send Test Email</h4>
        <div className="flex gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter test email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          />
          <button
            onClick={handleSendTest}
            disabled={sendingTest || !testEmail}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingTest ? 'Sending...' : 'Send Test'}
          </button>
        </div>
        {testSuccess && (
          <p className="mt-2 text-sm text-green-600">{testSuccess}</p>
        )}
        {testError && (
          <p className="mt-2 text-sm text-red-600">{testError}</p>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          {saveSuccess && (
            <span className="text-green-600 text-sm">✓ Settings saved successfully</span>
          )}
          {saveError && (
            <span className="text-red-600 text-sm">{saveError}</span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[#A32015] text-white rounded-lg hover:bg-[#8a1b12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

