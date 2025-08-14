'use client';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export default function Booking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '5-hrs' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#c5441e',
            'cal-bg-emphasis': '#fcd8b3',
            'cal-brand-text': '#ffffff',
            'cal-bg': '#ffffff',
            'cal-bg-muted': '#f8f7f4',
            'cal-text': '#374151',
            'cal-text-emphasis': '#944923',
          },
          dark: {},
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="h-full min-h-screen flex flex-col justify-center items-center bg-white">
      <Cal
        namespace="5-hrs"
        calLink="sharondisalvo/5-hrs"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{
          layout: 'month_view',
          theme: 'light',
          hideBranding: 'true',
        }}
      />

      <div className="h-16 w-48 bg-white -mt-16 z-50"></div>
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Booking is done through Cal.com</p>
        <p>You will receive an email with the booking details</p>
        <p>
          You will receive a recording of your session, so you can revisit it anytime and continue uncovering insights
        </p>
      </div>
    </div>
  );
}
