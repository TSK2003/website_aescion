import React from 'react';
import { Metadata } from 'next';
import { ServiceDetailClient } from './ServiceDetailClient';
import { servicesData } from '@/lib/cms/services-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = servicesData.find((s) => s.slug === slug);
  return {
    title: found?.seoTitle || `${slug.replace(/-/g, ' ')} | AESCION Services`,
    description: found?.metaDescription || `Enterprise software engineering, AI, and cloud architecture services for ${slug}.`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
