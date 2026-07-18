'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Stethoscope, 
  ShoppingCart, 
  Factory, 
  Building2, 
  Landmark,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const industries = [
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Healthcare", icon: Stethoscope, slug: "healthcare" },
  { name: "Retail & E-commerce", icon: ShoppingCart, slug: "retail" },
  { name: "Manufacturing", icon: Factory, slug: "manufacturing" },
  { name: "Construction", icon: Building2, slug: "construction" },
  { name: "Finance", icon: Landmark, slug: "finance" }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export function IndustriesServed() {
  return (
    <section className="py-32 bg-white text-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary-100/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Industries We Transform
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Deep domain expertise across verticals allows us to build solutions that solve specific industry challenges and unlock new opportunities.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {industries.map((industry, idx) => (
            <motion.div variants={itemVariants} key={idx}>
              <Link 
                href={`/industries/${industry.slug}`} 
                className="group flex flex-col items-center justify-center p-8 bg-neutral-50 backdrop-blur-sm border border-neutral-200 rounded-3xl hover:bg-white hover:border-primary-300 hover:shadow-[0_0_30px_rgba(46,23,194,0.1)] transition-all duration-500 h-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <industry.icon className="w-12 h-12 text-neutral-500 group-hover:text-primary-600 mb-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
                <h3 className="font-bold text-center text-neutral-800 group-hover:text-primary-900 transition-colors relative z-10">{industry.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
