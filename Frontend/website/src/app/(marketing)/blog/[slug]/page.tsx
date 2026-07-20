import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { blogsData } from '@/lib/cms/blogs-data';
import { Calendar, User, Clock, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogsData.find((p) => p.slug === slug);
  if (!post) return { title: 'Blog Post Not Found | AESCION' };
  return {
    title: `${post.title} | AESCION Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = blogsData.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

          <div className="mt-8">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-6">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-neutral-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{post.author}</div>
                  <div className="text-sm text-neutral-500">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.publishDate).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Hero Image */}
      <div className="bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="aspect-[21/9] bg-neutral-100 rounded-2xl overflow-hidden relative -mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-neutral-100 flex items-center justify-center">
              <span className="text-neutral-400 font-medium text-lg">Article Hero Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Table of Contents (Desktop sidebar) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-white rounded-xl border border-neutral-200 p-6">
                <h4 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Table of Contents</h4>
                <nav className="space-y-3 text-sm">
                  <a href="#intro" className="block text-primary-600 font-medium">Introduction</a>
                  <a href="#problem" className="block text-neutral-500 hover:text-primary-600 transition-colors">The Problem</a>
                  <a href="#approach" className="block text-neutral-500 hover:text-primary-600 transition-colors">Our Approach</a>
                  <a href="#implementation" className="block text-neutral-500 hover:text-primary-600 transition-colors">Implementation</a>
                  <a href="#results" className="block text-neutral-500 hover:text-primary-600 transition-colors">Results</a>
                  <a href="#conclusion" className="block text-neutral-500 hover:text-primary-600 transition-colors">Conclusion</a>
                </nav>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <h4 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Share</h4>
                  <div className="flex gap-3">
                    <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-primary-50 hover:text-primary-600 transition-colors">
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
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200 p-8 md:p-12">
               <p className="text-lg text-neutral-700 leading-relaxed">
                 {post.excerpt}
                 <br/><br/>
                 <em>(Full markdown content will be rendered here via the CMS in production).</em>
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles & CTA */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Blog
            </Link>
          </div>

          <div className="bg-primary-50 rounded-2xl p-8 md:p-12 border border-primary-100 text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Enjoyed this article?</h3>
            <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter and get expert insights on software architecture, AI, and cloud engineering delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="button" className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
