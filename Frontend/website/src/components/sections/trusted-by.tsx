'use client';

import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "Microsoft", "AWS", "Google Cloud", "Stripe", "Vercel", "Zoho"
];

// Duplicate for infinite scroll
const marqueeItems = [...partners, ...partners, ...partners, ...partners];

export function TrustedBy() {
  return (
    <section className="py-12 bg-neutral-50 border-b border-neutral-200 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8"
        >
          Trusted by Innovative Organizations Worldwide
        </motion.p>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {marqueeItems.map((partner, index) => (
              <span 
                key={index} 
                className="mx-10 md:mx-16 text-xl md:text-3xl font-black text-neutral-400 hover:text-primary-600 hover:scale-110 transition-all duration-300 select-none tracking-tighter"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
