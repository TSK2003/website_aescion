import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { StructuredData } from '@/components/seo/structured-data';
import { locationsData } from '@/lib/cms/locations-data';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find(l => l.slug === slug);
  
  if (!location) {
    return { title: 'Not Found' };
  }

  return {
    title: location.seoTitle,
    description: location.metaDescription,
    alternates: {
      canonical: `https://aescion.com/location/${location.slug}`
    }
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = locationsData.find(l => l.slug === slug);

  if (!location) {
    notFound();
  }

  const structuredData = {
    '@type': 'LocalBusiness',
    name: 'AESCION EDTECH SOLUTIONS',
    image: 'https://aescion.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: 'IN'
    },
    telephone: '+917550068877',
    url: `https://aescion.com/location/${location.slug}`,
    description: location.metaDescription
  };

  return (
    <>
      <StructuredData type="LocalBusiness" data={structuredData} />
      
      <PageHero 
        title={`${location.focus} in ${location.city}`}
        description={location.metaDescription}
        bgClassName="bg-primary-900 text-white"
        breadcrumbs={[
          { label: 'Locations', href: '#' },
          { label: location.city }
        ]}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionHeader title={`Leading ${location.focus} Partner in ${location.city}, ${location.state}`} />
          <p className="text-lg text-neutral-600 mt-6 leading-relaxed">
            AESCION EDTECH SOLUTIONS is proud to serve businesses and students in {location.city}. 
            Whether you need custom ERP software, mobile app development, or cutting-edge AI automation, 
            our local team provides enterprise-grade technology solutions.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Contact Our Local Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
