'use client';

import React from 'react';
import { FileSignature, MoreHorizontal, Eye } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Application = { id: string; name: string; email: string; type: string; position: string; status: string; date: string };

const apps: Application[] = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@email.com', type: 'Career', position: 'Full Stack Developer', status: 'submitted', date: 'Today' },
  { id: '2', name: 'Priya Sharma', email: 'priya@email.com', type: 'Internship', position: 'Data Science Intern', status: 'in_progress', date: 'Yesterday' },
  { id: '3', name: 'Amit Patel', email: 'amit@email.com', type: 'Training', position: 'Cloud Computing Course', status: 'approved', date: '2 days ago' },
  { id: '4', name: 'Sara Wilson', email: 'sara@email.com', type: 'Career', position: 'UI/UX Designer', status: 'rejected', date: 'Last week' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@email.com', type: 'Corporate', position: 'Enterprise Partnership', status: 'submitted', date: 'Today' },
];

const columns: ColumnDef<Application>[] = [
  { accessorKey: 'name', header: 'Applicant', cell: ({ row }) => <div><div className="text-sm font-medium text-gray-900">{row.original.name}</div><div className="text-xs text-gray-400">{row.original.email}</div></div> },
  { accessorKey: 'type', header: 'Type', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{row.original.type}</span> },
  { accessorKey: 'position', header: 'Position / Course' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'date', header: 'Date' },
  { id: 'actions', header: '', cell: () => <div className="flex items-center gap-1"><button className="p-1 hover:bg-gray-100 rounded"><Eye className="w-3.5 h-3.5 text-gray-400" /></button><button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button></div> },
];

export default function ApplicationsPage() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="space-y-4">
      <PageHeader title="Application Management" description="Review career, internship, and training applications">
      </PageHeader>
      <TabNav tabs={[{ id: 'all', label: 'All', count: 5 }, { id: 'career', label: 'Career', count: 2 }, { id: 'internship', label: 'Internship', count: 1 }, { id: 'training', label: 'Training', count: 1 }, { id: 'corporate', label: 'Corporate', count: 1 }]} activeTab={tab} onChange={setTab} />
      <DataTable columns={columns} data={apps} searchKey="name" searchPlaceholder="Search applicants..." />
    </div>
  );
}
