'use client';

import React from 'react';
import { Plus, MoreHorizontal, Mail, Shield, Calendar } from 'lucide-react';
import { PageHeader, StatusBadge } from '@/components/ui/Primitives';
import { DataTable } from '@/components/ui/DataTable';
import { type ColumnDef } from '@tanstack/react-table';

type User = {
  id: string; name: string; email: string; role: string; department: string; status: string; lastLogin: string;
};

const users: User[] = [
  { id: '1', name: 'Karthick S', email: 'karthick@aescion.com', role: 'Super Admin', department: 'Technology', status: 'active', lastLogin: '2 min ago' },
  { id: '2', name: 'John Doe', email: 'john@aescion.com', role: 'Editor', department: 'Content', status: 'active', lastLogin: '1 hour ago' },
  { id: '3', name: 'Jane Smith', email: 'jane@aescion.com', role: 'HR Manager', department: 'Human Resources', status: 'active', lastLogin: 'Yesterday' },
  { id: '4', name: 'Bob Wilson', email: 'bob@aescion.com', role: 'Viewer', department: 'Marketing', status: 'inactive', lastLogin: '3 days ago' },
  { id: '5', name: 'Alice Brown', email: 'alice@aescion.com', role: 'Admin', department: 'Operations', status: 'active', lastLogin: 'Today' },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name', cell: ({ row }) => (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">{row.original.name.charAt(0)}</div>
      <div><div className="text-sm font-medium text-gray-900">{row.original.name}</div><div className="text-xs text-gray-400">{row.original.email}</div></div>
    </div>
  )},
  { accessorKey: 'role', header: 'Role', cell: ({ row }) => <span className="text-sm flex items-center gap-1"><Shield className="w-3 h-3 text-gray-400" />{row.original.role}</span> },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: 'lastLogin', header: 'Last Login', cell: ({ row }) => <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{row.original.lastLogin}</span> },
  { id: 'actions', header: '', cell: () => <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button> },
];

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="User Management" description="Manage all users, roles, and permissions">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add User
        </button>
      </PageHeader>
      <DataTable columns={columns} data={users} searchKey="name" searchPlaceholder="Search users..." />
    </div>
  );
}
