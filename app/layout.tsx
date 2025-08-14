// app/layout.tsx - Root layout (only used by route groups that don't have their own html/body)
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReTurn Hypnosis - Regression Hypnosis & Personal Transformation',
  description: 'Transform your life through regression hypnosis with certified practitioner Sharon Di Salvo. Discover healing, clarity, and personal transformation.',
  keywords: 'regression hypnosis, hypnotherapy, personal transformation, healing, past life regression, Sharon Di Salvo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className="font-sans bg-black text-gray-900 overflow-x-hidden min-w-0 min-h-screen">
        {children}
      </body>
    </html>
  )
}
