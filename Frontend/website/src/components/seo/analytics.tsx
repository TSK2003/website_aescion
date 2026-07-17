'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export function Analytics() {
  const [consent, setConsent] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    // Check initial consent
    const stored = localStorage.getItem('aescion-cookie-consent');
    if (stored) {
      setConsent(JSON.parse(stored));
    }

    // Listen for updates from the CookieConsent component
    const handleConsentUpdate = (e: CustomEvent) => {
      setConsent(e.detail);
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate as EventListener);
    return () => window.removeEventListener('cookie-consent-updated', handleConsentUpdate as EventListener);
  }, []);

  // Use environment variables for real IDs
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Google Analytics - Only load if analytics consent is granted */}
      {consent.analytics && GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity - Only load if analytics consent is granted */}
      {consent.analytics && CLARITY_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
}
