'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600">
            Common questions about our services, methodologies, and technical capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl transition-all duration-300 ${isOpen ? 'border-primary-200 bg-primary-50/50 shadow-sm' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-primary-600' : 'text-neutral-900'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
