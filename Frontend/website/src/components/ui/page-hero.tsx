import React from 'react';
import { Breadcrumb } from '../layout/breadcrumb';

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  bgClassName?: string;
}

export function PageHero({ title, description, breadcrumbs, bgClassName = 'bg-primary-900 text-white' }: PageHeroProps) {
  return (
    <section className={`relative pt-32 pb-24 overflow-hidden ${bgClassName}`}>
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight max-w-4xl">
          {title}
        </h1>
        
        {description && (
          <p className="text-xl md:text-2xl text-primary-100 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
