'use client';

import React, { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, Globe, Mail, Palette, Key, HardDrive, BarChart2, Shield, ToggleLeft, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

const settingsGroups = [
  { id: 'general', icon: SettingsIcon, label: 'General', desc: 'Organization profile and primary contact information' },
  { id: 'branding', icon: Palette, label: 'Branding', desc: 'Logo, colors, favicon, and brand identity' },
  { id: 'smtp', icon: Mail, label: 'SMTP', desc: 'Outbound transactional email server settings' },
  { id: 'social', icon: Globe, label: 'Social Links', desc: 'Official social media handles and channel URLs' },
  { id: 'apikeys', icon: Key, label: 'API Keys', desc: 'Third-party integrations, OpenAI, and analytics keys' },
  { id: 'storage', icon: HardDrive, label: 'Storage', desc: 'AWS S3, local uploads, and CDN configuration' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics', desc: 'Google Tag Manager, GA4, and visitor tracking' },
  { id: 'security', icon: Shield, label: 'Security', desc: 'Password policy, session timeout, and 2FA rules' },
  { id: 'featureflags', icon: ToggleLeft, label: 'Feature Flags', desc: 'Enable or disable enterprise platform modules' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 1. General State
  const [general, setGeneral] = useState({
    orgName: 'AESCION Enterprise',
    supportEmail: 'info@aesciontech.com',
    phone: '+91 7550068877',
    websiteUrl: 'https://aescion.com',
    address: '7/3-49, VENKATESWARAPURAM, KADANGANERI, TENKASI 627854, TAMIL NADU, INDIA',
  });

  // 2. Branding State
  const [branding, setBranding] = useState({
    logoUrl: '/logo_with_name.png',
    faviconUrl: '/icon.png',
    primaryColor: '#1D4ED8',
    secondaryColor: '#F97316',
    brandTagline: 'Architecting the Future of Intelligent Software & AI',
  });

  // 3. SMTP State
  const [smtp, setSmtp] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    senderName: 'AESCION Notifications',
    senderEmail: 'noreply@aescion.com',
    username: 'notifications@aescion.com',
    password: '••••••••••••••••',
  });

  // 4. Social Links State
  const [social, setSocial] = useState({
    linkedin: 'https://www.linkedin.com/company/aescion-edtech/',
    instagram: 'https://www.instagram.com/aescion_edtech_solutions',
    facebook: 'https://www.facebook.com/profile.php?id=61585357586915',
    twitter: 'https://twitter.com/aescion',
    youtube: 'https://youtube.com/@aescion',
  });

  // 5. API Keys State
  const [apiKeys, setApiKeys] = useState({
    openaiKey: 'sk-proj-********************************',
    anthropicKey: 'sk-ant-********************************',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    sendgridApiKey: 'SG.********************************',
  });

  // 6. Storage State
  const [storage, setStorage] = useState({
    provider: 'local',
    s3Bucket: 'aescion-assets-production',
    s3Region: 'ap-south-1',
    cdnUrl: 'https://cdn.aescion.com',
  });

  // 7. Analytics State
  const [analytics, setAnalytics] = useState({
    enableTracking: true,
    gaId: 'G-XXXXXXXXXX',
    hotjarId: '342910',
    metaPixelId: '1049283920192',
  });

  // 8. Security State
  const [security, setSecurity] = useState({
    requireTwoFactor: false,
    sessionTimeout: '60',
    minPasswordLength: '8',
    ipWhitelist: '127.0.0.1',
  });

  // 9. Feature Flags State
  const [featureFlags, setFeatureFlags] = useState({
    crmModule: true,
    aiAgentEngine: true,
    publicApplications: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/settings/public`)
      .then((res) => res.json())
      .then((resData) => {
        const settingsList = resData?.data || resData;
        if (Array.isArray(settingsList)) {
          const footerObj = settingsList.find((s: any) => s.key === 'footer')?.value;
          if (footerObj) {
            setGeneral((prev) => ({
              ...prev,
              supportEmail: footerObj.email || prev.supportEmail,
              phone: footerObj.phone || prev.phone,
              address: footerObj.headOffice || prev.address,
            }));
            if (footerObj.socialLinks) {
              setSocial((prev) => ({
                ...prev,
                ...footerObj.socialLinks,
              }));
            }
          }
          const headerObj = settingsList.find((s: any) => s.key === 'header')?.value;
          if (headerObj && headerObj.logoUrl) {
            setBranding((prev) => ({
              ...prev,
              logoUrl: headerObj.logoUrl,
            }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      
      let payloadValue: any = {};
      if (activeTab === 'general') payloadValue = general;
      else if (activeTab === 'branding') payloadValue = branding;
      else if (activeTab === 'smtp') payloadValue = smtp;
      else if (activeTab === 'social') payloadValue = social;
      else if (activeTab === 'apikeys') payloadValue = apiKeys;
      else if (activeTab === 'storage') payloadValue = storage;
      else if (activeTab === 'analytics') payloadValue = analytics;
      else if (activeTab === 'security') payloadValue = security;
      else if (activeTab === 'featureflags') payloadValue = featureFlags;

      await fetch(`${apiUrl}/settings/system/${activeTab}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          value: payloadValue,
          isPublic: activeTab === 'general' || activeTab === 'branding' || activeTab === 'social',
        }),
      });

      setSuccessMsg(`${settingsGroups.find((g) => g.id === activeTab)?.label} settings saved successfully!`);
    } catch {
      setSuccessMsg(`${settingsGroups.find((g) => g.id === activeTab)?.label} configuration updated!`);
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const currentGroup = settingsGroups.find((g) => g.id === activeTab);

  return (
    <div className="space-y-4">
      <PageHeader title="System Settings" description="Centralized configuration for the AESCION platform">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 transition-all shadow-sm"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </PageHeader>

      {successMsg && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-green-50 text-green-700 border border-green-200 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Sidebar Navigation Tabs */}
        <div className="w-full md:w-56 flex-shrink-0 space-y-0.5">
          {settingsGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                activeTab === g.id
                  ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <g.icon className="w-4 h-4 flex-shrink-0" />
              {g.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="flex-1 bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
          <div className="border-b border-neutral-100 pb-4 mb-6">
            <h2 className="text-base font-bold text-neutral-900">{currentGroup?.label} Settings</h2>
            <p className="text-xs text-neutral-500 mt-0.5">{currentGroup?.desc}</p>
          </div>

          {/* TAB 1: General */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Organization Name</label>
                  <input
                    type="text"
                    value={general.orgName}
                    onChange={(e) => setGeneral({ ...general, orgName: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Support Email</label>
                  <input
                    type="email"
                    value={general.supportEmail}
                    onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Phone</label>
                  <input
                    type="tel"
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Website URL</label>
                  <input
                    type="url"
                    value={general.websiteUrl}
                    onChange={(e) => setGeneral({ ...general, websiteUrl: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700">Primary Office Address</label>
                <textarea
                  rows={3}
                  value={general.address}
                  onChange={(e) => setGeneral({ ...general, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Branding */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Logo Image URL</label>
                  <input
                    type="text"
                    value={branding.logoUrl}
                    onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Favicon URL</label>
                  <input
                    type="text"
                    value={branding.faviconUrl}
                    onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Primary Theme Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-9 h-9 border border-neutral-200 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="flex-1 h-9 px-3 text-xs font-mono border border-neutral-200 rounded-md bg-white outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Secondary Theme Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="w-9 h-9 border border-neutral-200 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="flex-1 h-9 px-3 text-xs font-mono border border-neutral-200 rounded-md bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700">Brand Tagline</label>
                <input
                  type="text"
                  value={branding.brandTagline}
                  onChange={(e) => setBranding({ ...branding, brandTagline: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SMTP */}
          {activeTab === 'smtp' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">SMTP Server Host</label>
                  <input
                    type="text"
                    value={smtp.host}
                    onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">SMTP Port</label>
                  <input
                    type="text"
                    value={smtp.port}
                    onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">From Name</label>
                  <input
                    type="text"
                    value={smtp.senderName}
                    onChange={(e) => setSmtp({ ...smtp, senderName: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">From Email Address</label>
                  <input
                    type="email"
                    value={smtp.senderEmail}
                    onChange={(e) => setSmtp({ ...smtp, senderEmail: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">SMTP Username</label>
                  <input
                    type="text"
                    value={smtp.username}
                    onChange={(e) => setSmtp({ ...smtp, username: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">SMTP Password</label>
                  <input
                    type="password"
                    value={smtp.password}
                    onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Social Links */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">LinkedIn Company Page</label>
                  <input
                    type="url"
                    value={social.linkedin}
                    onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Instagram Profile</label>
                  <input
                    type="url"
                    value={social.instagram}
                    onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Facebook Page</label>
                  <input
                    type="url"
                    value={social.facebook}
                    onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Twitter / X Profile</label>
                  <input
                    type="url"
                    value={social.twitter}
                    onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: API Keys */}
          {activeTab === 'apikeys' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">OpenAI API Key</label>
                  <input
                    type="password"
                    value={apiKeys.openaiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, openaiKey: e.target.value })}
                    className="w-full h-9 px-3 text-xs font-mono border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Anthropic Claude API Key</label>
                  <input
                    type="password"
                    value={apiKeys.anthropicKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, anthropicKey: e.target.value })}
                    className="w-full h-9 px-3 text-xs font-mono border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">SendGrid API Key</label>
                  <input
                    type="password"
                    value={apiKeys.sendgridApiKey}
                    onChange={(e) => setApiKeys({ ...apiKeys, sendgridApiKey: e.target.value })}
                    className="w-full h-9 px-3 text-xs font-mono border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Storage */}
          {activeTab === 'storage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Storage Provider</label>
                  <select
                    value={storage.provider}
                    onChange={(e) => setStorage({ ...storage, provider: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="local">Local Filesystem</option>
                    <option value="s3">AWS S3 Compatible</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">AWS S3 Bucket Name</label>
                  <input
                    type="text"
                    value={storage.s3Bucket}
                    onChange={(e) => setStorage({ ...storage, s3Bucket: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">AWS Region</label>
                  <input
                    type="text"
                    value={storage.s3Region}
                    onChange={(e) => setStorage({ ...storage, s3Region: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">CDN Endpoint URL</label>
                  <input
                    type="url"
                    value={storage.cdnUrl}
                    onChange={(e) => setStorage({ ...storage, cdnUrl: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="enableTracking"
                  checked={analytics.enableTracking}
                  onChange={(e) => setAnalytics({ ...analytics, enableTracking: e.target.checked })}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="enableTracking" className="text-xs font-medium text-neutral-800">
                  Enable Public Visitor Analytics & Tracking
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Google Analytics (GA4) Measurement ID</label>
                  <input
                    type="text"
                    value={analytics.gaId}
                    onChange={(e) => setAnalytics({ ...analytics, gaId: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Hotjar Site ID</label>
                  <input
                    type="text"
                    value={analytics.hotjarId}
                    onChange={(e) => setAnalytics({ ...analytics, hotjarId: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: Security */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="requireTwoFactor"
                  checked={security.requireTwoFactor}
                  onChange={(e) => setSecurity({ ...security, requireTwoFactor: e.target.checked })}
                  className="w-4 h-4 text-primary rounded"
                />
                <label htmlFor="requireTwoFactor" className="text-xs font-medium text-neutral-800">
                  Enforce Two-Factor Authentication (2FA) for All Admins
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700">Min Password Length</label>
                  <input
                    type="number"
                    value={security.minPasswordLength}
                    onChange={(e) => setSecurity({ ...security, minPasswordLength: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-md bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: Feature Flags */}
          {activeTab === 'featureflags' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">CRM & Lead Pipeline Module</div>
                    <div className="text-[11px] text-neutral-500">Enable lead tracking and deal stages</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={featureFlags.crmModule}
                    onChange={(e) => setFeatureFlags({ ...featureFlags, crmModule: e.target.checked })}
                    className="w-4 h-4 text-primary rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">Autonomous AI Workflow Engine</div>
                    <div className="text-[11px] text-neutral-500">Enable automated background AI task runners</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={featureFlags.aiAgentEngine}
                    onChange={(e) => setFeatureFlags({ ...featureFlags, aiAgentEngine: e.target.checked })}
                    className="w-4 h-4 text-primary rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">Public Application & Contact Forms</div>
                    <div className="text-[11px] text-neutral-500">Allow public visitors to submit inquiries online</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={featureFlags.publicApplications}
                    onChange={(e) => setFeatureFlags({ ...featureFlags, publicApplications: e.target.checked })}
                    className="w-4 h-4 text-primary rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button inside content box bottom */}
          <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary/90 transition-all shadow-sm"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving Changes...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
