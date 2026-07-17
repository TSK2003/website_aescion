'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface DynamicAccordionProps {
  items: FaqItem[];
}

export function DynamicAccordion({ items }: DynamicAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-4xl mx-auto w-full">
      {items.map((item, idx) => {
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
                {item.question}
              </span>
              <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-neutral-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
