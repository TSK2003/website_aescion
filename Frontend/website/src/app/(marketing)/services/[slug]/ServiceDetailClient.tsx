'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { DynamicAccordion } from '@/components/ui/dynamic-accordion';
import { StructuredData } from '@/components/seo/structured-data';
import { CheckCircle2, ArrowRight, Code, Settings, Rocket, Shield, Headset, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailProps {
  slug: string;
}

const processSteps = [
  { icon: Settings, title: 'Discovery & Architecture', desc: 'We analyse your requirements and design a scalable, secure system architecture.' },
  { icon: Code, title: 'Agile Engineering', desc: 'Iterative development with CI/CD, code reviews, and automated testing.' },
  { icon: Rocket, title: 'Deployment & Scaling', desc: 'Zero-downtime deployment to production cloud environments.' },
  { icon: Shield, title: 'Security Hardening', desc: 'Penetration testing, OWASP compliance, and infrastructure auditing.' },
  { icon: Headset, title: 'Ongoing Support', desc: 'Proactive monitoring, SLA-backed maintenance, and feature iteration.' },
];

export function ServiceDetailClient({ slug }: ServiceDetailProps) {
  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service-detail', slug],
    queryFn: async () => {
      try {
        const res = await api.get(`/services/public/${slug}`);
        return res.data;
      } catch (err: any) {
        if (err?.response?.status === 404) return null;
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-6 max-w-7xl space-y-8 animate-pulse">
        <div className="w-48 h-8 bg-neutral-200 rounded-full"></div>
        <div className="w-full h-12 bg-neutral-200 rounded-xl"></div>
        <div className="w-2/3 h-6 bg-neutral-200 rounded-lg"></div>
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="h-64 bg-neutral-100 rounded-2xl"></div>
          <div className="h-64 bg-neutral-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-40 pb-24 text-center container mx-auto px-6 max-w-md">
        <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Service Not Found</h1>
        <p className="text-neutral-600 mb-8">
          The requested service &quot;{slug}&quot; does not exist or has been updated.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const structuredData = {
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: 'AESCION EDTECH SOLUTIONS',
    },
    description: service.shortDescription || service.metaDesc,
  };

  const features: string[] = Array.isArray(service.features) ? service.features : [];

  return (
    <>
      <StructuredData type="Service" data={structuredData} />

      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
        bgClassName="bg-neutral-950 text-white"
      />

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader badge="Overview" title="What We Deliver" align="left" />
              <div className="prose prose-lg text-neutral-600 max-w-none mt-6 space-y-4">
                <p>{service.content}</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Core Capabilities</h3>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-neutral-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Process */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Our Engineering Process" description="A battle-tested methodology that ensures successful delivery on time and within budget." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
            {processSteps.map((step, idx) => (
              <div key={idx} className="text-center relative bg-white p-6 rounded-2xl border border-neutral-200">
                <div className="w-14 h-14 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-5 text-primary-600">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-primary-100 mb-10">
            Talk to our senior architects about your project requirements. We&apos;ll provide a detailed technical proposal within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
              Schedule a Consultation
            </Link>
            <Link href="/services" className="px-8 py-4 border border-primary-400 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
