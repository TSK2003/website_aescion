'use client';

import React from 'react';
import Link from 'next/link';
import { Code2, BrainCircuit, Cloud, Cpu, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Enterprise Software",
    description: "Custom ERP, CRM, and HRMS platforms built for massive scale and reliability.",
    icon: Code2,
    href: "/services/custom-software-development",
    color: "bg-blue-100/50 text-blue-600 ring-1 ring-blue-500/20"
  },
  {
    title: "AI Solutions",
    description: "Intelligent automation, predictive analytics, and custom LLM integrations.",
    icon: BrainCircuit,
    href: "/services/ai-automation",
    color: "bg-purple-100/50 text-purple-600 ring-1 ring-purple-500/20"
  },
  {
    title: "Cloud Architecture",
    description: "Scalable AWS infrastructure, containerization, and DevOps automation.",
    icon: Cloud,
    href: "/services/cloud-solutions",
    color: "bg-sky-100/50 text-sky-600 ring-1 ring-sky-500/20"
  },
  {
    title: "Process Automation",
    description: "Streamline workflows and eliminate manual tasks with smart RPA.",
    icon: Cpu,
    href: "/services/erp-software-development",
    color: "bg-orange-100/50 text-orange-600 ring-1 ring-orange-500/20"
  },
  {
    title: "Corporate Training",
    description: "Upskill your engineering teams with cutting-edge technology workshops.",
    icon: GraduationCap,
    href: "/training",
    color: "bg-green-100/50 text-green-600 ring-1 ring-green-500/20"
  },
  {
    title: "Internship Programs",
    description: "Hands-on, industry-ready training programs for students and graduates.",
    icon: Briefcase,
    href: "/internship",
    color: "bg-rose-100/50 text-rose-600 ring-1 ring-rose-500/20"
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function CoreServices() {
  return (
    <section className="py-32 bg-neutral-50 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
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

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group p-8 rounded-3xl border border-neutral-200/60 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${service.color}`}>
                <service.icon className="w-7 h-7" />
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
          ))}
        </motion.div>

      </div>
    </section>
  );
}
