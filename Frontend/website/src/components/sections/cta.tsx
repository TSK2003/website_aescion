import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-primary-500 rounded-3xl overflow-hidden relative shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 px-6 py-20 md:py-24 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to Accelerate Your <br className="hidden md:block"/>Digital Transformation?
            </h2>
            <p className="text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl">
              Partner with AESCION to architect, build, and scale your next big initiative. Let's discuss your technical requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-base hover:bg-neutral-50 transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 border border-primary-400 text-white rounded-lg font-semibold text-base hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
