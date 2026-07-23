'use client';

import React, { useState } from 'react';
import { Plus, GraduationCap, Edit } from 'lucide-react';
import { PageHeader, StatusBadge, TabNav } from '@/components/admin/ui/Primitives';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type Course = { id: string; title: string; category: string; level: string; duration: string; enrolled: number; status: string; trainer: string };

const realCourses: Course[] = [
  { id: '1', title: 'Full-Stack Engineering (React, Next.js, NestJS)', category: 'Engineering', level: 'Intermediate', duration: '4-12 weeks', enrolled: 64, status: 'published', trainer: 'Karthick S' },
  { id: '2', title: 'Cloud Architecture & DevOps (AWS, K8s, Docker)', category: 'DevOps', level: 'Advanced', duration: '4-8 weeks', enrolled: 42, status: 'published', trainer: 'James Wilson' },
  { id: '3', title: 'AI & Data Science (PyTorch, LLMs, LangChain)', category: 'AI & Data', level: 'Advanced', duration: '6-12 weeks', enrolled: 55, status: 'published', trainer: 'Dr. Sarah Chen' },
  { id: '4', title: 'Database Architecture & Performance Tuning (PostgreSQL)', category: 'Backend', level: 'Intermediate', duration: '2-4 weeks', enrolled: 30, status: 'published', trainer: 'Maria Santos' },
  { id: '5', title: 'Cybersecurity & Zero Trust Engineering', category: 'Security', level: 'Advanced', duration: '4-6 weeks', enrolled: 28, status: 'published', trainer: 'Elena Rodriguez' },
  { id: '6', title: 'Mobile App Engineering (React Native, Flutter)', category: 'Mobile', level: 'Intermediate', duration: '4-8 weeks', enrolled: 38, status: 'published', trainer: 'Alex Kim' },
];

const columns: ColumnDef<Course>[] = [
  { accessorKey: 'title', header: 'Course Title', cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <div>
        <span className="font-medium text-gray-900 block">{row.original.title}</span>
        <span className="text-[10px] text-gray-400">{row.original.duration}</span>
      </div>
    </div>
  )},
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full font-medium">{row.original.category}</span> },
  { accessorKey: 'level', header: 'Level' },
  { accessorKey: 'enrolled', header: 'Enrolled', cell: ({ row }) => <span className="font-mono text-sm">{row.original.enrolled} students</span> },
  { accessorKey: 'trainer', header: 'Lead Trainer' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { id: 'actions', header: '', cell: () => (
    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
    </div>
  )},
];

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>(realCourses);
  const [tab, setTab] = useState('courses');

  return (
    <div className="space-y-4">
      <PageHeader title="Corporate Training Management" description="Manage enterprise workshops, curriculum domains, trainers, and enrolled cohorts">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> New Course
        </button>
      </PageHeader>
      <TabNav
        tabs={[
          { id: 'courses', label: 'Courses', count: courses.length },
          { id: 'enrollments', label: 'Enrollments', count: 257 },
          { id: 'certificates', label: 'Certificates' },
          { id: 'reports', label: 'Reports' },
        ]}
        activeTab={tab}
        onChange={setTab}
      />
      <DataTable columns={columns} data={courses} searchKey="title" searchPlaceholder="Search courses..." />
    </div>
  );
}
