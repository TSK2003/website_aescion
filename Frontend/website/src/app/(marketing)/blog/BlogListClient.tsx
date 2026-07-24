'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { blogsData } from '@/lib/cms/blogs-data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Search, BookOpen } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  readTime?: string;
  coverImage?: string;
  isFeatured?: boolean;
  publishedAt?: string;
  category?: { id?: string; name: string; slug?: string };
  author?: { firstName: string; lastName: string; avatar?: string };
}

const fallbackCategories = [
  'All',
  'Artificial Intelligence',
  'ERP',
  'Technology',
  'Web Development',
  'Internship',
];

const mappedStaticBlogs: Blog[] = blogsData.map((b, idx) => ({
  id: `static-blog-${idx + 1}`,
  title: b.title,
  slug: b.slug,
  excerpt: b.excerpt,
  content: `${b.excerpt}\n\nEnterprise AI and software solutions are transforming business operations in 2026. At AESCION, we engineer high-performance platforms, AI agents, and custom ERP systems tailored to modern organizational workflows.`,
  readTime: '6 min read',
  isFeatured: idx === 0,
  publishedAt: b.publishDate,
  category: { name: b.category, slug: b.category.toLowerCase().replace(/ /g, '-') },
  author: { firstName: b.author, lastName: '' },
}));

export function BlogListClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', 'public', selectedCategory, searchTerm],
    queryFn: async () => {
      try {
        const res = await api.get('/blogs/public', {
          params: {
            search: searchTerm || undefined,
            limit: 20,
          },
        });
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) {
          return list.map((item: any) => ({
            ...item,
            category: typeof item.category === 'string' ? { name: item.category } : item.category,
            author: typeof item.author === 'string' ? { firstName: item.author, lastName: '' } : item.author,
          }));
        }
      } catch {
        // Fallback to static blogs dataset
      }
      return mappedStaticBlogs;
    },
  });

  const blogs: Blog[] = data || mappedStaticBlogs;

  const filteredBlogs = blogs.filter((b) => {
    if (selectedCategory !== 'All') {
      const catName = b.category?.name?.toLowerCase() || '';
      if (!catName.includes(selectedCategory.toLowerCase())) return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchTitle = b.title.toLowerCase().includes(term);
      const matchExcerpt = b.excerpt?.toLowerCase().includes(term);
      return matchTitle || matchExcerpt;
    }
    return true;
  });

  const featuredPost = filteredBlogs.find((b) => b.isFeatured) || filteredBlogs[0];
  const regularPosts = featuredPost ? filteredBlogs.filter((b) => b.id !== featuredPost.id) : filteredBlogs;

  return (
    <>
      {/* Category Filter & Search Bar */}
      <section className="py-4 bg-white/90 backdrop-blur-md border-b border-neutral-200 sticky top-[57px] md:top-[65px] z-40 shadow-sm font-sans">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {fallbackCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-neutral-100 border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </section>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="py-16 container mx-auto px-6 max-w-7xl space-y-12 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-neutral-100 rounded-3xl p-8 animate-pulse">
            <div className="aspect-[16/10] bg-neutral-200 rounded-2xl"></div>
            <div className="space-y-4 justify-center flex flex-col">
              <div className="w-24 h-6 bg-neutral-200 rounded-full"></div>
              <div className="w-full h-10 bg-neutral-200 rounded-lg"></div>
              <div className="w-3/4 h-6 bg-neutral-200 rounded-lg"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-neutral-100 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-24 text-center font-sans">
          <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No blogs found</h3>
          <p className="text-neutral-600">Try selecting another category or clear your search term.</p>
        </div>
      ) : (
        <div className="font-sans">
          {/* Featured Post */}
          {featuredPost && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6 max-w-7xl">
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/10] bg-neutral-200 relative overflow-hidden">
                      {featuredPost.coverImage ? (
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 flex flex-col justify-between p-8 text-white">
                          <span className="self-start px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
                            AESCION Insights
                          </span>
                          <h3 className="text-2xl font-bold leading-tight">{featuredPost.title}</h3>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow">
                        Featured
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                        <span className="text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full font-medium">
                          {featuredPost.category?.name || 'Article'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : 'Recent'}
                        </span>
                        <span>{featuredPost.readTime || '6 min read'}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                      <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                          {featuredPost.author?.firstName ? featuredPost.author.firstName.charAt(0) : 'A'}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 text-sm">
                            {featuredPost.author?.firstName ? `${featuredPost.author.firstName} ${featuredPost.author.lastName}`.trim() : 'AESCION Team'}
                          </div>
                          <div className="text-xs text-neutral-500">Author</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Regular Posts Grid */}
          <section className="py-16 bg-neutral-50 border-t border-neutral-100">
            <div className="container mx-auto px-6 max-w-7xl">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-primary-900 p-6 flex flex-col justify-between text-white">
                          <span className="self-start px-2.5 py-0.5 bg-white/10 rounded-full text-[11px] font-medium">
                            {post.category?.name || 'General'}
                          </span>
                          <h4 className="text-sm font-bold line-clamp-2">{post.title}</h4>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-600 shadow-sm z-10">
                        {post.category?.name || 'General'}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span>{post.readTime || '6 min read'}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-neutral-600 text-sm mb-6 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-xs font-bold">
                            {post.author?.firstName ? post.author.firstName.charAt(0) : 'A'}
                          </div>
                          <span className="text-xs font-medium text-neutral-700">
                            {post.author?.firstName ? `${post.author.firstName} ${post.author.lastName}`.trim() : 'AESCION Team'}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="text-primary-600 group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
