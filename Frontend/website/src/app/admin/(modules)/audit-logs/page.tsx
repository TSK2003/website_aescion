'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Activity, Search, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type AuditLogItem = {
  id: string;
  module: string;
  action: string;
  entityType?: string;
  entityId?: string;
  ipAddress?: string;
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string };
};

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['audit-logs', searchTerm, moduleFilter],
    queryFn: async () => {
      const res = await api.get('/audit-logs', {
        params: {
          search: searchTerm || undefined,
          module: moduleFilter !== 'ALL' ? moduleFilter : undefined,
        },
      });
      return res.data;
    },
  });

  const logs: AuditLogItem[] = Array.isArray(data) ? data : (data?.items || data?.data || []);

  const columns: ColumnDef<AuditLogItem>[] = [
    {
      accessorKey: 'user',
      header: 'Actor',
      cell: ({ row }) => {
        const u = row.original.user;
        return (
          <div>
            <div className="text-sm font-semibold text-neutral-900">
              {u ? `${u.firstName} ${u.lastName}` : 'System Admin'}
            </div>
            <div className="text-xs text-neutral-400 font-mono">{u?.email || 'system@aescion.com'}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100 font-mono">
          {row.original.action}
        </span>
      ),
    },
    {
      accessorKey: 'module',
      header: 'Module',
      cell: ({ row }) => (
        <span className="text-xs px-2.5 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-medium border border-neutral-200">
          {row.original.module}
        </span>
      ),
    },
    {
      accessorKey: 'entityType',
      header: 'Target Entity',
      cell: ({ row }) => (
        <span className="text-xs text-neutral-600">
          {row.original.entityType || 'Global System'}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Timestamp',
      cell: ({ row }) => (
        <span className="text-xs text-neutral-500 font-mono">
          {row.original.createdAt ? new Date(row.original.createdAt).toLocaleString() : 'Recent'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary-600" /> Security & System Audit Logs
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Immutable system event logs tracking administrative actions across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ALL">All Modules</option>
            <option value="CRM">CRM</option>
            <option value="Blogs">Blogs</option>
            <option value="Services">Services</option>
            <option value="CMS">CMS</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading audit history...</p>
        </div>
      ) : isError ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-rose-600 font-semibold">
          Unable to connect to audit logging service.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={logs}
          searchKey="action"
          searchPlaceholder="Filter events..."
        />
      )}
    </div>
  );
}
