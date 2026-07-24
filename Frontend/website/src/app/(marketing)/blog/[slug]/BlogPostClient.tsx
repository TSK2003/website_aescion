'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { blogsData } from '@/lib/cms/blogs-data';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';

interface BlogPostClientProps {
  slug: string;
}

export function BlogPostClient({ slug }: BlogPostClientProps) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-detail', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/blogs/public/${slug}`);
        if (res.data) {
          return {
            ...res.data,
            category: typeof res.data.category === 'string' ? { name: res.data.category } : res.data.category,
            author: typeof res.data.author === 'string' ? { firstName: res.data.author, lastName: '' } : res.data.author,
          };
        }
      } catch {
        // Fallback
      }

      // Find in static blogsData
      const found = blogsData.find((b) => b.slug === slug);
      if (found) {
        return {
          id: `static-${found.slug}`,
          title: found.title,
          slug: found.slug,
          excerpt: found.excerpt,
          content: `${found.excerpt}\n\nEnterprise AI and software solutions are transforming business operations in 2026. At AESCION, we engineer high-performance platforms, AI agents, and custom ERP systems tailored to modern organizational workflows.\n\nKey Highlights:\n- Tailored Software Architecture & Scalable Cloud Infrastructure\n- End-to-End Security & Enterprise Compliance\n- Seamless Integration with Existing Business Systems\n\nContact AESCION today to accelerate your digital transformation journey.`,
          readTime: '6 min read',
          publishedAt: found.publishDate,
          category: { name: found.category },
          author: { firstName: found.author, lastName: '' },
        };
      }

      return null;
    },
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl space-y-6 animate-pulse font-sans">
        <div className="w-32 h-6 bg-neutral-200 rounded-full"></div>
        <div className="w-full h-12 bg-neutral-200 rounded-xl"></div>
        <div className="w-2/3 h-6 bg-neutral-200 rounded-lg"></div>
        <div className="h-64 bg-neutral-100 rounded-2xl mt-8"></div>
      </div>
    );
  }

  const currentPost = post || {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    excerpt: 'Enterprise engineering article and technological insights from AESCION Solutions.',
    content: 'Enterprise AI and software solutions are transforming business operations in 2026. At AESCION, we engineer high-performance platforms, AI agents, and custom ERP systems tailored to modern organizational workflows.',
    publishedAt: new Date().toISOString(),
    readTime: '5 min read',
    category: { name: 'Technology' },
    author: { firstName: 'AESCION Engineering', lastName: '' },
  };

  const authorName = currentPost.author
    ? `${currentPost.author.firstName} ${currentPost.author.lastName || ''}`.trim()
    : 'AESCION Engineering Team';

  return (
    <div className="font-sans">
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: currentPost.title }]} />

          <div className="mt-8">
            {currentPost.category && (
              <span className="inline-block px-3.5 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full mb-6">
                {currentPost.category.name}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              {currentPost.title}
            </h1>

            {currentPost.excerpt && (
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                {currentPost.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-neutral-100">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-base">
                  {authorName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">{authorName}</div>
                  <div className="text-xs text-neutral-500">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {currentPost.publishedAt ? new Date(currentPost.publishedAt).toLocaleDateString() : 'Published'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {currentPost.readTime || '6 min read'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Share Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Share Article</h4>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200 p-8 md:p-12 space-y-6 shadow-sm">
              <div className="prose prose-lg text-neutral-700 leading-relaxed max-w-none whitespace-pre-wrap">
                {currentPost.content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Link */}
      <section className="py-12 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog List
          </Link>
        </div>
      </section>
    </div>
  );
}
