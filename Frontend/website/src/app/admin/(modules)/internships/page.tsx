'use client';

import React, { useState } from 'react';
import { Plus, Briefcase, Edit } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Program = { id: string; title: string; duration: string; applications: number; active: number; status: string };

const realPrograms: Program[] = [
  { id: '1', title: 'Full-Stack Development Intern', duration: '12 weeks (3 months)', applications: 148, active: 12, status: 'active' },
  { id: '2', title: 'Cloud Engineering & DevOps Intern', duration: '12 weeks (3 months)', applications: 92, active: 8, status: 'active' },
  { id: '3', title: 'AI & Machine Learning Intern', duration: '12 weeks (3 months)', applications: 115, active: 10, status: 'active' },
  { id: '4', title: 'Data Engineering & Analytics Intern', duration: '12 weeks (3 months)', applications: 64, active: 6, status: 'active' },
  { id: '5', title: 'Mobile App Development Intern (React Native/Flutter)', duration: '12 weeks (3 months)', applications: 78, active: 7, status: 'active' },
  { id: '6', title: 'Cybersecurity & Zero-Trust Intern', duration: '12 weeks (3 months)', applications: 45, active: 5, status: 'active' },
];

const columns: ColumnDef<Program>[] = [
  { accessorKey: 'title', header: 'Program Title', cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <span className="font-medium text-gray-900">{row.original.title}</span>
    </div>
  )},
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'applications', header: 'Applications', cell: ({ row }) => <span className="font-mono text-sm">{row.original.applications}</span> },
  { accessorKey: 'active', header: 'Active Interns', cell: ({ row }) => <span className="font-mono text-sm font-semibold text-primary">{row.original.active}</span> },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { id: 'actions', header: '', cell: () => (
    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  )},
];

export default function InternshipsPage() {
  const [programs, setPrograms] = useState<Program[]>(realPrograms);
  const [tab, setTab] = useState('programs');

  return (
    <div className="space-y-4">
      <PageHeader title="Internship Program Management" description="Manage domain tracks, candidate applications, mentors, and active cohorts">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> New Program
        </button>
      </PageHeader>
      <TabNav
        tabs={[
          { id: 'programs', label: 'Programs', count: programs.length },
          { id: 'applications', label: 'Applications', count: 542 },
          { id: 'active', label: 'Active Interns', count: 48 },
          { id: 'completed', label: 'Completed' },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      <DataTable columns={columns} data={programs} searchKey="title" searchPlaceholder="Search programs..." />
    </div>
  );
}
