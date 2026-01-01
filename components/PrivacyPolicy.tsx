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
            className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}
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
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Data Controller</h3>
                <p className="mb-4">
                  Sharon Di Salvo
                  <br />
                  Sole proprietor
                  <br />
                  Praxis am Zionskirchplatz
                  <br />
                  10-11, 10117 Berlin
                  <br />
                  Germany
                  <br />
                  Email: hello@returnhypnosis.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">
                  Types of Personal Data We Collect
                </h3>
                <p className="mb-4">We may collect the following types of personal data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact details (e.g., email, phone number)</li>
                  <li>Appointment details and preferences</li>
                  <li>Communication history and correspondence</li>
                  <li>Newsletter preferences (if subscribed)</li>
                  <li>Any personal insights voluntarily shared during session inquiries or bookings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Legal Basis for Processing</h3>
                <p className="mb-4">
                  We process your data in accordance with Article 6(1)(a), (b), and (f) of the GDPR:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To fulfill our contract with you (e.g. booked sessions)</li>
                  <li>With your consent (e.g. newsletter)</li>
                  <li>Based on our legitimate interest in providing and improving our services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Third-Party Services</h3>
                <p className="mb-4">We may share limited data with third-party service providers who assist us in:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Scheduling sessions (Cal.com)</li>
                  <li>Sending newsletters (MailerLite)</li>
                  <li>Hosting our website and contact forms (Render)</li>
                </ul>
                <p className="mt-4">
                  These providers process data solely on our behalf and under data processing agreements in compliance
                  with the GDPR.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Data Retention</h3>
                <p>
                  We retain your personal data only as long as necessary for the purposes set out in this policy, or as
                  required by tax, legal, or regulatory obligations. Session-related information is kept for up to 10
                  years unless deletion is requested earlier, subject to legal requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Your Data Protection Rights</h3>
                <p className="mb-4">Under the GDPR, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Withdraw consent at any time (where consent is the legal basis)</li>
                  <li>Receive your data in a portable format (data portability)</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">
                  International Data Transfers
                </h3>
                <p>
                  Some of our service providers are located outside the EU (e.g., in the USA). In such cases, we ensure
                  appropriate safeguards are in place under GDPR, such as Standard Contractual Clauses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Supervisory Authority</h3>
                <p className="mb-4">
                  If you believe your data protection rights have been violated, you may lodge a complaint with your
                  local supervisory authority. In Germany, this is the:
                </p>
                <p>
                  Berliner Beauftragte für Datenschutz und Informationsfreiheit
                  <br />
                  <a
                    href="https://www.datenschutz-berlin.de"
                    className="text-[#C5441E] hover:text-[rgb(245,124,0)] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.datenschutz-berlin.de
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Cookies and Tracking</h3>
                <p>We do not use cookies or third-party tracking tools on this website.</p>
              </div>

              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>
                  <strong>Last updated:</strong> January 2026
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
