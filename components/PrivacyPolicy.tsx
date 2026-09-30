'use client';

import { useState } from 'react';

// components/PrivacyPolicy.tsx - Privacy Policy Modal Component
export default function PrivacyPolicy() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="text-[#707785] hover:text-[#374152] transition-colors duration-200 font-primary"
        aria-label="Open Privacy Policy"
      >
        Privacy Policy
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        >
          <div
            className={`bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-secondary font-semibold text-gray-900">Privacy Policy</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 font-primary text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">About this website</h3>
                <p>ReTurn Hypnosis is a demonstration website and does not currently offer hypnosis services. The website remains publicly accessible as a portfolio example demonstrating website design and functionality.</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Who is responsible</h3>
                <p>Sharon Di Salvo, Scherenbergstraße 22, 10439 Berlin. E-Mail: <a href="mailto:sharondisalvo@icloud.com" className="text-[#c5441f] hover:text-[#A32015] transition-colors duration-200">sharondisalvo@icloud.com</a></p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Hosting, Cloudflare and server logs</h3>
                <p>The website runs on a web server hosted by Hetzner Online GmbH in Germany. All traffic is routed through Cloudflare, Inc. (USA), which delivers the pages and protects the site against attacks.</p>
                <p className="mt-3">When you open a page, technically necessary data is processed automatically: your IP address, date and time of the request, the page requested, browser type and operating system, and the referring page. This is needed to deliver the website and keep it secure (Art. 6(1)(f) GDPR). Log data is only kept for as long as needed for these purposes.</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Demo interactions</h3>
                <p>The booking, contact and newsletter interfaces on this website are demonstration features only. Information entered into these interfaces is not transmitted, stored, analysed or used to create bookings, messages or subscriptions.</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Contacting by e-mail</h3>
                <p>If you write to the e-mail address above, your e-mail address and the content of your message are used only to answer your enquiry and are deleted once they are no longer needed (Art. 6(1)(f) GDPR).</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">No analytics, cookies or maps</h3>
                <p>This website does not use analytics or tracking tools, does not set cookies and does not embed maps (the map shown is an illustration). All fonts are served from this website itself, so no connection to Google Fonts is made. If you like a blog post, this is remembered only in your own browser (local storage); the like counter on the server stores no personal data.</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Transfers to the USA</h3>
                <p>Cloudflare may process data in the USA. Cloudflare is certified under the EU-US Data Privacy Framework, on which such transfers are based (Art. 45 GDPR).</p>
              </div>
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-2">Your rights</h3>
                <p>You have the right to access, rectification, erasure, restriction of processing, data portability and objection. You also have the right to lodge a complaint with a data protection supervisory authority, for example the Berlin Commissioner for Data Protection and Freedom of Information (Berliner Beauftragte für Datenschutz und Informationsfreiheit).</p>
              </div>
              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>
                  <strong>Last updated:</strong> September 2026
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-[#c5441f] text-white px-6 py-2 rounded-full font-primary font-medium hover:bg-[#e15023] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
