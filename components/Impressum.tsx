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
        className="text-[#707785] hover:text-[#374152] transition-colors duration-200 font-primary"
        aria-label="Open Impressum"
      >
        Impressum
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        >
          <div
            className={`bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}
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

            {/* Modal Content - mockup placeholder */}
            <div className="p-6 space-y-4 font-primary text-gray-700 leading-relaxed">
              <h3 className="text-lg font-secondary font-semibold text-gray-900">Angaben gemäß § 5 DDG</h3>
              <p>
                Sharon Di Salvo
                <br />
                Scherenbergstraße 22, 10439 Berlin
                <br />
                E-Mail:{' '}
                <a href="mailto:sharondisalvo@icloud.com" className="text-[#c5441f] hover:text-[#A32015] transition-colors duration-200">
                  sharondisalvo@icloud.com
                </a>
              </p>
              <p>ReTurn Hypnosis is a demonstration project and does not currently offer hypnotherapy services.</p>
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
