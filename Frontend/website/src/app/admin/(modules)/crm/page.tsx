'use client';

import React from 'react';
import { Filter, ArrowUpRight, Phone, Mail, Calendar, MoreHorizontal } from 'lucide-react';
import { PageHeader, StatusBadge, StatCard } from '@/components/admin/ui/Primitives';

const stages = [
  { name: 'New Leads', count: 8, color: 'border-t-blue-500', leads: [
    { name: 'TechCorp India', email: 'info@techcorp.in', value: '$12,000', time: '2h ago' },
    { name: 'EduStart Labs', email: 'hello@edustart.io', value: '$8,500', time: '5h ago' },
  ]},
  { name: 'Contacted', count: 5, color: 'border-t-amber-500', leads: [
    { name: 'InnovateTech', email: 'cto@innovate.com', value: '$25,000', time: 'Yesterday' },
  ]},
  { name: 'Qualified', count: 3, color: 'border-t-purple-500', leads: [
    { name: 'MegaSoft Pvt', email: 'sales@megasoft.com', value: '$45,000', time: '2 days ago' },
  ]},
  { name: 'Proposal', count: 2, color: 'border-t-primary', leads: [
    { name: 'CloudNine Inc', email: 'deals@cloudnine.io', value: '$60,000', time: 'This week' },
  ]},
  { name: 'Won', count: 1, color: 'border-t-emerald-500', leads: [
    { name: 'FinServe Ltd', email: 'ops@finserve.com', value: '$100,000', time: 'Last month' },
  ]},
];

export default function CrmPage() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <PageHeader title="CRM Pipeline" description="Track and manage your lead pipeline">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50"><Filter className="w-3.5 h-3.5" /> Filter</button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total Leads" value="384" icon={ArrowUpRight} trend="+18%" />
        <StatCard title="Calls Today" value="12" icon={Phone} />
        <StatCard title="Emails Sent" value="45" icon={Mail} />
        <StatCard title="Meetings" value="3" icon={Calendar} />
      </div>

      <div className="flex-1 flex gap-3 overflow-x-auto pb-2">
        {stages.map((stage) => (
          <div key={stage.name} className={`w-64 flex-shrink-0 bg-white border border-gray-200 rounded-lg flex flex-col border-t-2 ${stage.color}`}>
            <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">{stage.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-500 font-medium">{stage.count}</span>
            </div>
            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
              {stage.leads.map((lead, i) => (
                <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-md hover:border-primary/30 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-900">{lead.name}</span>
                    <button className="p-0.5 hover:bg-gray-200 rounded"><MoreHorizontal className="w-3 h-3 text-gray-400" /></button>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-2">{lead.email}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">{lead.value}</span>
                    <span className="text-[10px] text-gray-400">{lead.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
