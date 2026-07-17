'use client';

import React from 'react';
import { Plus, Building2, MoreHorizontal } from 'lucide-react';
import { PageHeader, StatusBadge } from '@/components/ui/Primitives';
import { DataTable } from '@/components/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type OrgUnit = { id: string; name: string; type: string; parent: string; members: number; status: string };

const data: OrgUnit[] = [
  { id: '1', name: 'AESCION Pvt Ltd', type: 'Company', parent: '—', members: 45, status: 'active' },
  { id: '2', name: 'Technology', type: 'Department', parent: 'AESCION Pvt Ltd', members: 18, status: 'active' },
  { id: '3', name: 'Marketing', type: 'Department', parent: 'AESCION Pvt Ltd', members: 8, status: 'active' },
  { id: '4', name: 'Chennai Branch', type: 'Branch', parent: 'AESCION Pvt Ltd', members: 30, status: 'active' },
  { id: '5', name: 'Training Academy', type: 'Academic Unit', parent: 'AESCION Pvt Ltd', members: 12, status: 'active' },
];

const columns: ColumnDef<OrgUnit>[] = [
  { accessorKey: 'name', header: 'Name', cell: ({ row }) => <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-400" /><span className="font-medium text-gray-900">{row.original.name}</span></div> },
  { accessorKey: 'type', header: 'Type', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{row.original.type}</span> },
  { accessorKey: 'parent', header: 'Parent' },
  { accessorKey: 'members', header: 'Members' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { id: 'actions', header: '', cell: () => <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button> },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Organization Management" description="Manage branches, departments, and business units">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Plus className="w-3.5 h-3.5" /> Add Unit</button>
      </PageHeader>
      <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Search organizations..." />
    </div>
  );
}
