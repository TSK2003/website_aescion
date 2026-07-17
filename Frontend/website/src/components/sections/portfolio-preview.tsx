import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Global Fintech Platform",
    category: "Financial Technology",
    description: "A highly secure, globally distributed ledger system processing 10k+ TPS.",
    tags: ["React", "Go", "AWS", "Kafka"]
  },
  {
    title: "AI Healthcare Assistant",
    category: "Healthcare",
    description: "LLM-powered diagnostic assistant used by over 50+ hospitals.",
    tags: ["Next.js", "Python", "PyTorch", "HIPAA"]
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-lg text-neutral-600">
              Explore how we've helped leading organizations solve complex technical challenges.
            </p>
          </div>
          <Link 
            href="/solutions" 
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <div key={idx} className="group rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 bg-neutral-50">
              <div className="aspect-video bg-neutral-200 relative overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-300 to-neutral-100 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">Project Visual</div>
              </div>
              <div className="p-8 bg-white">
                <div className="text-sm font-semibold text-primary-600 mb-3">{project.category}</div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
