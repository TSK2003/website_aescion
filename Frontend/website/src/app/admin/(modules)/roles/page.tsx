'use client';

import React from 'react';
import { Plus, Shield, Check, X } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

const modules = ['Dashboard', 'CMS', 'CRM', 'Blogs', 'Media', 'Users', 'Roles', 'Settings', 'Analytics', 'SEO', 'Applications', 'Training'];
const permissions = ['View', 'Create', 'Edit', 'Delete', 'Publish', 'Export'];

const roles = [
  { name: 'Super Admin', perms: modules.map(() => permissions.map(() => true)) },
  { name: 'Admin', perms: modules.map((_, mi) => permissions.map((_, pi) => mi < 8 && pi < 5)) },
  { name: 'Editor', perms: modules.map((_, mi) => permissions.map((_, pi) => [1, 2, 3].includes(mi) && pi < 4)) },
  { name: 'Viewer', perms: modules.map(() => permissions.map((_, pi) => pi === 0)) },
];

export default function RolesPage() {
  const [activeRole, setActiveRole] = React.useState(0);
  const role = roles[activeRole];

  return (
    <div className="space-y-4">
      <PageHeader title="Role & Permission Management" description="Configure access for each role">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Create Role
        </button>
      </PageHeader>

      {/* Role Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {roles.map((r, i) => (
          <button key={r.name} onClick={() => setActiveRole(i)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${i === activeRole ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            <Shield className="w-3 h-3 inline mr-1" />{r.name}
          </button>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600 w-48">Module</th>
                {permissions.map(p => <th key={p} className="px-3 py-2.5 text-center text-xs font-medium text-gray-600">{p}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {modules.map((mod, mi) => (
                <tr key={mod} className="hover:bg-gray-50/50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{mod}</td>
                  {permissions.map((_, pi) => (
                    <td key={pi} className="px-3 py-2 text-center">
                      {role.perms[mi][pi]
                        ? <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
