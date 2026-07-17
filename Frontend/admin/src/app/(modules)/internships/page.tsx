'use client';

import React from 'react';
import { Plus, Briefcase, MoreHorizontal } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/ui/Primitives';
import { DataTable } from '@/components/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Program = { id: string; title: string; duration: string; applications: number; active: number; status: string };

const programs: Program[] = [
  { id: '1', title: 'Software Engineering Intern', duration: '3 months', applications: 48, active: 5, status: 'active' },
  { id: '2', title: 'Data Science Intern', duration: '6 months', applications: 32, active: 3, status: 'active' },
  { id: '3', title: 'UI/UX Design Intern', duration: '3 months', applications: 15, active: 2, status: 'draft' },
];

const columns: ColumnDef<Program>[] = [
  { accessorKey: 'title', header: 'Program', cell: ({ row }) => <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-gray-400" /><span className="font-medium text-gray-900">{row.original.title}</span></div> },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'applications', header: 'Applications' },
  { accessorKey: 'active', header: 'Active Interns' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { id: 'actions', header: '', cell: () => <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button> },
];

export default function InternshipsPage() {
  const [tab, setTab] = React.useState('programs');
  return (
    <div className="space-y-4">
      <PageHeader title="Internship Management" description="Manage programs, applications, and interns">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Plus className="w-3.5 h-3.5" /> New Program</button>
      </PageHeader>
      <TabNav tabs={[{ id: 'programs', label: 'Programs', count: 3 }, { id: 'applications', label: 'Applications', count: 95 }, { id: 'active', label: 'Active Interns', count: 10 }, { id: 'completed', label: 'Completed' }]} activeTab={tab} onChange={setTab} />
      <DataTable columns={columns} data={programs} searchKey="title" searchPlaceholder="Search programs..." />
    </div>
  );
}
