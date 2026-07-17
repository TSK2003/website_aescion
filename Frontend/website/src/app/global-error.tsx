'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8 mx-auto">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">Something went wrong</h1>
          <p className="text-neutral-500 max-w-md mx-auto mb-12 text-lg">
            We apologize for the inconvenience. An unexpected error occurred while processing your request. Our engineers have been notified.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <Home className="w-5 h-5" /> Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
