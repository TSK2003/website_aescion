'use client';

import React from 'react';
import { Plus, BookOpen, MoreHorizontal, Eye } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/ui/Primitives';
import { DataTable } from '@/components/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Blog = { id: string; title: string; category: string; author: string; status: string; views: number; publishedAt: string };

const blogs: Blog[] = [
  { id: '1', title: 'AI in Modern Education', category: 'Technology', author: 'Admin', status: 'published', views: 1240, publishedAt: 'Today' },
  { id: '2', title: 'Future of Web Development', category: 'Engineering', author: 'Editor', status: 'published', views: 980, publishedAt: 'Yesterday' },
  { id: '3', title: 'Why Choose AESCION', category: 'Company', author: 'Admin', status: 'draft', views: 0, publishedAt: '—' },
  { id: '4', title: 'Building Enterprise Software', category: 'Engineering', author: 'Admin', status: 'scheduled', views: 0, publishedAt: 'Jul 20' },
  { id: '5', title: 'Training Program Overview', category: 'Training', author: 'Editor', status: 'published', views: 560, publishedAt: 'Last week' },
];

const columns: ColumnDef<Blog>[] = [
  { accessorKey: 'title', header: 'Title', cell: ({ row }) => <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-gray-400" /><span className="font-medium text-gray-900">{row.original.title}</span></div> },
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{row.original.category}</span> },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'views', header: 'Views', cell: ({ row }) => <span className="text-sm tabular-nums">{row.original.views.toLocaleString()}</span> },
  { accessorKey: 'publishedAt', header: 'Published' },
  { id: 'actions', header: '', cell: () => <div className="flex items-center gap-1"><button className="p-1 hover:bg-gray-100 rounded"><Eye className="w-3.5 h-3.5 text-gray-400" /></button><button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button></div> },
];

export default function BlogsPage() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="space-y-4">
      <PageHeader title="Blog Management" description="Manage articles, categories, and tags">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Plus className="w-3.5 h-3.5" /> New Article</button>
      </PageHeader>
      <TabNav tabs={[{ id: 'all', label: 'All', count: 5 }, { id: 'published', label: 'Published', count: 3 }, { id: 'draft', label: 'Drafts', count: 1 }, { id: 'scheduled', label: 'Scheduled', count: 1 }]} activeTab={tab} onChange={setTab} />
      <DataTable columns={columns} data={blogs} searchKey="title" searchPlaceholder="Search articles..." />
    </div>
  );
}
