import React from 'react';

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  bgClassName?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="pt-32 pb-12 bg-white text-neutral-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-neutral-900">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
