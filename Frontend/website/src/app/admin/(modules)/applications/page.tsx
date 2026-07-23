'use client';

import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Application = { id: string; name: string; email: string; type: string; position: string; status: string; date: string };

const initialApps: Application[] = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul.k@gmail.com', type: 'Career', position: 'Full-Stack Software Engineer', status: 'submitted', date: 'Today' },
  { id: '2', name: 'Priya Sharma', email: 'priya.sharma@collegemail.edu', type: 'Internship', position: 'AI & Machine Learning Intern', status: 'under_review', date: 'Yesterday' },
  { id: '3', name: 'Amit Patel', email: 'amit.patel@corporate.in', type: 'Corporate', position: 'Custom ERP Workshop', status: 'shortlisted', date: '2 days ago' },
  { id: '4', name: 'Sara Wilson', email: 'sara.w@techdesign.io', type: 'Career', position: 'Senior UI/UX Designer', status: 'interview_scheduled', date: '3 days ago' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@gmail.com', type: 'Training', position: 'Cloud & DevOps Intensive', status: 'selected', date: 'Last week' },
];

const columns: ColumnDef<Application>[] = [
  { accessorKey: 'name', header: 'Applicant Name', cell: ({ row }) => (
    <div>
      <div className="text-sm font-semibold text-gray-900">{row.original.name}</div>
      <div className="text-xs text-gray-400 font-mono">{row.original.email}</div>
    </div>
  )},
  { accessorKey: 'type', header: 'Category', cell: ({ row }) => <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{row.original.type}</span> },
  { accessorKey: 'position', header: 'Role / Program', cell: ({ row }) => <span className="text-sm font-medium text-gray-800">{row.original.position}</span> },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'date', header: 'Submitted' },
  { id: 'actions', header: '', cell: () => (
    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-gray-100 rounded" title="View Application Details"><Eye className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  )},
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    const token = localStorage.getItem('accessToken');
    fetch(`${apiUrl}/applications`, {
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
            name: `${item.firstName} ${item.lastName}`,
            email: item.email,
            type: item.type || 'Career',
            position: item.position || 'Software Engineering',
            status: (item.status || 'submitted').toLowerCase(),
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently',
          }));
          setApps(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredApps = apps.filter((a) => {
    if (tab === 'career') return a.type.toLowerCase() === 'career';
    if (tab === 'internship') return a.type.toLowerCase() === 'internship';
    if (tab === 'training') return a.type.toLowerCase() === 'training';
    if (tab === 'corporate') return a.type.toLowerCase() === 'corporate';
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader title="Applications Center" description="Review candidate submissions for careers, internship programs, and corporate training">
      </PageHeader>
      <TabNav
        tabs={[
          { id: 'all', label: 'All Submissions', count: apps.length },
          { id: 'career', label: 'Careers', count: apps.filter((a) => a.type.toLowerCase() === 'career').length },
          { id: 'internship', label: 'Internships', count: apps.filter((a) => a.type.toLowerCase() === 'internship').length },
          { id: 'training', label: 'Training', count: apps.filter((a) => a.type.toLowerCase() === 'training').length },
          { id: 'corporate', label: 'Corporate', count: apps.filter((a) => a.type.toLowerCase() === 'corporate').length },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      <DataTable columns={columns} data={filteredApps} searchKey="name" searchPlaceholder="Search candidate applications..." />
    </div>
  );
}
