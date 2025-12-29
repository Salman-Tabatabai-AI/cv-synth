import './globals.css'
import { Inter, Roboto, Open_Sans, Merriweather, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-roboto' })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ['latin'], variable: '--font-merriweather' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'CV-Synth',
  description: 'A modern, minimalistic resume builder.',
}

export default function RootLayout({ children }) {
  return (
    // ADD suppressHydrationWarning HERE 👇
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${merriweather.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
