import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, description, badge, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {badge && (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm mb-6 border border-primary-100 ${align === 'center' ? 'mx-auto' : ''}`}>
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-neutral-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
