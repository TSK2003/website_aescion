'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Cpu, Edit, Trash2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

type ServiceItem = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  icon?: string;
  features?: string[];
  status: 'PUBLISHED' | 'DRAFT';
  order?: number;
};

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [message, setMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [icon, setIcon] = useState('Code');
  const [featuresStr, setFeaturesStr] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${apiUrl}/services`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (res.ok) {
        const json = await res.json();
        const list = json?.data?.data || json?.data || json;
        if (Array.isArray(list)) setServices(list);
      } else {
        // Fallback to public endpoint
        const pubRes = await fetch(`${apiUrl}/services/public`);
        const pubJson = await pubRes.json();
        const list = pubJson?.data || pubJson;
        if (Array.isArray(list)) setServices(list);
      }
    } catch {
      // Offline / fallback dummy list
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setSlug('');
    setShortDescription('');
    setContent('');
    setIcon('Code');
    setFeaturesStr('');
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setShortDescription(item.shortDescription);
    setContent(item.content);
    setIcon(item.icon || 'Code');
    setFeaturesStr((item.features || []).join('\n'));
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
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

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      let res;
      if (editingItem?.id) {
        res = await fetch(`${apiUrl}/services/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${apiUrl}/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setMessage('Service saved successfully!');
        setModalOpen(false);
        fetchServices();
      } else {
        // Local state fallback update
        if (editingItem?.id) {
          setServices(
            services.map((s) => (s.id === editingItem.id ? { ...s, ...payload } : s))
          );
        } else {
          setServices([...services, { id: String(Date.now()), ...payload }]);
        }
        setMessage('Updated local service list');
        setModalOpen(false);
      }
    } catch {
      setMessage('Failed to save service');
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      await fetch(`${apiUrl}/services/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setServices(services.filter((s) => s.id !== id));
      setMessage('Service deleted successfully');
    } catch {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services Management"
        description="Create, edit, and manage corporate service offerings displayed on the website"
      >
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </PageHeader>

      {message && (
        <div className="p-3 text-xs rounded-lg bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, idx) => (
          <div
            key={service.id || idx}
            className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-3 relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{service.title}</h4>
                  <span className="text-[11px] text-neutral-400 font-mono">/services/{service.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    service.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {service.status}
                </span>
                <button
                  onClick={() => openEditModal(service)}
                  className="p-1.5 hover:bg-neutral-100 rounded-md text-neutral-600"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 hover:bg-red-50 rounded-md text-red-500"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">{service.shortDescription}</p>

            {service.features && service.features.length > 0 && (
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                {service.features.map((f, fIdx) => (
                  <span key={fIdx} className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                    • {f}
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
                {editingItem ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Custom Software Development"
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
                    placeholder="e.g. custom-software-dev"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Icon Name</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="Code">Code (Software)</option>
                    <option value="BrainCircuit">BrainCircuit (AI)</option>
                    <option value="Cloud">Cloud (DevOps)</option>
                    <option value="Cpu">Cpu (ERP/Process)</option>
                    <option value="GraduationCap">GraduationCap (Training)</option>
                    <option value="Briefcase">Briefcase (Internship)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Brief summary for homepage cards"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Detailed Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Detailed description of the service"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Features (One per line)</label>
                <textarea
                  rows={3}
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="High-Performance Architecture&#10;API Design&#10;Cloud Scalability"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary bg-white"
                >
                  <option value="PUBLISHED">Published (Visible on Website)</option>
                  <option value="DRAFT">Draft (Hidden)</option>
                </select>
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
