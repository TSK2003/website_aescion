'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function AiAutomation() {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-6 border border-primary-200 shadow-[0_0_15px_rgba(46,23,194,0.1)]">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
              Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">AI & Automation</span> Solutions
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              We integrate large language models (LLMs), machine learning pipelines, and robotic process automation (RPA) directly into your enterprise software, transforming raw data into actionable insights and automating repetitive workflows.
            </p>
            
            <div className="space-y-6 mb-10">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center shrink-0 text-primary-600 shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg mb-1">Custom AI Agents</h4>
                  <p className="text-neutral-500 leading-relaxed">Deploy specialized AI agents that understand your proprietary data and securely execute tasks.</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-50 border border-secondary-200 flex items-center justify-center shrink-0 text-secondary-600 shadow-sm">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg mb-1">Workflow Automation</h4>
                  <p className="text-neutral-500 leading-relaxed">Eliminate manual data entry and connect disjointed systems with powerful RPA integrations.</p>
                </div>
              </motion.div>
            </div>
            
            <Link 
              href="/services/ai-solutions" 
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group text-lg"
            >
              Discover AI Capabilities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Abstract visual representation of AI Node/Network */}
            <div className="aspect-square md:aspect-[4/5] rounded-[2.5rem] bg-neutral-50 p-8 relative overflow-hidden shadow-xl border border-neutral-200 flex items-center justify-center group">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-200/40 rounded-full blur-[80px] group-hover:bg-primary-300/40 transition-colors duration-700"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                <div className="flex justify-between items-end mb-6">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-[0_0_20px_rgba(46,23,194,0.3)] border border-primary-400 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                    <Bot className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                  <div className="flex gap-3 pb-2">
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_var(--color-primary-400)]"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_var(--color-primary-400)]" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_var(--color-primary-400)]" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0.8, x: 0 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white/80 backdrop-blur-md border border-neutral-200 rounded-2xl p-5 mb-4 transform -rotate-2 hover:rotate-0 transition-all duration-300 shadow-md"
                >
                  <div className="w-32 h-2.5 bg-neutral-300 rounded-full mb-3"></div>
                  <div className="w-full h-2.5 bg-neutral-200 rounded-full mb-3"></div>
                  <div className="w-3/4 h-2.5 bg-neutral-200 rounded-full"></div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0.9, x: 16 }}
                  whileHover={{ scale: 1.05, x: 0, rotate: 0 }}
                  className="bg-primary-50/80 backdrop-blur-xl border border-primary-200 rounded-2xl p-5 transform rotate-2 hover:rotate-0 transition-all duration-300 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary-500 animate-pulse" />
                    <span className="text-sm text-primary-700 font-mono tracking-wide">AI Processing...</span>
                  </div>
                  <div className="w-full h-2.5 bg-primary-200 rounded-full mb-3"></div>
                  <div className="w-5/6 h-2.5 bg-primary-200 rounded-full"></div>
                </motion.div>
              </div>
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
