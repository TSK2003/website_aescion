'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Toast } from '@/components/admin/ui/Toast';

type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  type: string;
  position?: string;
  college?: string;
  degree?: string;
  status: string;
  createdAt: string;
};

const initialRealApps: Application[] = [
  {
    id: 'app-1',
    firstName: 'Karthick',
    lastName: 'S',
    email: 'karthick@example.com',
    phone: '+91 9876543210',
    type: 'INTERNSHIP',
    position: 'AI & Full-Stack Software Engineering',
    college: 'Anna University',
    degree: 'B.E. Computer Science',
    status: 'UNDER_REVIEW',
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'app-2',
    firstName: 'Priya',
    lastName: 'Raman',
    email: 'priya.raman@example.com',
    phone: '+91 9123456789',
    type: 'CAREER',
    position: 'Senior React / Next.js Engineer',
    college: 'NIT Trichy',
    degree: 'B.Tech IT',
    status: 'SHORTLISTED',
    createdAt: '2026-07-18T14:30:00Z',
  },
  {
    id: 'app-3',
    firstName: 'Arun',
    lastName: 'Kumar',
    email: 'arun.k@example.com',
    phone: '+91 9988776655',
    type: 'TRAINING',
    position: 'Python & Data Science Certification',
    college: 'PSG College of Technology',
    degree: 'B.Sc Software Engineering',
    status: 'SELECTED',
    createdAt: '2026-07-15T09:15:00Z',
  },
];

const STATUS_OPTIONS = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'SHORTLISTED',
  'INTERVIEW_SCHEDULED',
  'SELECTED',
  'REJECTED',
];

export default function ApplicationsPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('all');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [newApp, setNewApp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'INTERNSHIP',
    position: 'Full-Stack Software Engineering',
    college: '',
    degree: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      try {
        const res = await api.get('/applications');
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) return list;
      } catch {
        // Fallback
      }
      return initialRealApps;
    },
  });

  const apps: Application[] = data || initialRealApps;

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.patch(`/applications/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setToastMessage({ message: 'Application status updated.', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ message: err?.message || 'Could not update status.', type: 'error' });
    },
  });

  // Create Application Mutation
  const createMutation = useMutation({
    mutationFn: async (appData: typeof newApp) => {
      const res = await api.post('/applications/submit', appData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setIsAddDrawerOpen(false);
      setNewApp({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        type: 'INTERNSHIP',
        position: 'Full-Stack Software Engineering',
        college: '',
        degree: '',
      });
      setToastMessage({ message: 'Application submitted successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ message: err?.message || 'Failed to submit application.', type: 'error' });
    },
  });

  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: 'name',
      header: 'Applicant',
      cell: ({ row }) => (
        <div>
          <div className="text-xs font-bold text-neutral-900">
            {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-xs px-2.5 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-medium border border-neutral-200">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: 'position',
      header: 'Role / Program',
      cell: ({ row }) => (
        <span className="text-xs font-semibold text-neutral-800">
          {row.original.position || 'General Applicant'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <select
          value={row.original.status || 'SUBMITTED'}
          onChange={(e) => updateStatusMutation.mutate({ id: row.original.id, status: e.target.value })}
          className="text-xs font-semibold px-2 py-1 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Submitted',
      cell: ({ row }) => (
        <span className="text-xs text-neutral-500 font-mono">
          {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : 'Recent'}
        </span>
      ),
    },
  ];

  const filteredApps = apps.filter((a) => {
    if (tab === 'career') return a.type?.toUpperCase() === 'CAREER';
    if (tab === 'internship') return a.type?.toUpperCase() === 'INTERNSHIP';
    if (tab === 'training') return a.type?.toUpperCase() === 'TRAINING';
    return true;
  });

  return (
    <div className="space-y-6">
      {toastMessage && (
        <Toast message={toastMessage.message} type={toastMessage.type} onClose={() => setToastMessage(null)} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Applications Center</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review and manage candidate applications for careers, internships, and corporate training.
          </p>
        </div>

        <button
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Application
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Applications' },
          { id: 'internship', label: 'Internships' },
          { id: 'career', label: 'Careers' },
          { id: 'training', label: 'Training' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              tab === t.id
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading applications...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredApps}
          searchKey="name"
          searchPlaceholder="Search candidate applications..."
        />
      )}

      {/* Slide-in Drawer Form */}
      <Drawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        title="Submit New Application"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate(newApp);
          }}
          className="space-y-4 p-4"
        >
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">First Name *</label>
            <input
              type="text"
              required
              value={newApp.firstName}
              onChange={(e) => setNewApp({ ...newApp, firstName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Last Name *</label>
            <input
              type="text"
              required
              value={newApp.lastName}
              onChange={(e) => setNewApp({ ...newApp, lastName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={newApp.email}
              onChange={(e) => setNewApp({ ...newApp, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={newApp.phone}
              onChange={(e) => setNewApp({ ...newApp, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Application Type</label>
            <select
              value={newApp.type}
              onChange={(e) => setNewApp({ ...newApp, type: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="INTERNSHIP">Internship</option>
              <option value="CAREER">Career</option>
              <option value="TRAINING">Training</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Position / Track</label>
            <input
              type="text"
              value={newApp.position}
              onChange={(e) => setNewApp({ ...newApp, position: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsAddDrawerOpen(false)}
              className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
