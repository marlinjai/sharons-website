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
      <body className="font-sans bg-black text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
} 
{
  "title": "Aggiorna header del sito yoga",
  "description": "Modificare l'header nel layout root (`app/layout.tsx` e/o il componente header) come segue:\n\n- Il logo rimane a sinistra, ma va evidenziato con un cerchio bianco/crema attorno.\n- Allineare tutte le voci della navbar a destra, accanto al pulsante CTA.\n- Cambiare le voci della navbar:\n  - 'services' → 'home'\n  - 'reviews' → 'the session'\n  - 'blog' → 'newsletter'\n  - 'about' e 'contact' restano uguali\n- Il bottone CTA (call-to-action) deve cambiare colore al passaggio del mouse (hover): usare `rgb(245, 124, 0)` oppure `hsl(30, 100%, 48%)`.",
  "component": "Header/Navbar",
  "priority": "High",
  "status": "To Do"
}
