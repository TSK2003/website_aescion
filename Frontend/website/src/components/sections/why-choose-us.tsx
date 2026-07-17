import React from 'react';
import { Shield, Zap, Target, Users } from 'lucide-react';

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

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            Why Partner With AESCION
          </h2>
          <p className="text-lg text-neutral-600">
            We don't just write code. We architect solutions that give you a competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{reason.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
