'use client';

import React, { useState, useEffect } from 'react';
import { Plus, FileText, Eye, Edit } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type PageItem = { id: string; title: string; slug: string; status: string; updatedAt: string; author: string };

const realWebsitePages: PageItem[] = [
  { id: '1', title: 'Homepage', slug: '/', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '2', title: 'About Us', slug: '/about', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '3', title: 'Services', slug: '/services', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '4', title: 'Solutions', slug: '/solutions', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '5', title: 'Industries', slug: '/industries', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '6', title: 'Training', slug: '/training', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '7', title: 'Internship', slug: '/internship', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '8', title: 'Blog', slug: '/blog', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
  { id: '9', title: 'Contact', slug: '/contact', status: 'published', updatedAt: 'Recently', author: 'Super Admin' },
];

const columns: ColumnDef<PageItem>[] = [
  { accessorKey: 'title', header: 'Page Title', cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <span className="font-medium text-gray-900">{row.original.title}</span>
    </div>
  )},
  { accessorKey: 'slug', header: 'Slug', cell: ({ row }) => <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded text-gray-500">{row.original.slug}</code> },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'updatedAt', header: 'Updated' },
  { id: 'actions', header: '', cell: ({ row }) => (
    <div className="flex items-center gap-1">
      <a href={row.original.slug} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-100 rounded" title="Preview Page"><Eye className="w-3.5 h-3.5 text-gray-400" /></a>
      <button className="p-1 hover:bg-gray-100 rounded" title="Edit Page"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  )},
];

export default function CmsPage() {
  const [pages, setPages] = useState<PageItem[]>(realWebsitePages);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    const token = localStorage.getItem('accessToken');
    fetch(`${apiUrl}/pages`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        const list = resData?.data?.data || resData?.data || resData;
        if (Array.isArray(list) && list.length > 0) {
          const mapped = list.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            status: (item.status || 'published').toLowerCase(),
            author: 'Super Admin',
            updatedAt: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Recently',
          }));
          setPages(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPages = pages.filter((p) => {
    if (tab === 'published') return p.status === 'published';
    if (tab === 'draft') return p.status === 'draft';
    if (tab === 'archived') return p.status === 'archived';
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader title="Content Management" description="Manage all live website pages, page builders, and SEO metadata">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> Create Page
        </button>
      </PageHeader>
      <TabNav
        tabs={[
          { id: 'all', label: 'All Pages', count: pages.length },
          { id: 'published', label: 'Published', count: pages.filter((p) => p.status === 'published').length },
          { id: 'draft', label: 'Drafts', count: pages.filter((p) => p.status === 'draft').length },
          { id: 'archived', label: 'Archived', count: pages.filter((p) => p.status === 'archived').length },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      <DataTable columns={columns} data={filteredPages} searchKey="title" searchPlaceholder="Search pages..." />
    </div>
  );
}
