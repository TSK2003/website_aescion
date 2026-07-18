'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const variants: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-gray-50 text-gray-600 border-gray-200',
    inactive: 'bg-gray-50 text-gray-600 border-gray-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    submitted: 'bg-amber-50 text-amber-700 border-amber-200',
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    archived: 'bg-slate-50 text-slate-600 border-slate-200',
    deleted: 'bg-red-50 text-red-700 border-red-200',
  };

  const variant = variants[status.toLowerCase().replace(/\s/g, '_')] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border', variant, className)}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ')}
    </span>
  );
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function StatCard({ title, value, icon: Icon, trend, trendLabel }: { title: string; value: string; icon: React.ElementType; trend?: string; trendLabel?: string }) {
  const isPositive = trend?.startsWith('+');
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</span>
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <span className={cn('text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-600')}>{trend}</span>
          {trendLabel && <span className="text-xs text-gray-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ElementType; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

export function TabNav({ tabs, activeTab, onChange }: { tabs: { id: string; label: string; count?: number }[]; activeTab: string; onChange: (id: string) => void }) {
  return (
    <div className="flex items-center gap-1 border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn('ml-1.5 px-1.5 py-0.5 text-xs rounded-full', activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500')}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
