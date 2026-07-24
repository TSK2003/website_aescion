import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { BlogListClient } from './BlogListClient';

export const metadata: Metadata = {
  title: 'Engineering Blog | AESCION',
  description: 'Technical articles and insights on software architecture, AI, cloud infrastructure, and enterprise engineering.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Engineering Blog"
        description="Architecture patterns, AI insights, cloud strategies, and deep technical guides from our senior engineering team."
        breadcrumbs={[{ label: 'Blog' }]}
        bgClassName="bg-neutral-950 text-white"
      />
      <BlogListClient />
    </>
  );
}
