'use client';

import React from 'react';
import { Plus, FileText, MoreHorizontal, Eye } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Page = { id: string; title: string; slug: string; status: string; updatedAt: string; author: string };

const pages: Page[] = [
  { id: '1', title: 'Homepage', slug: '/', status: 'published', updatedAt: 'Today', author: 'Admin' },
  { id: '2', title: 'About Us', slug: '/about', status: 'published', updatedAt: 'Yesterday', author: 'Admin' },
  { id: '3', title: 'Services', slug: '/services', status: 'published', updatedAt: '2 days ago', author: 'Editor' },
  { id: '4', title: 'Solutions', slug: '/solutions', status: 'draft', updatedAt: '3 days ago', author: 'Admin' },
  { id: '5', title: 'Industries', slug: '/industries', status: 'draft', updatedAt: '5 days ago', author: 'Editor' },
  { id: '6', title: 'Training', slug: '/training', status: 'published', updatedAt: 'Today', author: 'Admin' },
  { id: '7', title: 'Internship', slug: '/internship', status: 'published', updatedAt: 'Yesterday', author: 'Admin' },
  { id: '8', title: 'Contact', slug: '/contact', status: 'published', updatedAt: 'Last week', author: 'Admin' },
];

const columns: ColumnDef<Page>[] = [
  { accessorKey: 'title', header: 'Page Title', cell: ({ row }) => <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400" /><span className="font-medium text-gray-900">{row.original.title}</span></div> },
  { accessorKey: 'slug', header: 'Slug', cell: ({ row }) => <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded text-gray-500">{row.original.slug}</code> },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'updatedAt', header: 'Updated' },
  { id: 'actions', header: '', cell: () => (
    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-gray-100 rounded" title="Preview"><Eye className="w-3.5 h-3.5 text-gray-400" /></button>
      <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
    </div>
  )},
];

export default function CmsPage() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="space-y-4">
      <PageHeader title="Content Management" description="Manage all website pages, blocks, and components">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Plus className="w-3.5 h-3.5" /> Create Page</button>
      </PageHeader>
      <TabNav tabs={[{ id: 'all', label: 'All Pages', count: 8 }, { id: 'published', label: 'Published', count: 6 }, { id: 'draft', label: 'Drafts', count: 2 }, { id: 'archived', label: 'Archived' }]} activeTab={tab} onChange={setTab} />
      <DataTable columns={columns} data={pages} searchKey="title" searchPlaceholder="Search pages..." />
    </div>
  );
}
