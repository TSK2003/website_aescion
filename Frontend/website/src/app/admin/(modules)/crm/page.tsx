'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpRight, Phone, Mail, Calendar, MoreHorizontal, Plus } from 'lucide-react';
import { PageHeader, StatCard } from '@/components/admin/ui/Primitives';

type LeadItem = {
  id?: string;
  name: string;
  email: string;
  company?: string;
  stage: string;
  budget?: string;
  createdAt?: string;
};

const stageColors: Record<string, string> = {
  NEW: 'border-t-blue-500',
  CONTACTED: 'border-t-amber-500',
  PROPOSAL_SENT: 'border-t-purple-500',
  NEGOTIATION: 'border-t-primary',
  CONVERTED: 'border-t-emerald-500',
};

export default function CrmPage() {
  const [leads, setLeads] = useState<LeadItem[]>([
    { name: 'TechCorp India', email: 'info@techcorp.in', company: 'TechCorp', stage: 'NEW', budget: '$12,000' },
    { name: 'EduStart Labs', email: 'hello@edustart.io', company: 'EduStart', stage: 'NEW', budget: '$8,500' },
    { name: 'InnovateTech', email: 'cto@innovate.com', company: 'InnovateTech', stage: 'CONTACTED', budget: '$25,000' },
    { name: 'MegaSoft Pvt', email: 'sales@megasoft.com', company: 'MegaSoft', stage: 'PROPOSAL_SENT', budget: '$45,000' },
    { name: 'FinServe Ltd', email: 'ops@finserve.com', company: 'FinServe', stage: 'CONVERTED', budget: '$100,000' },
  ]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    const token = localStorage.getItem('accessToken');
    fetch(`${apiUrl}/leads`, {
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
            company: item.company || 'Direct Lead',
            stage: item.stage || 'NEW',
            budget: item.budget || '$10,000',
          }));
          setLeads(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const stagesList = ['NEW', 'CONTACTED', 'PROPOSAL_SENT', 'CONVERTED'];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <PageHeader title="CRM & Lead Management" description="Manage leads, prospective clients, and deal pipeline">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> Add Lead
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total Active Leads" value={String(leads.length)} icon={ArrowUpRight} trend="+18%" />
        <StatCard title="Calls Scheduled" value="12" icon={Phone} />
        <StatCard title="Emails Sent" value="45" icon={Mail} />
        <StatCard title="Meetings" value="3" icon={Calendar} />
      </div>

      <div className="flex-1 flex gap-3 overflow-x-auto pb-2">
        {stagesList.map((stageKey) => {
          const stageLeads = leads.filter((l) => l.stage === stageKey);
          return (
            <div
              key={stageKey}
              className={`w-64 flex-shrink-0 bg-white border border-neutral-200 rounded-lg flex flex-col border-t-2 ${
                stageColors[stageKey] || 'border-t-neutral-400'
              }`}
            >
              <div className="px-3 py-2.5 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700">{stageKey.replace('_', ' ')}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded-full text-neutral-500 font-medium">
                  {stageLeads.length}
                </span>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {stageLeads.map((lead, i) => (
                  <div
                    key={lead.id || i}
                    className="p-3 bg-neutral-50 border border-neutral-200 rounded-md hover:border-primary/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-900">{lead.name}</span>
                      <button className="p-0.5 hover:bg-neutral-200 rounded">
                        <MoreHorizontal className="w-3 h-3 text-neutral-400" />
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-400 mb-2">{lead.email}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{lead.budget}</span>
                      <span className="text-[10px] text-neutral-400">{lead.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
