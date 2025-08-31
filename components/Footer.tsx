'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PrivacyPolicy from './PrivacyPolicy';
import Impressum from './Impressum';
import { Accordion, AccordionItem } from './ui/Accordion';

// components/Footer.tsx - Footer component
export default function Footer() {
  const pathname = usePathname();

  // Determine if we're on the home page
  const isHomePage = pathname === '/';
  const homeLink = isHomePage ? '#home' : '/?scrollToHome=true';

  return (
    <footer className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-12 lg:px-16 flex flex-col justify-center gap-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row justify-between">
          {/* Logo & Description */}
          <div className="flex flex-col">
            <Link href={homeLink} className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white border-border-accent border-2 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-8 w-auto" />
                </div>
                <div className="font-secondary text-3xl font-semibold text-text-primary hover:text-brand-primary-light transition-colors duration-200">
                  ReTurn
                </div>
              </div>
            </Link>
            <p className="text-text-gray-light max-w-md font-primary leading-relaxed">
              Regression Hypnosis: the Adventure
              <br />
              of a Lifetime for the Curious, the Bold,
              <br className="block lg:hidden" /> and the Ready.
            </p>
          </div>
          {/* Links */}
          <div className="flex flex-row gap-16">
            {/* Menu Links */}
            <div className="flex flex-col">
              <h3 className="font-secondary font-semibold text-text-gray-light mb-4">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/#the-session"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    Sessions
                  </a>
                </li>
                <li>
                  <a
                    href="/#about"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/#reviews"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col">
              <h3 className="font-secondary font-semibold text-text-gray-light mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <PrivacyPolicy />
                </li>
                <li>
                  <Impressum />
                </li>
              </ul>
            </div>

            {/* Utility Links */}
            <div className="flex flex-col">
              <h3 className="font-secondary font-semibold text-text-gray-light mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Layout with Accordion */}
        <div className="md:hidden">
          {/* Logo & Description - Always visible on mobile */}
          <div className="mb-8">
            <Link href={homeLink} className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white border-border-accent border-2 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img src="/graphics/logo_return.svg" alt="ReTurn Logo" className="h-8 w-auto" />
                </div>
                <div className="font-secondary text-3xl font-semibold text-text-primary hover:text-brand-primary-light transition-colors duration-200">
                  ReTurn
                </div>
              </div>
            </Link>
            <p className="text-text-gray-light font-primary leading-relaxed">
              Regression Hypnosis: the Adventure
              <br />
              of a Lifetime for the Curious, the Bold,
              <br className="block lg:hidden" /> and the Ready.
            </p>
          </div>

          {/* Accordion for mobile links */}
          <Accordion>
            <AccordionItem title="Menu" titleColor="text-text-gray-light" arrowColor="text-text-gray-light">
              <ul className="space-y-3">
                <li>
                  <a
                    href="/#the-session"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    Sessions
                  </a>
                </li>
                <li>
                  <a
                    href="/#about"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/#reviews"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Legal" titleColor="text-text-gray-light" arrowColor="text-text-gray-light">
              <ul className="space-y-3">
                <li>
                  <PrivacyPolicy />
                </li>
                <li>
                  <Impressum />
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Resources" titleColor="text-text-gray-light" arrowColor="text-text-gray-light">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-text-gray-light hover:text-text-gray transition-colors duration-200 font-primary block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-text-gray-light mb-2 font-primary">© Copyright 2025 ReTurn Regression Hypnosis</p>
          <p className="text-text-gray-light text-sm font-primary">Designed with love by <a href="https://www.linkedin.com/in/marlin-pohl/" className="text-text-primary hover:text-brand-primary-light transition-colors duration-200 font-primary">Marlin Jai Pohl</a></p>
        </div>
      </div>
    </footer>
  );
}
