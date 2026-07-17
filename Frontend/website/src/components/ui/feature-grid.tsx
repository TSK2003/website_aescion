import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const colMap = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${colMap[columns]} gap-8`}>
      {features.map((feature, idx) => (
        <div key={idx} className="p-8 rounded-2xl bg-white border border-neutral-200 hover:shadow-lg transition-shadow">
          <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600">
            <feature.icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
          <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
