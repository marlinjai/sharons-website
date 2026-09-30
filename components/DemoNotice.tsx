// components/DemoNotice.tsx - Feedback shown after a demo form/booking; nothing is submitted or stored

export const CONTACT_EMAIL = 'sharondisalvo@icloud.com';

export default function DemoNotice({ className = '', subject = 'This form' }: { className?: string; subject?: string }) {
  return (
    <div role="status" className={`p-4 bg-[#f8f7f4] border border-[#fcd8b3] rounded-lg text-center font-primary text-text-gray ${className}`}>
      <p className="font-medium text-[#944923]">Demo complete — no data was submitted or stored.</p>
      <p className="mt-1">{subject} is part of the website mockup.</p>
      <p className="mt-1">
        For website enquiries, contact:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c5441f] hover:text-[#A32015] transition-colors duration-200">
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
