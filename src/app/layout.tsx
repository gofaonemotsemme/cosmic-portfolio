import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk' 
})

export const metadata: Metadata = {
  title: 'Lesedi Motsemme | Cosmic Developer',
  description: 'Lead Frontend Developer crafting Web3 experiences with a cosmic twist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900`}>
        {children}
      </body>
    </html>
  )
}