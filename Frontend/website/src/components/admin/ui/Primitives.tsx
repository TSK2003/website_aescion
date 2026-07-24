'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const s = (status || 'DEFAULT').toLowerCase().replace(/\s/g, '_');

  const variants: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    shortlisted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    inactive: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    submitted: 'bg-amber-50 text-amber-700 border-amber-200',
    under_review: 'bg-amber-50 text-amber-700 border-amber-200',
    interview_scheduled: 'bg-amber-50 text-amber-700 border-amber-200',
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    archived: 'bg-slate-100 text-slate-600 border-slate-200',
    deleted: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const variant = variants[s] || 'bg-neutral-100 text-neutral-700 border-neutral-200';

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border', variant, className)}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ')}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm mb-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{title}</h1>
        {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendLabel?: string;
}) {
  const isPositive = trend?.startsWith('+');
  return (
    <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-extrabold text-neutral-900">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <span className={cn('text-xs font-bold px-2 py-0.5 rounded-md', isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>
            {trend}
          </span>
          {trendLabel && <span className="text-xs text-neutral-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-neutral-200">
      <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

export function TabNav({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-200 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap',
            activeTab === tab.id
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                'ml-2 px-1.5 py-0.5 text-[10px] rounded-full font-bold',
                activeTab === tab.id ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
