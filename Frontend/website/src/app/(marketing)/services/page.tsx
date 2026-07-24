import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { ServicesListClient } from './ServicesListClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Services | AESCION',
  description: 'Explore our enterprise software development, AI solutions, and cloud architecture services.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero 
        title="Engineering Capabilities"
        description="Comprehensive digital transformation services tailored for enterprise scale. We architect, build, and deploy mission-critical software."
        breadcrumbs={[{ label: 'Services' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      <ServicesListClient />

      <section className="py-24 bg-primary-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a custom technical stack?</h2>
          <p className="text-xl text-primary-100 mb-10">
            Our architects can design a bespoke solution using any modern technology ecosystem (React, Next, Nest, Python, Go).
          </p>
          <Link href="/contact" className="inline-flex px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
            Talk to an Architect
          </Link>
        </div>
      </section>
    </>
  );
}
