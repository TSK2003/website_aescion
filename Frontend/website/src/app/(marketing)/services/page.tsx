import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { cmsClient } from '@aescion/api-client';
import Link from 'next/link';
import { ArrowRight, Code, Cpu, Cloud, Smartphone, Layout, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Services | AESCION',
  description: 'Explore our enterprise software development, AI solutions, and cloud architecture services.',
};

const iconMap: Record<string, any> = {
  'software-development': Code,
  'ai-automation': Cpu,
  'cloud-infrastructure': Cloud,
  'mobile-applications': Smartphone,
  'ui-ux-design': Layout,
  'maintenance': Wrench,
};

export default async function ServicesPage() {
  const services = await cmsClient.services.getAll();

  return (
    <>
      <PageHero 
        title="Engineering Capabilities"
        description="Comprehensive digital transformation services tailored for enterprise scale. We architect, build, and deploy mission-critical software."
        breadcrumbs={[{ label: 'Services' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.slug] || Code;
              return (
                <Link 
                  href={`/services/${service.slug}`} 
                  key={service.slug}
                  className="group flex flex-col p-8 bg-white border border-neutral-200 rounded-2xl hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-8 flex-1 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-500">
                        <div className="w-1 h-1 rounded-full bg-primary-400"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mt-auto group-hover:text-primary-700 transition-colors">
                    Explore Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

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
