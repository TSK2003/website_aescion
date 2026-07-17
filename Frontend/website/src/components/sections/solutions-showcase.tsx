import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const solutions = [
  {
    title: "AI & Data Solutions",
    description: "Harness the power of your data with predictive models, natural language processing, and automated decision engines.",
    slug: "ai-solutions",
  },
  {
    title: "Enterprise ERP",
    description: "Unify your business processes into a single, scalable system tailored to your specific operational needs.",
    slug: "erp",
  },
  {
    title: "Modern HRMS",
    description: "Streamline recruitment, onboarding, payroll, and performance management with an intuitive platform.",
    slug: "hrms",
  },
  {
    title: "Advanced LMS",
    description: "Deliver powerful educational experiences with course management, analytics, and interactive learning tools.",
    slug: "lms",
  },
];

export function SolutionsShowcase() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Pre-Architected Solutions
            </h2>
            <p className="text-lg text-neutral-600">
              Accelerate your time-to-market with our robust, customizable software solutions designed for enterprise scale.
            </p>
          </div>
          <Link 
            href="/solutions" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors shrink-0"
          >
            View All Solutions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, idx) => (
            <Link 
              href={`/solutions/${solution.slug}`} 
              key={idx}
              className="group block p-8 rounded-2xl bg-white border border-neutral-200 hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {solution.title}
                </h3>
                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed max-w-md">
                {solution.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
