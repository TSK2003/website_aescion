'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { StructuredData } from '@/components/seo/structured-data';
import { AlertCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

interface LocationDetailProps {
  slug: string;
}

export function LocationDetailClient({ slug }: LocationDetailProps) {
  const { data: pageData, isLoading, isError } = useQuery({
    queryKey: ['location-page', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/pages/public/${slug}`);
        return res.data;
      } catch (err: any) {
        if (err?.response?.status === 404) return null;
        // Fallback for location slug query
        return {
          title: `AESCION Enterprise Services in ${slug.replace(/-/g, ' ').toUpperCase()}`,
          description: `Custom software development, ERP, AI automation, and training in ${slug.replace(/-/g, ' ')}.`,
          content: `AESCION EDTECH SOLUTIONS is proud to serve clients and businesses in ${slug.replace(/-/g, ' ')}. Our local teams specialize in enterprise software engineering and AI automation.`,
        };
      }
    },
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl space-y-6 animate-pulse">
        <div className="w-48 h-8 bg-neutral-200 rounded-full"></div>
        <div className="w-full h-12 bg-neutral-200 rounded-xl"></div>
        <div className="w-full h-40 bg-neutral-100 rounded-2xl mt-8"></div>
      </div>
    );
  }

  const title = pageData?.title || `Enterprise Services in ${slug.replace(/-/g, ' ')}`;
  const description = pageData?.description || `Leading technology partner in ${slug.replace(/-/g, ' ')}.`;

  const structuredData = {
    '@type': 'LocalBusiness',
    name: 'AESCION EDTECH SOLUTIONS',
    image: 'https://aescion.com/logo.png',
    telephone: '+917550068877',
    url: `https://aescion.com/location/${slug}`,
    description: description,
  };

  return (
    <>
      <StructuredData type="LocalBusiness" data={structuredData} />

      <PageHero
        title={title}
        description={description}
        bgClassName="bg-primary-900 text-white"
        breadcrumbs={[{ label: 'Locations', href: '#' }, { label: slug }]}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionHeader title={title} />
          <p className="text-lg text-neutral-600 mt-6 leading-relaxed">
            {pageData?.content || description}
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Our Local Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
