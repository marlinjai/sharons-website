'use client';

import { useState } from 'react';

// components/Impressum.tsx - Impressum Modal Component
export default function Impressum() {
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
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-primary"
      >
        Impressum
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        >
          <div
            className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-secondary font-semibold text-gray-900">Impressum</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 font-primary text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Service Provider</h3>
                <p className="mb-4">
                  Sharon Di Salvo
                  <br />
                  Sole proprietor - Einzelunternehmerin
                  <br />
                  ReTurn Regression Hypnosis
                  <br />
                  Praxis am Zionskirchplatz
                  <br />
                  10-11, 10117 Berlin
                  <br />
                  Germany
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Contact Information</h3>
                <p className="mb-4">
                  <strong>Email:</strong> hello@returnhypnosis.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Professional Information</h3>
                <p className="mb-4">
                  <strong>Profession:</strong> Regression Hypnosis Practitioner
                  <br />
                  <strong>Services:</strong> Regression Hypnosis Sessions
                  <br />
                  <strong>Languages:</strong> English, Italian
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h3>
                <p className="mb-4">Not applicable under § 19 UStG (Kleinunternehmerregelung)</p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">
                  Responsible for content according to § 55 Abs. 2 RStV
                </h3>
                <p className="mb-4">
                  Sharon Di Salvo
                  <br />
                  Praxis am Zionskirchplatz 10-11, 10117 Berlin
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Online Dispute Resolution</h3>
                <p className="mb-4">
                  The European Commission provides a platform for online dispute resolution:
                  <br />
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    className="text-[#C5441E] hover:text-[rgb(245,124,0)] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  <br />
                  We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer
                  arbitration board.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Disclaimer</h3>
                <p className="mb-4">
                  The information provided on this website is for educational and informational purposes only.
                  Regression hypnosis is not a substitute for professional medical or psychological treatment. Results
                  may vary and are not guaranteed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-secondary font-semibold text-gray-900 mb-3">Copyright</h3>
                <p className="mb-4">
                  All content on this website, including text, images, and design elements, is protected by copyright
                  law. Reproduction or distribution without permission is prohibited.
                </p>
              </div>

              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>
                  <strong>Last updated:</strong> August 2025
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-[#C5441E] text-white px-6 py-2 rounded-full font-primary font-medium hover:bg-[rgb(245,124,0)] transition-colors duration-200"
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
