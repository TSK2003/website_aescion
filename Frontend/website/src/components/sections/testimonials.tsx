'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Testimonials() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current && !widgetRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = "https://cdn.trustindex.io/loader.js?c242a8b772b810593f86aab8538";
      script.defer = true;
      script.async = true;
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 bg-primary-50 text-neutral-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/50 via-transparent to-transparent opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-200 text-primary-700 font-semibold text-sm mb-6 shadow-sm">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-xl text-primary-900/80 leading-relaxed">
            Don't just take our word for it. Hear from the technology leaders who trust AESCION.
          </p>
        </motion.div>

        {/* Live Trustindex Google Reviews Widget */}
        <div className="w-full min-h-[200px] flex justify-center">
          <div ref={widgetRef} className="w-full" />
        </div>

      </div>
    </section>
  );
}
