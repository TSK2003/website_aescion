import React from 'react';
import { Search, Code2, Rocket, Headset } from 'lucide-react';

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Architecture",
    description: "We analyze your business requirements and design a scalable, secure, and cost-effective system architecture."
  },
  {
    number: "02",
    icon: Code2,
    title: "Agile Engineering",
    description: "Iterative development with rigorous testing, code reviews, and continuous integration/continuous deployment (CI/CD)."
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deployment & Scaling",
    description: "Seamless launch to production cloud environments, ensuring zero downtime and infinite scalability."
  },
  {
    number: "04",
    icon: Headset,
    title: "Maintenance & Support",
    description: "Proactive monitoring, performance optimization, and dedicated ongoing technical support."
  }
];

export function OurProcess() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            How We Deliver Excellence
          </h2>
          <p className="text-lg text-neutral-600">
            A battle-tested engineering methodology that ensures successful delivery on time and within budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-neutral-100 z-0"></div>
          
          {processSteps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-neutral-50 shadow-lg shadow-neutral-200/50 flex flex-col items-center justify-center mb-6 relative">
                <span className="absolute -top-3 -right-2 text-sm font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100">
                  {step.number}
                </span>
                <step.icon className="w-8 h-8 text-neutral-800" />
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
