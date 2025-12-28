import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV-Synth',
  description: 'A modern, minimalistic resume builder.',
}

export default function RootLayout({ children }) {
  return (
    // ADD suppressHydrationWarning HERE 👇
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
