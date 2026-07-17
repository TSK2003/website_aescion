'use client';

import React from 'react';
import { Activity, Search } from 'lucide-react';
import { PageHeader, TabNav } from '@/components/ui/Primitives';

const logs = [
  { user: 'Admin', action: 'Published blog', target: 'AI in Modern Education', module: 'Blogs', time: '2 min ago', ip: '192.168.1.1' },
  { user: 'Admin', action: 'Updated meta tags', target: 'Homepage', module: 'SEO', time: '30 min ago', ip: '192.168.1.1' },
  { user: 'Editor', action: 'Created page', target: 'Landing Page v2', module: 'CMS', time: '1 hour ago', ip: '192.168.1.5' },
  { user: 'Admin', action: 'Changed role', target: 'Bob Wilson → Editor', module: 'Users', time: '3 hours ago', ip: '192.168.1.1' },
  { user: 'System', action: 'Login detected', target: 'Jane Smith', module: 'Auth', time: 'Yesterday', ip: '10.0.0.15' },
  { user: 'Admin', action: 'Deleted lead', target: 'OldCompany Ltd', module: 'CRM', time: 'Yesterday', ip: '192.168.1.1' },
  { user: 'HR', action: 'Updated status', target: 'Application #45 → Approved', module: 'Applications', time: '2 days ago', ip: '192.168.1.8' },
];

const actionColors: Record<string, string> = {
  Published: 'text-emerald-600', Created: 'text-blue-600', Updated: 'text-amber-600', Deleted: 'text-red-600', Changed: 'text-purple-600', Login: 'text-gray-600',
};

export default function AuditLogsPage() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="space-y-4">
      <PageHeader title="Audit Logs" description="Track all system activities and changes" />
      <TabNav tabs={[{ id: 'all', label: 'All Activity' }, { id: 'auth', label: 'Authentication' }, { id: 'content', label: 'Content' }, { id: 'settings', label: 'Settings' }, { id: 'users', label: 'Users' }]} activeTab={tab} onChange={setTab} />

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">User</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Action</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Target</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Module</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">IP</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-4 py-2.5 font-medium text-gray-900">{log.user}</td>
                <td className="px-4 py-2.5"><span className={`font-medium ${actionColors[log.action.split(' ')[0]] || 'text-gray-600'}`}>{log.action}</span></td>
                <td className="px-4 py-2.5 text-gray-600">{log.target}</td>
                <td className="px-4 py-2.5"><span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{log.module}</span></td>
                <td className="px-4 py-2.5 text-xs text-gray-400 font-mono">{log.ip}</td>
                <td className="px-4 py-2.5 text-right text-xs text-gray-400">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
