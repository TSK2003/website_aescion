'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Layers, Edit, Trash2, X } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

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

export default function SolutionsAdminPage() {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('Enterprise ERP');
  const [benefitsStr, setBenefitsStr] = useState('');
  const [techStackStr, setTechStackStr] = useState('');
  const [status, setStatus] = useState('PUBLISHED');

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${apiUrl}/solutions`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (res.ok) {
        const json = await res.json();
        const list = json?.data || json;
        if (Array.isArray(list)) setSolutions(list);
      } else {
        const pubRes = await fetch(`${apiUrl}/solutions/public`);
        const pubJson = await pubRes.json();
        const list = pubJson?.data || pubJson;
        if (Array.isArray(list)) setSolutions(list);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const openCreateModal = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setCategory('Enterprise ERP');
    setBenefitsStr('');
    setTechStackStr('');
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (item: SolutionItem) => {
    setEditingSlug(item.slug);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDescription(item.shortDescription);
    setCategory(item.category || 'Enterprise ERP');
    setBenefitsStr((item.benefits || []).join('\n'));
    setTechStackStr((item.techStack || []).join(', '));
    setStatus(item.status || 'PUBLISHED');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
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

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      let res;
      if (editingSlug) {
        res = await fetch(`${apiUrl}/solutions/${editingSlug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${apiUrl}/solutions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setMessage('Solution saved successfully!');
        setModalOpen(false);
        fetchSolutions();
      } else {
        if (editingSlug) {
          setSolutions(solutions.map((s) => (s.slug === editingSlug ? { ...s, ...payload } : s)));
        } else {
          setSolutions([...solutions, payload]);
        }
        setMessage('Updated local solution list');
        setModalOpen(false);
      }
    } catch {
      setMessage('Failed to save solution');
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      await fetch(`${apiUrl}/solutions/${targetSlug}`, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setSolutions(solutions.filter((s) => s.slug !== targetSlug));
      setMessage('Solution deleted successfully');
    } catch {
      setSolutions(solutions.filter((s) => s.slug !== targetSlug));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Solutions Management"
        description="Manage pre-architected enterprise solutions, platforms, and AI engines"
      >
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Solution
        </button>
      </PageHeader>

      {message && (
        <div className="p-3 text-xs rounded-lg bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solutions.map((solution, idx) => (
          <div
            key={solution.slug || idx}
            className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-3 relative"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{solution.title}</h4>
                  <span className="text-[11px] text-neutral-400 font-mono">/solutions/{solution.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {solution.category || 'Enterprise'}
                </span>
                <button
                  onClick={() => openEditModal(solution)}
                  className="p-1.5 hover:bg-neutral-100 rounded-md text-neutral-600"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(solution.slug)}
                  className="p-1.5 hover:bg-red-50 rounded-md text-red-500"
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
                  <span key={bIdx} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-md">
                    ✓ {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {editingSlug ? 'Edit Solution' : 'Add New Solution'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Solution Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. AESCION Enterprise Core ERP"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. enterprise-core"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Enterprise ERP / AI"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Brief summary of solution capabilities"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Key Benefits (One per line)</label>
                <textarea
                  rows={3}
                  value={benefitsStr}
                  onChange={(e) => setBenefitsStr(e.target.value)}
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Unified Data Model&#10;Role-Based Access Control&#10;Real-Time Analytics"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Tech Stack (Comma separated)</label>
                <input
                  type="text"
                  value={techStackStr}
                  onChange={(e) => setTechStackStr(e.target.value)}
                  className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                  placeholder="NestJS, Next.js, PostgreSQL, TailwindCSS"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg hover:bg-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90"
                >
                  Save Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
