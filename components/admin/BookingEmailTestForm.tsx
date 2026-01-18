// components/admin/BookingEmailTestForm.tsx
// Form for testing Cal.com booking emails with mock data

'use client';

import { useState, useEffect } from 'react';

type BookingEmailType = 'booking-confirmation' | 'booking-cancelled' | 'booking-rescheduled';

interface BookingEmailTestFormProps {
  // Callback when preview type or data changes
  onPreviewChange: (type: BookingEmailType, clientName: string) => void;
}

export default function BookingEmailTestForm({ onPreviewChange }: BookingEmailTestFormProps) {
  // Form state
  const [testEmail, setTestEmail] = useState('');
  const [clientName, setClientName] = useState('Test Client');
  const [previewType, setPreviewType] = useState<BookingEmailType>('booking-confirmation');

  // Sending state for each button
  const [sendingConfirmation, setSendingConfirmation] = useState(false);
  const [sendingCancelled, setSendingCancelled] = useState(false);
  const [sendingRescheduled, setSendingRescheduled] = useState(false);

  // Status messages
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Notify parent of preview type/data changes
  useEffect(() => {
    onPreviewChange(previewType, clientName);
  }, [previewType, clientName, onPreviewChange]);

  // Send test email
  const handleSendTest = async (type: BookingEmailType) => {
    if (!testEmail || !testEmail.includes('@')) {
      setError('Please enter a valid test email address');
      return;
    }

    // Set loading state for the specific button
    if (type === 'booking-confirmation') setSendingConfirmation(true);
    else if (type === 'booking-cancelled') setSendingCancelled(true);
    else if (type === 'booking-rescheduled') setSendingRescheduled(true);

    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          testEmail,
          clientName: clientName || 'Test Client',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send test email');
      }

      const typeLabel = type.replace('booking-', '').replace('-', ' ');
      setSuccess(`${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)} email sent to ${testEmail}`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send test email');
    } finally {
      setSendingConfirmation(false);
      setSendingCancelled(false);
      setSendingRescheduled(false);
    }
  };

  // Get mock booking details for display
  const getMockBookingDetails = () => {
    const sessionDate = new Date();
    sessionDate.setDate(sessionDate.getDate() + 7);
    sessionDate.setHours(14, 0, 0, 0);

    return {
      session: '5-hrs Regression Session',
      dateTime: sessionDate.toLocaleString('en-US', {
        timeZone: 'Europe/Berlin',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      duration: '5 hours',
      location: 'Zoom Video Call',
      timezone: 'Europe/Berlin',
    };
  };

  const mockDetails = getMockBookingDetails();

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Booking Emails:</strong> Test the Cal.com booking notification emails
          with mock booking data. These are the same templates used when clients book,
          cancel, or reschedule sessions.
        </p>
      </div>

      {/* Test Email Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Email Address *
          </label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Name (for personalization)
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
            placeholder="Test Client"
          />
        </div>
      </div>

      {/* Preview Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview Email Type
        </label>
        <select
          value={previewType}
          onChange={(e) => setPreviewType(e.target.value as BookingEmailType)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32015] focus:border-transparent outline-none"
        >
          <option value="booking-confirmation">Booking Confirmation</option>
          <option value="booking-cancelled">Booking Cancelled</option>
          <option value="booking-rescheduled">Booking Rescheduled</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Select which email to preview on the right
        </p>
      </div>

      {/* Mock Booking Details */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Mock Booking Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Session:</span>
            <span className="ml-2 text-gray-900">{mockDetails.session}</span>
          </div>
          <div>
            <span className="text-gray-500">Duration:</span>
            <span className="ml-2 text-gray-900">{mockDetails.duration}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-500">Date & Time:</span>
            <span className="ml-2 text-gray-900">{mockDetails.dateTime}</span>
          </div>
          <div>
            <span className="text-gray-500">Location:</span>
            <span className="ml-2 text-gray-900">{mockDetails.location}</span>
          </div>
          <div>
            <span className="text-gray-500">Timezone:</span>
            <span className="ml-2 text-gray-900">{mockDetails.timezone}</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{success}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Send Buttons */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Send Test Emails</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleSendTest('booking-confirmation')}
            disabled={sendingConfirmation || !testEmail}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingConfirmation ? 'Sending...' : 'Send Confirmation'}
          </button>
          <button
            onClick={() => handleSendTest('booking-cancelled')}
            disabled={sendingCancelled || !testEmail}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingCancelled ? 'Sending...' : 'Send Cancellation'}
          </button>
          <button
            onClick={() => handleSendTest('booking-rescheduled')}
            disabled={sendingRescheduled || !testEmail}
            className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendingRescheduled ? 'Sending...' : 'Send Rescheduled'}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Click any button to send that type of booking email to your test address
        </p>
      </div>

      {/* Info */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> These test emails use mock booking data. In production,
          the actual booking details from Cal.com webhooks will be used.
        </p>
      </div>
    </div>
  );
}
