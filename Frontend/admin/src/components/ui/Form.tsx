import React from 'react';
import { cn } from '@/lib/utils';

/* ======================================================
   FORM SYSTEM
   Layouts: Single Column, Double Column, Section Cards
   ====================================================== */

export const FormSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { title: string; description?: string }>(
  ({ className, title, description, children, ...props }, ref) => (
    <div ref={ref} className={cn('bg-white border border-gray-200 rounded-lg p-6 mb-6', className)} {...props}>
      <div className="mb-5 border-b border-gray-100 pb-4">
        <h3 className="text-h4 font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  )
);
FormSection.displayName = 'FormSection';

export const FormGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { cols?: 1 | 2 | 3 }>(
  ({ className, cols = 2, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        'grid gap-5', 
        cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3',
        className
      )} 
      {...props} 
    />
  )
);
FormGrid.displayName = 'FormGrid';

export const FormActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200', className)} {...props} />
  )
);
FormActions.displayName = 'FormActions';
