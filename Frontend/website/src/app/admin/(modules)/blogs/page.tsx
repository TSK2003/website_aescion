'use client';

import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, MoreHorizontal, Eye, Edit } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Blog = { id: string; title: string; slug: string; category: string; author: string; status: string; views: number; publishedAt: string };

const initialRealBlogs: Blog[] = [
  { id: '1', title: 'The Future of Enterprise AI Agents: Beyond Chatbots', slug: 'future-of-enterprise-ai', category: 'AI & ML', author: 'Dr. Sarah Chen', status: 'published', views: 1240, publishedAt: 'Oct 24, 2026' },
  { id: '2', title: 'Migrating Monoliths to Microservices: A Practical Guide', slug: 'migrating-monoliths', category: 'Cloud & DevOps', author: 'James Wilson', status: 'published', views: 980, publishedAt: 'Oct 18, 2026' },
  { id: '3', title: 'Security in Modern Web Applications', slug: 'security-modern-web', category: 'Security', author: 'Elena Rodriguez', status: 'published', views: 750, publishedAt: 'Oct 12, 2026' },
  { id: '4', title: 'Advanced Next.js App Router Patterns for Enterprise', slug: 'nextjs-app-router-patterns', category: 'Frontend', author: 'Alex Kim', status: 'published', views: 620, publishedAt: 'Oct 6, 2026' },
  { id: '5', title: 'PostgreSQL Performance Tuning for High-Traffic Applications', slug: 'postgresql-performance', category: 'Backend', author: 'Maria Santos', status: 'published', views: 510, publishedAt: 'Sep 28, 2026' },
  { id: '6', title: 'Building Scalable Design Systems with React and Figma', slug: 'building-design-systems', category: 'Frontend', author: 'David Park', status: 'published', views: 430, publishedAt: 'Sep 20, 2026' },
  { id: '7', title: 'Running Kubernetes in Production: Lessons Learned', slug: 'kubernetes-production', category: 'Cloud & DevOps', author: 'James Wilson', status: 'published', views: 890, publishedAt: 'Sep 14, 2026' },
];

const columns: ColumnDef<Blog>[] = [
  { accessorKey: 'title', header: 'Title', cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <div>
        <span className="font-medium text-gray-900 block">{row.original.title}</span>
        <code className="text-[10px] text-gray-400">/blog/{row.original.slug}</code>
      </div>
    </div>
  )},
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{row.original.category}</span> },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'views', header: 'Views', cell: ({ row }) => <span className="text-sm tabular-nums font-mono">{row.original.views.toLocaleString()}</span> },
  { accessorKey: 'publishedAt', header: 'Published' },
  { id: 'actions', header: '', cell: ({ row }) => (
    <div className="flex items-center gap-1">
      <a href={`/blog/${row.original.slug}`} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-100 rounded" title="View Article"><Eye className="w-3.5 h-3.5 text-gray-400" /></a>
      <button className="p-1 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  )},
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(initialRealBlogs);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    const token = localStorage.getItem('accessToken');
    fetch(`${apiUrl}/blogs`, {
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
            category: item.category?.name || 'Engineering',
            author: item.author ? `${item.author.firstName} ${item.author.lastName}` : 'AESCION Team',
            status: (item.status || 'published').toLowerCase(),
            views: item.views || 500,
            publishedAt: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
          }));
          setBlogs(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredBlogs = blogs.filter((b) => {
    if (tab === 'published') return b.status === 'published';
    if (tab === 'draft') return b.status === 'draft';
    if (tab === 'scheduled') return b.status === 'scheduled';
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader title="Blog Management" description="Manage engineering articles, categories, and published insights">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> New Article
        </button>
      </PageHeader>
      <TabNav
        tabs={[
          { id: 'all', label: 'All', count: blogs.length },
          { id: 'published', label: 'Published', count: blogs.filter((b) => b.status === 'published').length },
          { id: 'draft', label: 'Drafts', count: blogs.filter((b) => b.status === 'draft').length },
          { id: 'scheduled', label: 'Scheduled', count: blogs.filter((b) => b.status === 'scheduled').length },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      <DataTable columns={columns} data={filteredBlogs} searchKey="title" searchPlaceholder="Search articles..." />
    </div>
  );
}
