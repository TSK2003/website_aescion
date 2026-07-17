import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function CompanyOverview() {
  const highlights = [
    "Enterprise-grade architecture and scalability",
    "Zero-trust security implementation",
    "Seamless cloud deployment & DevOps",
    "Comprehensive end-to-end support"
  ];

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
              Architecting the Future of Enterprise Software
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              At AESCION, we transform complex business challenges into elegant, scalable digital solutions. Our deep expertise in software engineering, artificial intelligence, and cloud infrastructure enables organizations to operate faster, smarter, and more efficiently.
            </p>
            
            <ul className="space-y-4 mb-10">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0" />
                  <span className="text-neutral-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              More About AESCION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual/Image Placeholder */}
          <div className="relative h-[500px] w-full rounded-2xl bg-white shadow-xl border border-neutral-100 overflow-hidden flex items-center justify-center">
            {/* Replace with actual image later */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-secondary-50/50" />
            <div className="relative text-center p-8">
              <div className="w-20 h-20 bg-primary-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-4xl leading-none">A</span>
              </div>
              <p className="text-2xl font-bold text-neutral-800">Excellence in Engineering</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
