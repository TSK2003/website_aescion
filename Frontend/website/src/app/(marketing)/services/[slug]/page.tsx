import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { DynamicAccordion } from '@/components/ui/dynamic-accordion';
import { StructuredData } from '@/components/seo/structured-data';
import { CheckCircle2, ArrowRight, Code, Settings, Rocket, Shield, Headset } from 'lucide-react';
import { servicesData } from '@/lib/cms/services-data';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return { title: 'Service Not Found | AESCION' };
  }

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://aescion.com/services/${service.slug}`
    },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: `https://aescion.com/services/${service.slug}`,
    }
  };
}

const processSteps = [
  { icon: Settings, title: 'Discovery & Architecture', desc: 'We analyse your requirements and design a scalable, secure system architecture.' },
  { icon: Code, title: 'Agile Engineering', desc: 'Iterative development with CI/CD, code reviews, and automated testing.' },
  { icon: Rocket, title: 'Deployment & Scaling', desc: 'Zero-downtime deployment to production cloud environments.' },
  { icon: Shield, title: 'Security Hardening', desc: 'Penetration testing, OWASP compliance, and infrastructure auditing.' },
  { icon: Headset, title: 'Ongoing Support', desc: 'Proactive monitoring, SLA-backed maintenance, and feature iteration.' },
];

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const structuredData = {
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: 'AESCION EDTECH SOLUTIONS'
    },
    description: service.metaDescription,
  };

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
              <div className="prose prose-lg text-neutral-600 max-w-none">
                <p>
                  At AESCION, our {service.title.toLowerCase()} practice is built on years of real-world production experience
                  across finance, healthcare, education, and enterprise SaaS. We don&apos;t just write code — we architect
                  systems that are resilient, observable, and built to scale from day one.
                </p>
                <p>
                  Every project begins with a deep technical discovery phase where our senior architects work directly with
                  your stakeholders to understand business requirements, compliance constraints, and performance targets before
                  a single line of code is written.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Core Capabilities</h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
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

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader badge="Core Capabilities" title="What's Included" align="left" />
              <div className="space-y-6 mt-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{feature}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
              <h3 className="text-2xl font-bold mb-6">Business Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-600">
                    <ArrowRight className="w-5 h-5 text-primary-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Technology Stack" description="Purpose-built technologies selected for optimal performance and scale." isDark />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
            {service.technologies.map((tech) => (
              <div key={tech} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center font-medium text-neutral-300 hover:border-primary-500/50 hover:text-white transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Our Engineering Process" description="A battle-tested methodology that ensures successful delivery on time and within budget." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
            {processSteps.map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-5 text-primary-600">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader title="Frequently Asked Questions" />
          <DynamicAccordion items={service.faqs} />
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
            <Link href="/solutions" className="px-8 py-4 border border-primary-400 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors">
              View Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
