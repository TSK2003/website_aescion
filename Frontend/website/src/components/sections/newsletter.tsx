'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await api.post('/newsletter/subscribe', { email });
      setStatus('success');
      setMessage(res.data?.message || 'Thank you for subscribing!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.response?.data?.message || err?.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-primary-50 text-neutral-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-white border border-primary-200 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-sm">
          
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-neutral-900">
              Stay ahead in enterprise tech.
            </h2>
            <p className="text-neutral-600 text-lg">
              Get our monthly digest containing software architecture patterns, AI trends, and cloud best practices.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md relative z-10">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email" 
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner disabled:opacity-50"
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors whitespace-nowrap shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {message}
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {message}
              </div>
            )}

            <p className="text-xs text-neutral-500 mt-4">
              We care about your data in our <Link href="/privacy-policy" className="underline hover:text-neutral-700">privacy policy</Link>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
