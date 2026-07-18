'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function InternshipPrograms() {
  const features = [
    "Work on live enterprise-grade projects",
    "Mentorship from senior software architects",
    "Certification upon successful completion",
    "Direct pathway to full-time placement"
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-square md:aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden bg-neutral-100 border-4 border-white shadow-2xl relative group">
               {/* Replace with actual image later */}
               <div className="absolute inset-0 bg-gradient-to-tr from-secondary-200 to-primary-100 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                 <span className="text-secondary-900/40 font-black text-3xl uppercase tracking-widest">Internship Visual</span>
               </div>
               {/* Glossy overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 hidden md:block"
            >
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-primary-500 mb-1">98%</div>
              <div className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Placement Rate</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-600 font-bold text-sm mb-6 border border-secondary-200/50 shadow-sm">
              For Students & Graduates
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight leading-tight">
              Launch Your Tech Career with AESCION
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Bridge the gap between academic learning and industry requirements. Our intensive internship programs expose you to real-world software engineering, cloud architecture, and AI development.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((item, idx) => (
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx} 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-50 flex items-center justify-center group-hover:bg-secondary-500 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-secondary-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-neutral-700 font-medium text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link 
              href="/internship" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-xl font-bold hover:bg-primary-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-300"
            >
              Apply for Internship
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
