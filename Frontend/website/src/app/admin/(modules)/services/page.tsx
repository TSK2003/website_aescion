'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { servicesData, ServiceData } from '@/lib/cms/services-data';
import { Plus, Cpu, Edit, Trash2, Loader2 } from 'lucide-react';
import { Drawer } from '@/components/admin/ui/Drawer';
import { Toast } from '@/components/admin/ui/Toast';

type ServiceItem = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string;
  icon?: string;
  features?: string[];
  status?: string;
  category?: string;
};

export default function ServicesAdminPage() {
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [icon, setIcon] = useState('Code');
  const [featuresStr, setFeaturesStr] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const { data: services = [], isLoading } = useQuery<ServiceItem[]>({
    queryKey: ['admin-services'],
    queryFn: async () => {
      try {
        const res = await api.get('/services');
        const list = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
        if (list && list.length > 0) return list;
      } catch {
        // Ignore API error and fall back to public/static frontend data
      }

      try {
        const pubRes = await api.get('/services/public');
        const pubList = Array.isArray(pubRes.data) ? pubRes.data : (pubRes.data?.data || pubRes.data);
        if (pubList && pubList.length > 0) return pubList;
      } catch {
        // Fallback to static frontend servicesData
      }

      // Map static servicesData to ServiceItem
      return servicesData.map((s) => ({
        id: s.slug,
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
        content: s.metaDescription,
        icon: s.icon,
        features: s.features,
        category: s.category,
        status: 'PUBLISHED',
      }));
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editingItem?.id && !editingItem.id.startsWith('slug-')) {
        const res = await api.put(`/services/${editingItem.id}`, payload);
        return res.data;
      } else {
        const res = await api.post('/services', payload);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setToast({ message: 'Service saved successfully.', type: 'success' });
      setDrawerOpen(false);
    },
    onError: (err: any) => {
      setToast({
        message: err?.message || "Couldn't save — check your connection",
        type: 'error',
      });
      // Keep form open with intact user inputs so nothing is lost
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/services/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setToast({ message: 'Service deleted successfully.', type: 'success' });
    },
    onError: (err: any) => {
      setToast({ message: err?.message || 'Could not delete service.', type: 'error' });
    },
  });

  const openCreateDrawer = () => {
    setEditingItem(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setContent('');
    setIcon('Code');
    setFeaturesStr('');
    setStatus('PUBLISHED');
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: ServiceItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDescription(item.shortDescription);
    setContent(item.content || item.shortDescription);
    setIcon(item.icon || 'Code');
    setFeaturesStr((item.features || []).join('\n'));
    setStatus((item.status as any) || 'PUBLISHED');
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription,
      content: content || shortDescription,
      icon,
      features,
      status,
    };

    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Services Management</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Create, edit, and manage corporate service offerings displayed on the website.
          </p>
        </div>

        <button
          onClick={openCreateDrawer}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading services catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <div
              key={service.id || service.slug || idx}
              className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{service.title}</h4>
                    <span className="text-xs text-neutral-400 font-mono">/services/{service.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      service.status === 'PUBLISHED' || !service.status
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {service.status || 'PUBLISHED'}
                  </span>
                  <button
                    onClick={() => openEditDrawer(service)}
                    className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => service.id && deleteMutation.mutate(service.id)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{service.shortDescription}</p>

              {service.features && service.features.length > 0 && (
                <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                  {service.features.slice(0, 4).map((f, fIdx) => (
                    <span key={fIdx} className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md font-medium">
                      • {f}
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
        title={editingItem ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Service Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. Custom Software Development"
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
                placeholder="custom-software-dev"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Icon</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Code">Code (Software)</option>
                <option value="Bot">Bot (AI Automation)</option>
                <option value="Database">Database (ERP)</option>
                <option value="Users">Users (CRM)</option>
                <option value="Globe">Globe (Web)</option>
                <option value="Cloud">Cloud Solutions</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Short Description *</label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Detailed Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Features (One per line)</label>
            <textarea
              rows={3}
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
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
              {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Service'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
