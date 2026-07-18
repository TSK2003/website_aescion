'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What makes AESCION different from other software agencies?",
    answer: "We are an engineering-first company. We don't use templates or low-code builders for enterprise projects. Everything we build is custom-architected for extreme scalability, security, and performance using the same stacks as top tech companies."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide comprehensive SLA-backed maintenance contracts. This includes 24/7 monitoring, security patching, performance optimization, and dedicated engineering hours for new feature development."
  },
  {
    question: "How do your corporate training programs work?",
    answer: "Our corporate training is fully customized. We assess your team's current skill level, understand your technical goals, and design hands-on, project-based workshops led by our senior architects."
  },
  {
    question: "Can you integrate AI into our existing legacy software?",
    answer: "Absolutely. We specialize in modernizing legacy systems. We can build secure microservices and API layers that allow your existing infrastructure to leverage state-of-the-art LLMs and machine learning models without a full rewrite."
  }
];

export function Faqs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 text-neutral-600 font-semibold text-sm mb-8">
            <MessageCircleQuestion className="w-4 h-4 text-primary-500" />
            Support
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Common questions about our services, methodologies, and technical capabilities.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                key={idx} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary-200 bg-white shadow-xl shadow-primary-500/5' : 'border-neutral-200 bg-white/50 hover:bg-white hover:border-neutral-300 shadow-sm'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 ${isOpen ? 'text-primary-600' : 'text-neutral-900 group-hover:text-primary-600 transition-colors'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-primary-50' : 'bg-neutral-100 group-hover:bg-primary-50'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary-600' : 'text-neutral-500 group-hover:text-primary-500'}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 md:p-8 pt-0 text-neutral-600 leading-relaxed text-lg border-t border-neutral-100/50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
