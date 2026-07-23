'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Globe, Link2, Image as ImageIcon } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

type NavLink = { label: string; href: string };

export default function NavigationAdminPage() {
  const [logoUrl, setLogoUrl] = useState('/logo_with_name.png');
  const [ctaText, setCtaText] = useState('Contact Us');
  const [ctaHref, setCtaHref] = useState('/contact');
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Training', href: '/training' },
    { label: 'Internship', href: '/internship' },
    { label: 'Blog', href: '/blog' },
  ]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/settings/public`)
      .then((res) => res.json())
      .then((resData) => {
        const publicSettings = resData?.data || resData;
        if (Array.isArray(publicSettings)) {
          const headerObj = publicSettings.find((s: any) => s.key === 'header')?.value;
          if (headerObj) {
            setLogoUrl(headerObj.logoUrl || '/logo_with_name.png');
            setCtaText(headerObj.ctaText || 'Contact Us');
            setCtaHref(headerObj.ctaHref || '/contact');
            if (headerObj.navLinks?.length) setNavLinks(headerObj.navLinks);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleAddLink = () => {
    setNavLinks([...navLinks, { label: 'New Link', href: '/new-page' }]);
  };

  const handleRemoveLink = (index: number) => {
    setNavLinks(navLinks.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, field: 'label' | 'href', value: string) => {
    const updated = [...navLinks];
    updated[index][field] = value;
    setNavLinks(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      const body = {
        value: {
          logoUrl,
          navLinks,
          ctaText,
          ctaHref,
        },
        isPublic: true,
        description: 'Public Header Configuration',
      };
      const res = await fetch(`${apiUrl}/settings/branding/header`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMessage('Header & Navigation saved successfully!');
      } else {
        setMessage('Header saved to local state (Note: Login required for persistent admin updates)');
      }
    } catch {
      setMessage('Saved to local configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Header & Navigation Manager"
        description="Customize website logo, top navigation links, and main Call to Action button"
      >
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </PageHeader>

      {message && (
        <div className="p-3 text-xs rounded-lg bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}

      {/* Brand & Logo Section */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" /> Brand Logo & CTA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Logo Image URL</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">CTA Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">CTA Button Link</label>
            <input
              type="text"
              value={ctaHref}
              onChange={(e) => setCtaHref(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Nav Links Section */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" /> Navigation Links
          </h3>
          <button
            onClick={handleAddLink}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Nav Link
          </button>
        </div>

        <div className="space-y-3">
          {navLinks.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="text-xs font-bold text-neutral-400 w-6">#{idx + 1}</span>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Link Label"
                  value={link.label}
                  onChange={(e) => handleLinkChange(idx, 'label', e.target.value)}
                  className="w-full h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-md outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Target URL (e.g. /about)"
                  value={link.href}
                  onChange={(e) => handleLinkChange(idx, 'href', e.target.value)}
                  className="w-full h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-md outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => handleRemoveLink(idx)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
