// components/DemoBookingModal.tsx - Mock booking calendar (demo only, no connection to Cal.com, nothing is submitted or stored)
'use client';

import { useEffect, useState } from 'react';
import DemoNotice from './DemoNotice';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMES = ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm'];

// Demo availability: Tuesday to Saturday, from today onwards
function isAvailable(date: Date, today: Date) {
  const day = date.getDay();
  return date >= today && day !== 0 && day !== 1;
}

export default function DemoBookingModal({ onClose }: { onClose: () => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leadingBlanks = month.getDay();
  const isCurrentMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
  const monthName = month.toLocaleString('en-US', { month: 'long' });

  const changeMonth = (delta: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));
    setSelected(null);
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Demo booking calendar"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto font-primary text-[#374151] animate-slideIn"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {done ? (
          <div className="p-8 sm:p-16 max-w-xl mx-auto">
            <DemoNotice subject="This booking calendar" />
            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="bg-[#c5441f] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e15023] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr]">
            {/* Event details */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#fcd8b3] text-[#944923] flex items-center justify-center font-semibold">S</div>
              <p className="mt-3 text-gray-500">Sharon</p>
              <h2 className="text-2xl font-semibold text-[#374151] mt-1">Demo Session</h2>
              <p className="mt-2 text-gray-600">Example booking flow for this website mockup.</p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2} /><path d="M12 7v5l3 2" strokeWidth={2} strokeLinecap="round" /></svg>
                  5h
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" strokeWidth={2} /><circle cx="12" cy="9.5" r="2.5" strokeWidth={2} /></svg>
                  Musterstraße 1, 10115 Berlin
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2} /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" strokeWidth={2} /></svg>
                  Europe/Berlin
                </li>
              </ul>
            </div>

            {/* Calendar */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <p className="text-lg">
                  <span className="font-semibold text-[#944923]">{monthName}</span>{' '}
                  <span className="text-gray-500">{month.getFullYear()}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeMonth(-1)}
                    disabled={isCurrentMonth}
                    aria-label="Previous month"
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium tracking-wider text-[#944923] mb-2">
                {WEEKDAYS.map(d => <div key={d}>{d.toUpperCase()}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: leadingBlanks }).map((_, i) => <div key={`blank-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
                  const available = isAvailable(date, today);
                  const isSelected = selected?.getTime() === date.getTime();
                  return (
                    <button
                      key={i}
                      disabled={!available}
                      onClick={() => setSelected(date)}
                      className={`aspect-square rounded-md text-sm transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#c5441f] text-white font-semibold'
                          : available
                            ? 'bg-[#fcd8b3]/60 text-[#944923] font-medium hover:bg-[#fcd8b3]'
                            : 'text-gray-300 cursor-default'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="p-6 md:p-8">
              {selected ? (
                <>
                  <p className="text-lg mb-4">
                    <span className="font-semibold text-[#944923]">{selected.toLocaleString('en-US', { weekday: 'short' })}</span>{' '}
                    <span className="text-gray-500">{selected.getDate()}</span>
                  </p>
                  <div className="space-y-2">
                    {TIMES.map(t => (
                      <button
                        key={t}
                        onClick={() => setDone(true)}
                        className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-md hover:border-[#c5441f] hover:text-[#c5441f] transition-colors duration-150"
                      >
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm md:mt-12 text-center">Select a date to see available times.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
