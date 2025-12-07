import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Parallel Drive - Creative Technology for Thinking Machines',
  description: 'Software engineering lab redefining how products are built in the AI age. R&D, open-source frameworks, and software engineering as a service.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
