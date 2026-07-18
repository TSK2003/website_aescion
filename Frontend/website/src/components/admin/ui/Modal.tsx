import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

/* ======================================================
   MODAL SYSTEM
   Sizes: xs, sm, md, lg, xl, full
   ====================================================== */

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[95vw] h-[95vh]',
};

export function Modal({ isOpen, onClose, title, description, size = 'md', children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in p-4 sm:p-6">
      <div 
        className={cn(
          'bg-white rounded-lg shadow-soft-xl flex flex-col overflow-hidden animate-scale-in w-full',
          sizeClasses[size],
          size === 'full' && 'rounded-xl'
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            {title && <h2 className="text-h4 font-semibold text-gray-900">{title}</h2>}
            {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className={cn('p-6 overflow-y-auto flex-1', size === 'full' && 'p-8')}>
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
