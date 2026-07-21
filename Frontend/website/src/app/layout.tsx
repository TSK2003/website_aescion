import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { ToastContainer } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aescion.com'),
  title: {
    default: 'AESCION | Enterprise Software Engineering & AI Solutions',
    template: '%s | AESCION'
  },
  description: 'AESCION delivers premium enterprise software development, scalable cloud architecture, custom AI solutions, and elite corporate technology training for global organizations.',
  keywords: ['enterprise software', 'software development', 'AI solutions', 'cloud architecture', 'corporate training', 'Next.js', 'React', 'AWS'],
  authors: [{ name: 'AESCION Engineering' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aescion.com',
    siteName: 'AESCION',
    title: 'AESCION | Enterprise Software Engineering',
    description: 'Premium enterprise software development, AI solutions, and corporate training.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'AESCION Enterprise Engineering',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aescion',
    creator: '@aescion',
    images: ['/opengraph-image.png']
  }
};

import { StructuredData } from '@/components/seo/structured-data';
import { Analytics } from '@/components/seo/analytics';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { FloatingWhatsApp } from '@/components/ui/floating-whatsapp';
import { StickyCallButton } from '@/components/ui/sticky-call';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    name: 'AESCION',
    url: 'https://aescion.com',
    logo: 'https://aescion.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/aescion-edtech/',
      'https://www.instagram.com/aescion_edtech_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      'https://www.facebook.com/profile.php?id=61585357586915'
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Analytics />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-neutral-900 selection:bg-primary-500/30 flex flex-col min-h-screen`}>
        <StructuredData type="Organization" data={orgSchema} />
        <StructuredData type="WebSite" data={{
          name: 'AESCION EDTECH SOLUTIONS',
          url: 'https://aescion.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://aescion.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }} />
        <QueryProvider>
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <CookieConsent />
          <FloatingWhatsApp />
          <StickyCallButton />
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
