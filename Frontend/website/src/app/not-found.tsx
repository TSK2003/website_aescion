import React from 'react';
import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-8 mx-auto">
        <Search className="w-10 h-10" />
      </div>
      <h1 className="text-6xl md:text-8xl font-black text-neutral-900 mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-700 mb-6">Page not found</h2>
      <p className="text-neutral-500 max-w-md mx-auto mb-12 text-lg">
        The page you are looking for doesn't exist or has been moved. Check the URL or navigate back to the homepage.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
          <Home className="w-5 h-5" /> Return Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Go Back
        </button>
      </div>
    </div>
  );
}
