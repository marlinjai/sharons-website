/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        yoga: {
          sand: '#f5f3f0',
          earth: '#8b7355',
          sage: '#9caf88',
          ocean: '#7fb3d3',
        }
      },
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
} 
// components/Header.tsx
'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo con cerchio */}
      <div className="bg-[#fff8f0] rounded-full p-2">
        <img src="/logo.svg" alt="Yoga Studio Logo" className="h-10 w-10" />
      </div>

      {/* Navbar + CTA */}
      <nav className="flex items-center space-x-6">
        <Link href="/">home</Link>
        <Link href="/the-session">the session</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
        <Link href="/newsletter">newsletter</Link>
        <a
          href="/book"
          className="ml-4 px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-[rgb(245,124,0)] transition-colors"
        >
          Book Now
        </a>
      </nav>
    </header>
  )
}
