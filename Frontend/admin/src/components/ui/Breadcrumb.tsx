import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

/* ======================================================
   BREADCRUMB SYSTEM
   ====================================================== */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-900 font-semibold" aria-current="page">
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </span>
              )}

              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
