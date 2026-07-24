'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Layers, Edit, Trash2, Loader2 } from 'lucide-react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Toast } from '@/components/admin/ui/Toast';

type SolutionItem = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string;
  category?: string;
  benefits?: string[];
  techStack?: string[];
  status?: string;
};

const defaultSolutions: SolutionItem[] = [
  {
    id: 'enterprise-core',
    title: 'AESCION Enterprise Core ERP',
    slug: 'enterprise-core',
    shortDescription:
      'Unified ERP solution for managing multi-branch operations, finances, human resources, and supply chains.',
    category: 'Enterprise Software',
    benefits: ['Unified Multi-Branch Operations', 'Automated Financial Ledger', 'Role-Based Access Control'],
    techStack: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker'],
    status: 'PUBLISHED',
  },
  {
    id: 'ai-agent-engine',
    title: 'Autonomous AI Workflow Engine',
    slug: 'ai-agent-engine',
    shortDescription:
      'Deploy custom AI agents that manage customer support, process documentation, and automate complex tasks.',
    category: 'Artificial Intelligence',
    benefits: ['24/7 Autonomous AI Agents', 'Natural Language Document Extraction', 'Zero Human Error'],
    techStack: ['Python', 'FastAPI', 'AWS', 'LangChain'],
    status: 'PUBLISHED',
  },
];

export default function SolutionsAdminPage() {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('Enterprise ERP');
  const [benefitsStr, setBenefitsStr] = useState('');
  const [techStackStr, setTechStackStr] = useState('');
  const [status, setStatus] = useState('PUBLISHED');

  const { data: solutions = [], isLoading } = useQuery<SolutionItem[]>({
    queryKey: ['admin-solutions'],
    queryFn: async () => {
      try {
        const res = await api.get('/solutions');
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) return list;
      } catch {
        // Fallback
      }

      try {
        const pubRes = await api.get('/solutions/public');
        const pubList = Array.isArray(pubRes.data) ? pubRes.data : (pubRes.data?.data || pubRes.data);
        if (pubList && pubList.length > 0) return pubList;
      } catch {
        // Fallback
      }

      return defaultSolutions;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingSlug) {
        const res = await api.put(`/solutions/${editingSlug}`, payload);
        return res.data;
      } else {
        const res = await api.post('/solutions', payload);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] });
      setToast({ message: 'Solution saved successfully.', type: 'success' });
      setDrawerOpen(false);
    },
    onError: (err: any) => {
      setToast({
        message: err?.message || "Couldn't save — check your connection",
        type: 'error',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (targetSlug: string) => {
      const res = await api.delete(`/solutions/${targetSlug}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-solutions'] });
      setToast({ message: 'Solution deleted successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToast({ message: err?.message || 'Could not delete solution.', type: 'error' });
    },
  });

  const openCreateDrawer = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setCategory('Enterprise ERP');
    setBenefitsStr('');
    setTechStackStr('');
    setStatus('PUBLISHED');
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: SolutionItem) => {
    setEditingSlug(item.slug);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDescription(item.shortDescription);
    setCategory(item.category || 'Enterprise ERP');
    setBenefitsStr((item.benefits || []).join('\n'));
    setTechStackStr((item.techStack || []).join(', '));
    setStatus(item.status || 'PUBLISHED');
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const benefits = benefitsStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const techStack = techStackStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription,
      content: shortDescription,
      category,
      benefits,
      techStack,
      status,
    };

    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Solutions Management</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage pre-architected enterprise solutions, platforms, and AI engines.
          </p>
        </div>

        <button
          onClick={openCreateDrawer}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Solution
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading solutions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((solution, idx) => (
            <div
              key={solution.slug || idx}
              className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{solution.title}</h4>
                    <span className="text-xs text-neutral-400 font-mono">/solutions/{solution.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {solution.category || 'Enterprise'}
                  </span>
                  <button
                    onClick={() => openEditDrawer(solution)}
                    className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(solution.slug)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{solution.shortDescription}</p>

              {solution.benefits && solution.benefits.length > 0 && (
                <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                  {solution.benefits.map((b, bIdx) => (
                    <span key={bIdx} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Slide-in Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingSlug ? 'Edit Solution' : 'Add New Solution'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Solution Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Short Description *</label>
            <textarea
              rows={3}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Key Benefits (One per line)</label>
            <textarea
              rows={3}
              value={benefitsStr}
              onChange={(e) => setBenefitsStr(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Tech Stack (Comma separated)</label>
            <input
              type="text"
              value={techStackStr}
              onChange={(e) => setTechStackStr(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="flex-1 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Solution'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
