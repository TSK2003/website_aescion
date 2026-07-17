'use client';

import React from 'react';
import { Bell, Mail, CheckCircle2 } from 'lucide-react';
import { PageHeader, TabNav } from '@/components/ui/Primitives';

const notifications = [
  { id: '1', title: 'New application received', desc: 'Rahul Kumar applied for Full Stack Developer', type: 'application', time: '2 min ago', read: false },
  { id: '2', title: 'Lead status changed to Qualified', desc: 'InnovateTech moved to qualified stage', type: 'crm', time: '1 hour ago', read: false },
  { id: '3', title: 'Blog pending review', desc: '"Why Choose AESCION" needs approval', type: 'blog', time: '3 hours ago', read: false },
  { id: '4', title: 'New user registered', desc: 'Bob Wilson joined the Marketing team', type: 'user', time: 'Yesterday', read: true },
  { id: '5', title: 'SEO score dropped', desc: 'Training page score fell below 80', type: 'seo', time: 'Yesterday', read: true },
  { id: '6', title: 'Email delivery failed', desc: 'Failed to deliver welcome email to john@test.com', type: 'email', time: '2 days ago', read: true },
];

const typeColors: Record<string, string> = {
  application: 'bg-amber-500', crm: 'bg-blue-500', blog: 'bg-purple-500', user: 'bg-emerald-500', seo: 'bg-red-500', email: 'bg-gray-500',
};

export default function NotificationsPage() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="space-y-4">
      <PageHeader title="Notification Center" description="View all system notifications and alerts">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50"><CheckCircle2 className="w-3.5 h-3.5" /> Mark all read</button>
      </PageHeader>
      <TabNav tabs={[{ id: 'all', label: 'All', count: 6 }, { id: 'unread', label: 'Unread', count: 3 }, { id: 'email', label: 'Email Logs' }, { id: 'announcements', label: 'Announcements' }]} activeTab={tab} onChange={setTab} />

      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-primary/[0.02]' : ''}`}>
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${typeColors[n.type]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
