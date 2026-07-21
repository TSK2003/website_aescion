'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Solutions",
      image: "https://i.pravatar.cc/150?img=1",
      content: "AESCION completely transformed our legacy systems. Their enterprise software architecture is robust, scalable, and the team's technical depth is truly exceptional.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Engineering, CloudScale Inc",
      image: "https://i.pravatar.cc/150?img=11",
      content: "The cloud infrastructure they deployed reduced our operational costs by 40%. Their deep understanding of Kubernetes and AWS is unmatched in the industry.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Operations Director, InnovateTech",
      image: "https://i.pravatar.cc/150?img=5",
      content: "Their AI automation solutions streamlined our entire workflow. What used to take days now takes minutes. AESCION is not just a vendor, but a strategic partner.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-primary-50 text-neutral-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-200/50 via-transparent to-transparent opacity-70 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
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

        {/* Real Native Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-6 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 leading-relaxed flex-grow italic mb-8">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary-100" />
                <div>
                  <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
