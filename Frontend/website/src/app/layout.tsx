import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { ToastContainer } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aescion.com'),
  title: {
    default: 'AESCION | Enterprise Software Engineering',
    template: '%s | AESCION'
  },
  description: 'Enterprise software development, AI solutions, and corporate training.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aescion.com',
    siteName: 'AESCION',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aescion',
  }
};

import { StructuredData } from '@/components/seo/structured-data';
import { Analytics } from '@/components/seo/analytics';
import { CookieConsent } from '@/components/ui/cookie-consent';

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
        <QueryProvider>
          {children}
          <CookieConsent />
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
