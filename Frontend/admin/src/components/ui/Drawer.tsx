import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

/* ======================================================
   DRAWER SYSTEM
   Positions: left, right, bottom
   ====================================================== */

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'bottom';
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const positionClasses = {
  left: 'inset-y-0 left-0 max-w-sm w-full border-r border-gray-200 animate-slide-right',
  right: 'inset-y-0 right-0 max-w-sm w-full border-l border-gray-200', // needs animate-slide-left if added to tailwind
  bottom: 'inset-x-0 bottom-0 max-h-[80vh] rounded-t-xl border-t border-gray-200 animate-slide-up',
};

export function Drawer({ isOpen, onClose, position = 'right', title, description, children, footer, className }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/30 animate-fade-in">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div 
        className={cn(
          'absolute bg-white shadow-soft-xl flex flex-col overflow-hidden',
          positionClasses[position],
          position === 'right' && 'transform transition-transform duration-300 translate-x-0', // simplistic fallback
          className
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
        
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>

        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
