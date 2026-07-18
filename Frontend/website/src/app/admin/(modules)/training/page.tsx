'use client';

import React from 'react';
import { Plus, GraduationCap, MoreHorizontal } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Course = { id: string; title: string; category: string; level: string; enrolled: number; status: string; trainer: string };

const courses: Course[] = [
  { id: '1', title: 'Full Stack Development', category: 'Engineering', level: 'Intermediate', enrolled: 32, status: 'published', trainer: 'Karthick S' },
  { id: '2', title: 'Python for Data Science', category: 'Data', level: 'Beginner', enrolled: 45, status: 'published', trainer: 'Jane Smith' },
  { id: '3', title: 'Cloud Computing with AWS', category: 'DevOps', level: 'Advanced', enrolled: 18, status: 'draft', trainer: 'John Doe' },
  { id: '4', title: 'UI/UX Design Fundamentals', category: 'Design', level: 'Beginner', enrolled: 25, status: 'published', trainer: 'Alice Brown' },
];

const columns: ColumnDef<Course>[] = [
  { accessorKey: 'title', header: 'Course', cell: ({ row }) => <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-gray-400" /><span className="font-medium text-gray-900">{row.original.title}</span></div> },
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full">{row.original.category}</span> },
  { accessorKey: 'level', header: 'Level' },
  { accessorKey: 'enrolled', header: 'Enrolled' },
  { accessorKey: 'trainer', header: 'Trainer' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { id: 'actions', header: '', cell: () => <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button> },
];

export default function TrainingPage() {
  const [tab, setTab] = React.useState('courses');
  return (
    <div className="space-y-4">
      <PageHeader title="Training Management" description="Manage courses, modules, and enrollments">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Plus className="w-3.5 h-3.5" /> New Course</button>
      </PageHeader>
      <TabNav tabs={[{ id: 'courses', label: 'Courses', count: 4 }, { id: 'enrollments', label: 'Enrollments' }, { id: 'certificates', label: 'Certificates' }, { id: 'reports', label: 'Reports' }]} activeTab={tab} onChange={setTab} />
      <DataTable columns={columns} data={courses} searchKey="title" searchPlaceholder="Search courses..." />
    </div>
  );
}
