import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, Public_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shreerambakers.com'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700', '800', '900'],
})
const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shree Ram Bakers | Handcrafted Artisan Bakery',
    template: '%s | Shree Ram Bakers',
  },
  description: 'Fresh sourdough, buttery croissants, celebration cakes, and custom orders. Handcrafted with patience, served with warmth in Chandigarh.',
  keywords: ['bakery', 'sourdough', 'croissant', 'celebration cakes', 'custom cakes', 'artisan bread', 'Chandigarh'],
  authors: [{ name: 'Shree Ram Bakers' }],
  creator: 'Shree Ram Bakers',
  publisher: 'Shree Ram Bakers',
  robots: 'index, follow',
  icons: {
    icon: '/images/shree-ram-bakers-logo.png',
    apple: '/images/shree-ram-bakers-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shreerambakers.com',
    siteName: 'Shree Ram Bakers',
    title: 'Shree Ram Bakers | Handcrafted Artisan Bakery',
    description: 'Fresh sourdough, buttery croissants, celebration cakes, and custom orders. Handcrafted with patience, served with warmth.',
    images: [
      {
        url: '/images/hero-bakery.png',
        width: 1200,
        height: 630,
        alt: 'Shree Ram Bakers - Artisan Bakery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Ram Bakers | Handcrafted Artisan Bakery',
    description: 'Fresh sourdough, buttery croissants, celebration cakes, and custom orders.',
    images: ['/images/hero-bakery.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#3A2E23',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVars = `${fraunces.variable} ${publicSans.variable}`

  return (
    <html lang="en" className={fontVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${fontVars} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-jam text-white rounded"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
