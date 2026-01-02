// components/admin/OneTimeEmailForm.tsx
// Form for composing and sending one-time emails to specific recipients

'use client';

import { useState, useEffect } from 'react';

interface OneTimeEmailData {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  content: string;
}

interface OneTimeEmailFormProps {
  // Callback when form data changes (for live preview)
  onDataChange: (data: OneTimeEmailData) => void;
}

export default function OneTimeEmailForm({ onDataChange }: OneTimeEmailFormProps) {
  // Form state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  // Sending state
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState('');
  const [sendError, setSendError] = useState('');

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState('');
  const [testError, setTestError] = useState('');

  // Notify parent of data changes for preview
  useEffect(() => {
    onDataChange({
      recipientEmail,
      recipientName,
      subject,
      content,
    });
  }, [recipientEmail, recipientName, subject, content, onDataChange]);

  // Send test email
  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestError('Please enter a valid test email address');
      return;
    }

    if (!subject.trim()) {
      setTestError('Please enter a subject line');
      return;
    }

    if (!content.trim()) {
      setTestError('Please enter email content');
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
          type: 'one-time',
          testEmail,
          recipientName: recipientName || 'Friend',
          subject,
          content,
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

  // Send actual email
  const handleSend = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setSendError('Please enter a valid recipient email');
      return;
    }

    if (!subject.trim()) {
      setSendError('Please enter a subject line');
      return;
    }

    if (!content.trim()) {
      setSendError('Please enter email content');
      return;
    }

    setSending(true);
    setSendError('');
    setSendSuccess('');

    try {
      const res = await fetch('/api/admin/email/send-one', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          subject,
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send email');
      }

      setSendSuccess(`Email sent successfully to ${recipientEmail}`);

      // Clear form after successful send
      setRecipientEmail('');
      setRecipientName('');
      setSubject('');
      setContent('');

      setTimeout(() => setSendSuccess(''), 5000);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  // Clear form
  const handleClear = () => {
    setRecipientEmail('');
    setRecipientName('');
    setSubject('');
    setContent('');
    setSendError('');
    setSendSuccess('');
    setTestError('');
    setTestSuccess('');
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>One-Time Email:</strong> Send a personalized email to a specific recipient.
          This won't be added to any newsletter list.
        </p>
      </div>

      {/* Recipient Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Email *
          </label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="recipient@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Name (optional)
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Subject Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject Line *
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          placeholder="Your email subject..."
        />
      </div>

      {/* Email Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Content *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none resize-none"
          placeholder="Write your email content here..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Plain text only. Line breaks will be preserved.
        </p>
      </div>

      {/* Test Email Section */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">Send Test Email First</h4>
        <div className="flex gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter your test email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
          />
          <button
            onClick={handleSendTest}
            disabled={sendingTest || !testEmail || !subject || !content}
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

      {/* Status Messages */}
      {sendSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{sendSuccess}</p>
        </div>
      )}
      {sendError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{sendError}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear Form
        </button>
        <button
          onClick={handleSend}
          disabled={sending || !recipientEmail || !subject || !content}
          className="px-6 py-3 bg-[#A32015] text-white rounded-lg hover:bg-[#8a1b12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? 'Sending...' : 'Send Email'}
        </button>
      </div>

      {/* Warning */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Always send a test email first to verify formatting.
          Once sent, emails cannot be recalled.
        </p>
      </div>
    </div>
  );
}

