import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SURF Diagnóstico Familiar',
  description:
    'Descubre qué está pasando en la relación con tu adolescente. Responde el diagnóstico inicial y recibe una primera ruta para reconectar.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans bg-white">{children}</body>
    </html>
  )
}
