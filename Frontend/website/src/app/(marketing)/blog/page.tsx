import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Search, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Blog | AESCION',
  description: 'Technical articles and insights on software architecture, AI, cloud infrastructure, and enterprise engineering.',
};

const categories = [
  'All', 'Software Architecture', 'AI & ML', 'Cloud & DevOps', 'Frontend', 'Backend', 'Security', 'Career',
];

const featuredPost = {
  slug: 'future-of-enterprise-ai',
  title: 'The Future of Enterprise AI Agents: Beyond Chatbots',
  excerpt: 'How autonomous AI agents powered by large language models are transforming enterprise workflows, from customer support to internal operations and decision-making.',
  date: 'Oct 24, 2026',
  author: { name: 'Dr. Sarah Chen', role: 'Chief AI Officer' },
  category: 'AI & ML',
  readTime: '12 min read',
};

const posts = [
  {
    slug: 'migrating-monoliths',
    title: 'Migrating Monoliths to Microservices: A Practical Guide',
    excerpt: 'A step-by-step guide to breaking down legacy monolithic applications into independently deployable microservices without disrupting active business operations.',
    date: 'Oct 18, 2026',
    author: { name: 'James Wilson', role: 'Cloud Architect' },
    category: 'Cloud & DevOps',
    readTime: '9 min read',
  },
  {
    slug: 'security-modern-web',
    title: 'Security in Modern Web Applications',
    excerpt: 'Implementing zero-trust architecture, CSP headers, and OWASP Top 10 mitigations in Next.js and React enterprise deployments.',
    date: 'Oct 12, 2026',
    author: { name: 'Elena Rodriguez', role: 'Security Engineer' },
    category: 'Security',
    readTime: '8 min read',
  },
  {
    slug: 'nextjs-app-router-patterns',
    title: 'Advanced Next.js App Router Patterns for Enterprise',
    excerpt: 'Server components, streaming, parallel routes, and intercepting routes — patterns that make enterprise Next.js apps fast and maintainable.',
    date: 'Oct 6, 2026',
    author: { name: 'Alex Kim', role: 'Frontend Architect' },
    category: 'Frontend',
    readTime: '11 min read',
  },
  {
    slug: 'postgresql-performance',
    title: 'PostgreSQL Performance Tuning for High-Traffic Applications',
    excerpt: 'Query optimization, connection pooling, partitioning strategies, and monitoring setups for databases handling millions of transactions.',
    date: 'Sep 28, 2026',
    author: { name: 'Maria Santos', role: 'Database Architect' },
    category: 'Backend',
    readTime: '10 min read',
  },
  {
    slug: 'building-design-systems',
    title: 'Building Scalable Design Systems with React and Figma',
    excerpt: 'How to create a component library that stays in sync across design and engineering, with automated documentation and visual regression testing.',
    date: 'Sep 20, 2026',
    author: { name: 'David Park', role: 'UI/UX Lead' },
    category: 'Frontend',
    readTime: '7 min read',
  },
  {
    slug: 'kubernetes-production',
    title: 'Running Kubernetes in Production: Lessons Learned',
    excerpt: 'Real-world operational insights from managing 50+ production Kubernetes clusters across AWS, including cost optimization and incident response.',
    date: 'Sep 14, 2026',
    author: { name: 'James Wilson', role: 'Cloud Architect' },
    category: 'Cloud & DevOps',
    readTime: '13 min read',
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Engineering Blog"
        description="Architecture patterns, AI insights, cloud strategies, and deep technical guides from our senior engineering team."
        breadcrumbs={[{ label: 'Blog' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-neutral-100 sticky top-[72px] z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  idx === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow">
              <div className="aspect-[16/10] bg-neutral-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 to-neutral-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-neutral-400 font-medium">Featured Article Image</span>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                  <span className="text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full font-medium">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {featuredPost.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-sm">{featuredPost.author.name}</div>
                    <div className="text-xs text-neutral-500">{featuredPost.author.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Latest Articles" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {posts.map((post, idx) => (
              <article key={idx} className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-105 transition-transform duration-700"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-600 shadow-sm z-10">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug flex-grow-0">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 text-xs font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{post.author.name}</span>
                    </div>
                    <div className="text-primary-600 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16 gap-2">
            <button className="w-10 h-10 rounded-lg bg-primary-600 text-white font-bold text-sm">1</button>
            <button className="w-10 h-10 rounded-lg bg-white border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg bg-white border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors">3</button>
            <button className="w-10 h-10 rounded-lg bg-white border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors">
              <ArrowRight className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Never miss an article</h2>
          <p className="text-xl text-primary-100 mb-10">
            Subscribe to our monthly engineering digest for architecture patterns, AI trends, and cloud best practices.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-primary-800 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="button" className="px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
