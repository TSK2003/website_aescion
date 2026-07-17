'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full bg-primary-50 py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Decorative gradient background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-primary-200/40 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-secondary-200/30 blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-sm text-sm font-medium text-primary-600">
          <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
          Next-Generation Enterprise Platform
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">
          Empowering Business Through <br className="hidden md:block" />
          <span className="text-primary-500">Intelligent Software</span> & AI
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
          Premium enterprise software development, automation, and corporate training. We build scalable technology solutions that drive sustainable growth.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold text-base hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 group"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/services" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-700 rounded-lg font-semibold text-base hover:bg-neutral-50 transition-colors shadow-sm border border-neutral-200 flex items-center justify-center gap-2 group"
          >
            Explore Services
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </Link>
        </div>

      </div>
    </section>
  );
}
