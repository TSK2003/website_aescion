'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "50+", label: "Enterprise Clients", suffix: "" },
  { value: "120+", label: "Projects Delivered", suffix: "" },
  { value: "99.9", label: "Uptime Guaranteed", suffix: "%" },
  { value: "24/7", label: "Premium Support", suffix: "" }
];

export function Statistics() {
  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-900">
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-primary-800/20 to-secondary-900/40 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-6 px-4 group"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 flex items-baseline tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
                {stat.suffix && <span className="text-3xl lg:text-4xl text-primary-400 font-medium ml-1">{stat.suffix}</span>}
              </div>
              <div className="text-neutral-400 font-semibold uppercase tracking-widest text-sm group-hover:text-primary-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
