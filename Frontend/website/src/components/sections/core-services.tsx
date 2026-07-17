import React from 'react';
import Link from 'next/link';
import { Code2, BrainCircuit, Cloud, Cpu, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Enterprise Software",
    description: "Custom ERP, CRM, and HRMS platforms built for massive scale and reliability.",
    icon: Code2,
    href: "/services/software-development",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "AI Solutions",
    description: "Intelligent automation, predictive analytics, and custom LLM integrations.",
    icon: BrainCircuit,
    href: "/services/ai-solutions",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Cloud Architecture",
    description: "Scalable AWS infrastructure, containerization, and DevOps automation.",
    icon: Cloud,
    href: "/services/cloud-solutions",
    color: "bg-sky-100 text-sky-600"
  },
  {
    title: "Process Automation",
    description: "Streamline workflows and eliminate manual tasks with smart RPA.",
    icon: Cpu,
    href: "/services/automation",
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Corporate Training",
    description: "Upskill your engineering teams with cutting-edge technology workshops.",
    icon: GraduationCap,
    href: "/training",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Internship Programs",
    description: "Hands-on, industry-ready training programs for students and graduates.",
    icon: Briefcase,
    href: "/internship",
    color: "bg-rose-100 text-rose-600"
  }
];

export function CoreServices() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            Comprehensive Digital Services
          </h2>
          <p className="text-lg text-neutral-600">
            End-to-end technology solutions tailored to accelerate your business objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl border border-neutral-200 bg-white hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                <service.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <Link 
                href={service.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
