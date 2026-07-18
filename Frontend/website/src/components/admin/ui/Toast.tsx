import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/* ======================================================
   TOAST NOTIFICATION SYSTEM
   ====================================================== */

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: (id: string) => void;
}

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export function Toast({ id, title, description, type = 'info', onClose }: ToastProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-soft-lg rounded-lg p-4 max-w-sm w-full flex items-start gap-3 animate-slide-up relative overflow-hidden">
      {/* Accent line */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1",
        type === 'success' && 'bg-emerald-500',
        type === 'error' && 'bg-red-500',
        type === 'warning' && 'bg-amber-500',
        type === 'info' && 'bg-blue-500'
      )} />
      
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>

      <button 
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Simple Toast Container for presentation
export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[], onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
