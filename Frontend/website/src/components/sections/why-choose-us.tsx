'use client';

import React from 'react';
import { Shield, Zap, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: Shield,
    title: "Enterprise Reliability",
    description: "We build systems with high availability, fault tolerance, and military-grade security out of the box."
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimized architectures that load instantly and scale effortlessly to millions of users."
  },
  {
    icon: Target,
    title: "Business Aligned",
    description: "Technology solutions that directly map to your business KPIs and drive measurable ROI."
  },
  {
    icon: Users,
    title: "Expert Teams",
    description: "Work with senior architects and engineers who have delivered complex platforms across industries."
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm mb-6 border border-primary-100">
            The AESCION Advantage
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            Why Partner With AESCION
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            We don't just write code. We architect solutions that give you an unfair competitive advantage.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, idx) => (
            <motion.div 
              variants={itemVariants}
              key={idx} 
              className="text-center group p-8 rounded-3xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto bg-primary-50 rounded-[24px] flex items-center justify-center mb-6 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-[0_0_20px_var(--color-primary-300)]">
                <reason.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">{reason.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
