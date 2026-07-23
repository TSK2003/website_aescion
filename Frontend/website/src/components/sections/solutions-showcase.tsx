'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Blocks } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultSolutions = [
  {
    title: 'AESCION Enterprise Core ERP',
    description:
      'Unified ERP solution for managing multi-branch operations, finances, human resources, and supply chains.',
    slug: 'enterprise-core',
  },
  {
    title: 'Autonomous AI Workflow Engine',
    description:
      'Deploy custom AI agents that manage customer support, process documentation, and automate complex tasks.',
    slug: 'ai-agent-engine',
  },
];

export function SolutionsShowcase() {
  const [solutionsList, setSolutionsList] = useState<any[]>(defaultSolutions);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/solutions/public`)
      .then((res) => res.json())
      .then((resData) => {
        const data = resData?.data || resData;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any) => ({
            title: item.title,
            description: item.shortDescription || item.content,
            slug: item.slug,
          }));
          setSolutionsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-600 font-semibold text-sm mb-6 shadow-sm">
              <Blocks className="w-4 h-4 text-primary-500" />
              <span>Ready-to-Deploy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
              Pre-Architected Solutions
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Accelerate your time-to-market with our robust, customizable software solutions designed for enterprise scale.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-xl hover:bg-neutral-50 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 shrink-0 group"
            >
              View All Solutions
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionsList.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/solutions/${solution.slug}`}
                className="group block p-10 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {solution.title}
                    </h3>
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shrink-0 transform group-hover:scale-110 group-hover:rotate-12 shadow-sm">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-lg max-w-md">
                    {solution.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
