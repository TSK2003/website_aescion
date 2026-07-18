'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function CallToAction() {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-primary-50 rounded-[3rem] overflow-hidden relative shadow-xl border border-primary-100"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200 opacity-40 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-200 opacity-40 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 px-6 py-20 md:py-28 text-center max-w-4xl mx-auto flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 bg-primary-100 border border-primary-200 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="w-8 h-8 text-primary-600" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight leading-tight">
              Ready to Accelerate Your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Digital Transformation?</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl">
              Partner with AESCION to architect, build, and scale your next big initiative. Let's discuss your technical requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-10 py-5 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 group"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto px-10 py-5 bg-white border border-primary-200 text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors flex items-center justify-center backdrop-blur-sm shadow-sm hover:border-primary-300"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
