'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code2, BrainCircuit, Cloud, Cpu, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  Code: Code2,
  BrainCircuit,
  Cloud,
  Cpu,
  GraduationCap,
  Briefcase,
};

const defaultServices = [
  {
    title: 'Custom Software Development',
    description: 'Scalable, high-performance web and mobile apps engineered for speed, reliability, and security.',
    href: '/services/custom-software-development',
    iconName: 'Code',
    color: 'bg-blue-100/50 text-blue-600 ring-1 ring-blue-500/20',
  },
  {
    title: 'AI & Automation Solutions',
    description: 'LLM integrations, custom AI agents, document processing, and smart workflow automation.',
    href: '/services/ai-automation',
    iconName: 'BrainCircuit',
    color: 'bg-purple-100/50 text-purple-600 ring-1 ring-purple-500/20',
  },
  {
    title: 'Cloud Architecture & DevOps',
    description: 'AWS/GCP infrastructure, Kubernetes orchestration, CI/CD pipelines, and 99.99% uptime optimization.',
    href: '/services/cloud-solutions',
    iconName: 'Cloud',
    color: 'bg-sky-100/50 text-sky-600 ring-1 ring-sky-500/20',
  },
  {
    title: 'ERP & Enterprise Solutions',
    description: 'Tailored ERP systems, CRM integrations, inventory management, and automated financial tracking.',
    href: '/services/erp-software-development',
    iconName: 'Cpu',
    color: 'bg-orange-100/50 text-orange-600 ring-1 ring-orange-500/20',
  },
];

export function CoreServices() {
  const [servicesList, setServicesList] = useState<any[]>(defaultServices);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/services/public`)
      .then((res) => res.json())
      .then((resData) => {
        const data = resData?.data || resData;
        if (Array.isArray(data) && data.length > 0) {
          const colors = [
            'bg-blue-100/50 text-blue-600 ring-1 ring-blue-500/20',
            'bg-purple-100/50 text-purple-600 ring-1 ring-purple-500/20',
            'bg-sky-100/50 text-sky-600 ring-1 ring-sky-500/20',
            'bg-orange-100/50 text-orange-600 ring-1 ring-orange-500/20',
          ];
          const mapped = data.map((item: any, idx: number) => ({
            title: item.title,
            description: item.shortDescription || item.content,
            href: `/services/${item.slug}`,
            iconName: item.icon || 'Code',
            color: colors[idx % colors.length],
          }));
          setServicesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 bg-neutral-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100/50 border border-primary-200/50 text-primary-700 text-sm font-semibold mb-6">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            Comprehensive Digital Services
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            End-to-end technology solutions tailored to accelerate your business objectives and outpace the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Code2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl border border-neutral-200/60 bg-white hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full transform-gpu"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${service.color}`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-8 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors mt-auto group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
