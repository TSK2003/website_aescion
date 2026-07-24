import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/* ======================================================
   TOAST NOTIFICATION SYSTEM
   ====================================================== */

export interface ToastProps {
  id?: string;
  title?: string;
  message?: string;
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

export function Toast({ id = 'toast-1', title, message, description, type = 'info', onClose }: ToastProps) {
  const displayTitle = title || message || 'Notification';
  const displayDescription = description || (title && message ? message : undefined);

  return (
    <div className="fixed top-20 right-6 z-50 bg-white border border-neutral-200 shadow-xl rounded-2xl p-4 max-w-sm w-full flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
      {/* Accent line */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl',
          type === 'success' && 'bg-emerald-500',
          type === 'error' && 'bg-rose-500',
          type === 'warning' && 'bg-amber-500',
          type === 'info' && 'bg-blue-500'
        )}
      />

      <div className="flex-shrink-0 mt-0.5">{icons[type] || icons.info}</div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-neutral-900 leading-snug">{displayTitle}</p>
        {displayDescription && <p className="text-[11px] text-neutral-500 mt-0.5">{displayDescription}</p>}
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Simple Toast Container for presentation
export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id || String(Math.random())} className="pointer-events-auto">
          <Toast {...toast} id={toast.id || 'toast-item'} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
