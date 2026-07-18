'use client';

import React from 'react';
import { Search, Code2, Rocket, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Architecture",
    description: "We analyze your business requirements and design a scalable, secure, and cost-effective system architecture."
  },
  {
    number: "02",
    icon: Code2,
    title: "Agile Engineering",
    description: "Iterative development with rigorous testing, code reviews, and continuous integration/continuous deployment (CI/CD)."
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deployment & Scaling",
    description: "Seamless launch to production cloud environments, ensuring zero downtime and infinite scalability."
  },
  {
    number: "04",
    icon: Headset,
    title: "Maintenance & Support",
    description: "Proactive monitoring, performance optimization, and dedicated ongoing technical support."
  }
];

export function OurProcess() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm mb-6 border border-primary-100">
            Our Methodology
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            How We Deliver Excellence
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            A battle-tested engineering methodology that ensures successful delivery on time and within budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-10">
          {/* Connector Line (Desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 z-0 rounded-full"></div>
          
          {processSteps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              key={idx} 
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-neutral-50 shadow-xl shadow-neutral-200 flex flex-col items-center justify-center mb-8 relative group-hover:border-primary-100 group-hover:scale-110 transition-all duration-300">
                <span className="absolute -top-3 -right-2 text-sm font-bold text-white bg-primary-500 px-3 py-1 rounded-full border-2 border-white shadow-md">
                  {step.number}
                </span>
                <step.icon className="w-10 h-10 text-neutral-800 group-hover:text-primary-600 transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
