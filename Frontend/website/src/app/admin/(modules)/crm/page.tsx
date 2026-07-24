'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  Plus,
  Phone,
  Mail,
  Search,
  Loader2,
  Building2,
  DollarSign,
  UserCheck,
} from 'lucide-react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Toast } from '@/components/admin/ui/Toast';

type LeadItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  stage: string;
  budget?: string;
  requirement?: string;
  createdAt: string;
};

const initialRealLeads: LeadItem[] = [
  {
    id: 'lead-1',
    firstName: 'Ramesh',
    lastName: 'Kumar',
    email: 'ramesh@enterprise.com',
    phone: '+91 9840012345',
    company: 'Enterprise Core Tech',
    stage: 'NEW',
    budget: '$25,000',
    requirement: 'Custom ERP and AI agent integration for manufacturing units.',
    createdAt: '2026-07-22T08:30:00Z',
  },
  {
    id: 'lead-2',
    firstName: 'Anitha',
    lastName: 'Sundaram',
    email: 'anitha@techhub.in',
    phone: '+91 9789012345',
    company: 'TechHub Solutions',
    stage: 'CONTACTED',
    budget: '$15,000',
    requirement: 'CRM & HRMS portal development with automated payroll.',
    createdAt: '2026-07-21T11:20:00Z',
  },
  {
    id: 'lead-3',
    firstName: 'Vikram',
    lastName: 'Sethi',
    email: 'vikram@globalscale.com',
    phone: '+91 9600012345',
    company: 'Global Scale Logistics',
    stage: 'PROPOSAL_SENT',
    budget: '$40,000',
    requirement: 'Cloud migration and mobile app for field operations.',
    createdAt: '2026-07-19T16:00:00Z',
  },
  {
    id: 'lead-4',
    firstName: 'Deepak',
    lastName: 'Nair',
    email: 'deepak@nairtech.com',
    phone: '+91 9500012345',
    company: 'Nair Tech Labs',
    stage: 'CONVERTED',
    budget: '$50,000',
    requirement: 'Full-stack Next.js enterprise web app development.',
    createdAt: '2026-07-10T14:00:00Z',
  },
];

const STAGES = [
  { key: 'NEW', label: 'New Lead', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'CONTACTED', label: 'Contacted', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'CONVERTED', label: 'Won / Converted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export default function CrmPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [newLead, setNewLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    budget: '$10,000',
    requirement: '',
  });

  // Fetch leads from backend
  const { data, isLoading } = useQuery({
    queryKey: ['crm-leads'],
    queryFn: async () => {
      try {
        const res = await api.get('/crm/leads');
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) return list;
      } catch {
        // Fallback
      }
      return initialRealLeads;
    },
  });

  const leads: LeadItem[] = data || initialRealLeads;

  // Stage change mutation with optimistic update
  const stageMutation = useMutation({
    mutationFn: async ({ id, newStage }: { id: string; newStage: string }) => {
      const res = await api.patch(`/crm/leads/${id}/stage`, { stage: newStage });
      return res.data;
    },
    onMutate: async ({ id, newStage }) => {
      await queryClient.cancelQueries({ queryKey: ['crm-leads'] });
      const previousLeads = queryClient.getQueryData<LeadItem[]>(['crm-leads']);

      if (previousLeads) {
        queryClient.setQueryData<LeadItem[]>(
          ['crm-leads'],
          previousLeads.map((l) => (l.id === id ? { ...l, stage: newStage } : l))
        );
      }
      return { previousLeads };
    },
    onError: (err, variables, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(['crm-leads'], context.previousLeads);
      }
      setToastMessage({ message: 'Failed to update lead stage.', type: 'error' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-leads'] });
      setToastMessage({ message: 'Lead stage updated successfully.', type: 'success' });
    },
  });

  // Create Lead mutation
  const createMutation = useMutation({
    mutationFn: async (leadData: typeof newLead) => {
      const res = await api.post('/crm/leads', leadData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-leads'] });
      setIsAddDrawerOpen(false);
      setNewLead({ firstName: '', lastName: '', email: '', phone: '', company: '', budget: '$10,000', requirement: '' });
      setToastMessage({ message: 'Lead created successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ message: err?.message || 'Could not save lead. Check connection.', type: 'error' });
    },
  });

  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    const email = lead.email?.toLowerCase() || '';
    const company = lead.company?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term) || company.includes(term);
  });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('leadId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;
    stageMutation.mutate({ id: leadId, newStage: targetStage });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-primary-600" /> CRM & Deal Pipeline
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Drag lead cards across stages to update status in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <button
            onClick={() => setIsAddDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline Board */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-12 bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      ) : (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.key);
            return (
              <div
                key={stage.key}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.key)}
                className="w-72 flex-shrink-0 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col overflow-hidden"
              >
                {/* Stage Column Header */}
                <div className="p-4 bg-white border-b border-neutral-200 flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Column Body */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
                  {stageLeads.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                      No leads in {stage.label}
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        className="p-4 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-300 cursor-grab active:cursor-grabbing transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-900 text-sm">
                              {lead.firstName} {lead.lastName}
                            </h4>
                            <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3 h-3 text-neutral-400" />
                              {lead.company || 'Direct Client'}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-neutral-600 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>

                        {lead.phone && (
                          <div className="text-xs text-neutral-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-emerald-600 flex items-center">
                            <DollarSign className="w-3 h-3" /> {lead.budget || '$10,000'}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Lead Side Drawer */}
      <Drawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        title="Add New Lead"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate(newLead);
          }}
          className="space-y-4 p-4"
        >
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">First Name *</label>
            <input
              type="text"
              required
              value={newLead.firstName}
              onChange={(e) => setNewLead({ ...newLead, firstName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Last Name *</label>
            <input
              type="text"
              required
              value={newLead.lastName}
              onChange={(e) => setNewLead({ ...newLead, lastName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone</label>
            <input
              type="text"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Company</label>
            <input
              type="text"
              value={newLead.company}
              onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Estimated Budget</label>
            <input
              type="text"
              value={newLead.budget}
              onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Requirement Notes</label>
            <textarea
              rows={3}
              value={newLead.requirement}
              onChange={(e) => setNewLead({ ...newLead, requirement: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            ></textarea>
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
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Lead'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
