import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogs = [
  {
    title: "The Future of Enterprise AI Agents",
    excerpt: "How autonomous agents are transforming the way large organizations handle internal workflows and customer support.",
    date: "Oct 24, 2026",
    author: "Dr. Sarah Chen",
    category: "Artificial Intelligence"
  },
  {
    title: "Migrating Monoliths to Microservices",
    excerpt: "A practical guide to breaking down legacy systems without disrupting active business operations.",
    date: "Oct 18, 2026",
    author: "James Wilson",
    category: "Cloud Architecture"
  },
  {
    title: "Security in Modern Web Applications",
    excerpt: "Implementing zero-trust architecture in Next.js and React enterprise deployments.",
    date: "Oct 12, 2026",
    author: "Elena Rodriguez",
    category: "Cybersecurity"
  }
];

export function LatestBlogs() {
  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
              Insights & Engineering
            </h2>
            <p className="text-lg text-neutral-600">
              Technical articles, architecture patterns, and industry trends from our engineering team.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors shrink-0"
          >
            Read All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <article key={idx} className="relative group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-200 transition-all duration-300">
              <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-105 transition-transform duration-700"></div>
                 <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-600 shadow-sm z-10">
                   {blog.category}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{blog.author}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                  <Link href="/blog/slug" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-1 text-sm">
                  {blog.excerpt}
                </p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 mt-auto">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
