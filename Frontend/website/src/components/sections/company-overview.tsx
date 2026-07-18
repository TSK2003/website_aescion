'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompanyOverview() {
  const highlights = [
    "Enterprise-grade architecture and scalability",
    "Zero-trust security implementation",
    "Seamless cloud deployment & DevOps",
    "Comprehensive end-to-end support"
  ];

  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-primary-200/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-secondary-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
              Architecting the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Enterprise Software</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              At AESCION, we transform complex business challenges into elegant, scalable digital solutions. Our deep expertise in software engineering, artificial intelligence, and cloud infrastructure enables organizations to operate faster, smarter, and more efficiently.
            </p>
            
            <ul className="space-y-4 mb-10">
              {highlights.map((item, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-600 shrink-0" />
                  <span className="text-neutral-700 font-medium text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group text-lg"
            >
              More About AESCION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Visual/Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] w-full rounded-3xl bg-white shadow-xl border border-neutral-200 overflow-hidden flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative text-center p-8 z-10 transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_10px_30px_rgba(46,23,194,0.3)] ring-1 ring-white/50">
                <span className="text-white font-black text-5xl leading-none">A</span>
              </div>
              <p className="text-3xl font-bold text-neutral-900 tracking-tight">Excellence in Engineering</p>
            </div>
            
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
