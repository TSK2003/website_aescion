'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: "Global Fintech Platform",
    category: "Financial Technology",
    description: "A highly secure, globally distributed ledger system processing 10k+ TPS.",
    tags: ["React", "Go", "AWS", "Kafka"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    title: "AI Healthcare Assistant",
    category: "Healthcare",
    description: "LLM-powered diagnostic assistant used by over 50+ hospitals.",
    tags: ["Next.js", "Python", "PyTorch", "HIPAA"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export function PortfolioPreview() {
  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Explore how we've helped leading organizations solve complex technical challenges.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors group text-lg"
            >
              View All Projects
              <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {projects.map((project, idx) => (
            <motion.div variants={itemVariants} key={idx}>
              <Link href="/solutions" className="group block rounded-[2.5rem] overflow-hidden border border-neutral-200/60 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 bg-white shadow-xl shadow-neutral-200/20">
                <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden border-b border-neutral-200/60">
                  <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-10 bg-white">
                  <div className="text-sm font-bold text-primary-600 mb-4 tracking-wider uppercase">{project.category}</div>
                  <h3 className="text-3xl font-extrabold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 mb-8 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-sm font-semibold border border-neutral-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
