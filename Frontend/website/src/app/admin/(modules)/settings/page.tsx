'use client';

import React from 'react';
import { Save, Settings as SettingsIcon, Globe, Mail, Palette, Key, HardDrive, BarChart2, Shield, ToggleLeft } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

const settingsGroups = [
  { icon: SettingsIcon, label: 'General', desc: 'Organization name, contact details' },
  { icon: Palette, label: 'Branding', desc: 'Logo, favicon, colors' },
  { icon: Mail, label: 'SMTP', desc: 'Email server configuration' },
  { icon: Globe, label: 'Social Links', desc: 'Social media profiles' },
  { icon: Key, label: 'API Keys', desc: 'Third-party integrations' },
  { icon: HardDrive, label: 'Storage', desc: 'S3, local, CDN settings' },
  { icon: BarChart2, label: 'Analytics', desc: 'Google Analytics, tracking codes' },
  { icon: Shield, label: 'Security', desc: 'Password policy, 2FA' },
  { icon: ToggleLeft, label: 'Feature Flags', desc: 'Enable or disable features' },
];

export default function SettingsPage() {
  const [active, setActive] = React.useState('General');

  return (
    <div className="space-y-4">
      <PageHeader title="System Settings" description="Centralized configuration for the AESCION platform">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Save className="w-3.5 h-3.5" /> Save Changes</button>
      </PageHeader>

      <div className="flex gap-4">
        {/* Settings Sidebar */}
        <div className="w-56 flex-shrink-0 space-y-0.5">
          {settingsGroups.map(g => (
            <button
              key={g.label}
              onClick={() => setActive(g.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors ${active === g.label ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <g.icon className="w-4 h-4 flex-shrink-0" />
              {g.label}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">{active}</h2>
          <p className="text-xs text-gray-500 mb-6">{settingsGroups.find(g => g.label === active)?.desc}</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Organization Name</label>
                <input type="text" className="w-full h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" defaultValue="AESCION Enterprise" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Support Email</label>
                <input type="email" className="w-full h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" defaultValue="support@aescion.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Phone</label>
                <input type="tel" className="w-full h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" defaultValue="+91-XXXXXXXXXX" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Website URL</label>
                <input type="url" className="w-full h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none" defaultValue="https://aescion.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Address</label>
              <textarea rows={3} className="w-full px-2.5 py-2 text-sm border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none" defaultValue="Chennai, Tamil Nadu, India" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
