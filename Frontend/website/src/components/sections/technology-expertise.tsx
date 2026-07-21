'use client';

import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "Go"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  { category: "AI & ML", items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"] },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function TechnologyExpertise() {
  return (
    <section className="py-24 bg-neutral-50 text-neutral-900 relative border-y border-neutral-200 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 text-sm font-medium mb-6">
            Stack
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Enterprise Technology Stack
          </h2>
          <p className="text-lg text-neutral-600">
            We leverage modern, scalable, and secure technologies to build robust systems.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {technologies.map((tech, idx) => (
            <motion.div 
              variants={itemVariants}
              key={idx} 
              className="bg-white border border-neutral-200 rounded-2xl p-6 hover:bg-neutral-50 hover:border-primary-300 transition-all duration-300 group shadow-sm hover:shadow-md transform-gpu"
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-5 pb-4 border-b border-neutral-200 group-hover:border-primary-300 transition-colors flex items-center gap-2">
                {tech.category}
              </h3>
              <ul className="space-y-4">
                {tech.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 shadow-[0_0_8px_var(--color-primary-500)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
