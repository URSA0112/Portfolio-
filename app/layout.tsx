import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ClientRoot from '@/components/ClientRoot'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'URSA0112 | Full Stack Developer',
  description: 'Full Stack Developer — building fast, beautiful, and purposeful digital experiences with React, Next.js, Swift, and more.',
  keywords: ['developer', 'portfolio', 'full stack', 'react', 'next.js', 'swift', 'typescript', 'node.js'],
  authors: [{ name: 'URSA0112' }],
  openGraph: {
    title: 'URSA0112 | Full Stack Developer Portfolio',
    description: 'Full Stack Developer — building fast, beautiful, and purposeful digital experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URSA0112 | Full Stack Developer',
    description: 'Full Stack Developer Portfolio — React, Next.js, Swift, Node.js',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased bg-[#06060f] text-slate-100 overflow-x-hidden`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}
