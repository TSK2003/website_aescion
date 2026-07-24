import React from 'react';
import { Metadata } from 'next';
import { BlogPostClient } from './BlogPostClient';
import { blogsData } from '@/lib/cms/blogs-data';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const found = blogsData.find((b) => b.slug === slug);
  return {
    title: found?.seoTitle || `${slug.replace(/-/g, ' ')} | AESCION Blog`,
    description: found?.metaDescription || 'Technical articles and insights from AESCION EdTech & Engineering.',
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  return <BlogPostClient slug={slug} />;
}
