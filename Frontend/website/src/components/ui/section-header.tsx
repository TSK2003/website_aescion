import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  align?: 'left' | 'center';
  isDark?: boolean;
}

export function SectionHeader({ title, description, badge, align = 'center', isDark = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {badge && (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full font-semibold text-sm mb-6 border ${align === 'center' ? 'mx-auto' : ''} ${isDark ? 'bg-primary-900/50 text-primary-300 border-primary-800' : 'bg-primary-50 text-primary-600 border-primary-100'}`}>
          {badge}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
