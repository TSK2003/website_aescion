'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: ToastData[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    // Auto remove after 5 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 w-auto max-w-sm px-4 py-3 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-200"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-neutral-900">
              {toast.type === 'success' ? 'Success' : 'Error'}
            </h4>
            <p className="text-sm text-neutral-600 leading-snug mt-0.5">
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors shrink-0 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
