'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'KK', src: '/images/client-kk.png' },
  { name: 'Sonalika', src: '/images/client-sonalika.png' },
  { name: 'TEC', src: '/images/client-tec.png' },
];

// Duplicate for infinite scroll
const marqueeItems = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

export function TrustedBy() {
  return (
    <section className="py-12 bg-neutral-50 border-b border-neutral-200 overflow-hidden hover:cursor-pointer">
      <div className="container mx-auto px-6 max-w-7xl w-full mb-10 ">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em]"
        >
          Trusted by Innovative Organizations Worldwide
        </motion.p>
      </div>
        
      <div className="relative flex overflow-hidden group w-full">
        <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused] gap-16 px-8">
          {marqueeItems.map((partner, index) => (
            <div 
              key={index} 
              className="relative w-48 h-24 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 select-none flex-shrink-0"
            >
              <Image src={partner.src} alt={partner.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
