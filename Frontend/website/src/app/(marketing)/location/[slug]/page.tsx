import React from 'react';
import { Metadata } from 'next';
import { LocationDetailClient } from './LocationDetailClient';
import { locationsData } from '@/lib/cms/locations-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return locationsData.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = locationsData.find((l) => l.slug === slug);
  return {
    title: found?.seoTitle || `Enterprise Software Development in ${slug.replace(/-/g, ' ').toUpperCase()} | AESCION`,
    description: found?.metaDescription || `Leading software, AI, and cloud technology partner in ${slug.replace(/-/g, ' ').toUpperCase()}.`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  return <LocationDetailClient slug={slug} />;
}
