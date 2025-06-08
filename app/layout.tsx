// app/layout.tsx - Root layout for yoga studio website
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yoga Studio - Discover Balance and Inner Harmony',
  description: 'Transform your mind, body, and soul with our expert yoga instructors. Join classes in Vinyasa Flow, Hatha, Kundalini, Yin, and Power Yoga.',
  keywords: 'yoga, meditation, wellness, fitness, vinyasa, hatha, kundalini, yin yoga, power yoga',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
} 