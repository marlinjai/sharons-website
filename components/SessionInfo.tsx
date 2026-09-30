// components/SessionInfo.tsx - Session information and pricing details component

'use client';

export default function SessionInfo() {
  return (
    <div className="w-[--mobile-content-max-width] lg:w-[--content-max-width] flex flex-col items-center justify-center gap-4 mb-8">
      {/* CTA Button styled like Book a Session */}
      <button
        className="inline-block bg-btn-primary-bg text-btn-primary-text px-6 py-3 rounded-full text-lg font-primary font-medium shadow-lg transition-colors duration-200 hover:bg-btn-primary-bg-hover hover:text-btn-primary-text-hover"
      >
        Investment & Session Info
      </button>
    </div>
  );
}
