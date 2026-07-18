'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Cloud, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
  {
    icon: Code,
    title: "Full-Stack Engineering",
    desc: "React, Next.js, Node.js, and System Design"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS, Docker, Kubernetes, and CI/CD pipelines"
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Science",
    desc: "Machine Learning, LLM integration, and Python"
  }
];

export function CorporateTraining() {
  return (
    <section className="py-32 bg-primary-50 text-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-primary-700 font-semibold text-sm mb-6 shadow-sm">
              Level Up Your Team
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              Corporate Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Training & Upskilling</span>
            </h2>
            <p className="text-xl text-primary-900/70 mb-8 leading-relaxed max-w-lg">
              Equip your engineering teams with modern technology stacks. We conduct intensive, hands-on workshops tailored to your organization's specific technical goals.
            </p>
            
            <div className="space-y-4 mb-10">
              {programs.map((prog, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx} 
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-primary-100 hover:bg-primary-50 transition-colors group shadow-sm"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 border border-primary-200 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <prog.icon className="w-7 h-7 text-primary-600 group-hover:text-primary-700 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">{prog.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">{prog.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link 
              href="/training" 
              className="inline-flex items-center gap-2 text-primary-700 font-bold hover:text-primary-800 transition-colors group text-lg"
            >
              Explore Training Curriculum
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block relative h-full min-h-[500px]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-neutral-950 border border-primary-800/50 overflow-hidden shadow-2xl shadow-primary-900/40 group">
              {/* Fake IDE Header */}
              <div className="w-full h-12 bg-neutral-900 flex items-center px-6 border-b border-neutral-800 gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-inner"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-inner"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner"></div>
                <div className="ml-4 text-xs font-mono text-neutral-500">training.ts</div>
              </div>
              
              <div className="p-8 font-mono text-sm md:text-base text-primary-200 leading-loose">
                <p className="text-primary-400/70 mb-4">// Upskill your engineering workforce</p>
                <p><span className="text-secondary-400">const</span> <span className="text-white">trainingProgram</span> = {'{'}</p>
                <p className="ml-6">modules: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Next.js'</span>, <span className="text-green-400">'AWS'</span>],</p>
                <p className="ml-6">duration: <span className="text-secondary-400">12</span>,</p>
                <p className="ml-6">format: <span className="text-green-400">'Hands-on'</span></p>
                <p>{'};'}</p>
                <br/>
                <p><span className="text-white">team</span>.<span className="text-secondary-400">upskill</span>(trainingProgram);</p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-6 text-green-400 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  &gt; Execution successful. Team productivity +300%
                </motion.p>
              </div>
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
