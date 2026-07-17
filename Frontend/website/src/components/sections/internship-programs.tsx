import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function InternshipPrograms() {
  const features = [
    "Work on live enterprise-grade projects",
    "Mentorship from senior software architects",
    "Certification upon successful completion",
    "Direct pathway to full-time placement"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
               {/* Replace with actual image later */}
               <div className="w-full h-full bg-gradient-to-tr from-secondary-100 to-primary-50 flex items-center justify-center">
                 <span className="text-primary-800/50 font-bold text-2xl">Internship Visual</span>
               </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-neutral-100 hidden md:block">
              <div className="text-4xl font-bold text-primary-500 mb-1">98%</div>
              <div className="text-sm font-medium text-neutral-600">Placement Rate</div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-600 font-semibold text-sm mb-6 border border-secondary-100">
              For Students & Graduates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
              Launch Your Tech Career with AESCION
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Bridge the gap between academic learning and industry requirements. Our intensive internship programs expose you to real-world software engineering, cloud architecture, and AI development.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary-500 shrink-0" />
                  <span className="text-neutral-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              href="/internship" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg"
            >
              Apply for Internship
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
