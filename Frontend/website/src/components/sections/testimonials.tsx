import React from 'react';
import { Star, Quote } from 'lucide-react';

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
    <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-800 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-lg text-primary-200">
            Don't just take our word for it. Hear from the technology leaders who trust AESCION.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-primary-950/50 backdrop-blur-sm border border-primary-800 rounded-2xl p-8 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary-800/30" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-secondary-500 text-secondary-500" />
                ))}
              </div>
              
              <p className="text-primary-100 mb-8 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center text-primary-300 font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-primary-300">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
