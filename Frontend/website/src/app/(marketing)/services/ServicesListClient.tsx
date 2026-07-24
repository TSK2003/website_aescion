'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import * as Icons from 'lucide-react';

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon?: string;
  features: string[];
}

export function ServicesListClient() {
  const { data: services = [], isLoading, isError } = useQuery<ServiceItem[]>({
    queryKey: ['services', 'public'],
    queryFn: async () => {
      const res = await api.get('/services/public');
      return Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
    },
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-8 bg-neutral-100 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || services.length === 0) {
    return (
      <section className="py-24 bg-neutral-50 text-center">
        <div className="container mx-auto px-6 max-w-md">
          <Icons.Cpu className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No Services Found</h3>
          <p className="text-neutral-600 mb-6">Check back soon or contact us for custom engineering solutions.</p>
          <Link href="/contact" className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
            Contact Support
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = (service.icon && (Icons as any)[service.icon]) ? (Icons as any)[service.icon] : Icons.Code;
            return (
              <Link 
                href={`/services/${service.slug}`} 
                key={service.slug || service.id}
                className="group flex flex-col p-8 bg-white border border-neutral-200 rounded-2xl hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-8 flex-1 leading-relaxed">
                  {service.shortDescription}
                </p>
                
                {Array.isArray(service.features) && service.features.length > 0 && (
                  <div className="flex flex-col gap-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-500">
                        <div className="w-1 h-1 rounded-full bg-primary-400"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mt-auto group-hover:text-primary-700 transition-colors">
                  Explore Service <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
