'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "AESCION completely transformed our legacy infrastructure. Their engineering team delivered a highly scalable cloud architecture that reduced our operational costs by 40%.",
    author: "David Chen",
    role: "CTO, Global Finance Corp"
  },
  {
    content: "The AI automation solutions they implemented saved our customer service team thousands of hours. It's rare to find an agency with such deep technical expertise.",
    author: "Sarah Jenkins",
    role: "VP of Operations, TechFlow"
  },
  {
    content: "Their corporate training program brought our entire engineering team up to speed on Next.js and modern React. The ROI has been incredible.",
    author: "Michael Roberts",
    role: "Director of Engineering, Innovate Inc"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-primary-50 text-neutral-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/50 via-transparent to-transparent opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-200 text-primary-700 font-semibold text-sm mb-6 shadow-sm">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-xl text-primary-900/80 leading-relaxed">
            Don't just take our word for it. Hear from the technology leaders who trust AESCION.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              key={idx} 
              className="bg-white backdrop-blur-md border border-primary-200 rounded-3xl p-10 relative group hover:bg-white hover:border-primary-400 hover:-translate-y-2 transition-all duration-500 shadow-lg shadow-primary-900/5"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-200 group-hover:text-primary-300 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
              
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-secondary-500 text-secondary-500 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${star * 50}ms` }} />
                ))}
              </div>
              
              <p className="text-neutral-700 mb-10 leading-relaxed relative z-10 text-lg">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-5 mt-auto pt-6 border-t border-primary-100">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl border border-primary-200 group-hover:bg-primary-200 transition-colors shadow-inner">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-lg">{testimonial.author}</div>
                  <div className="text-sm text-primary-600 font-medium">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
