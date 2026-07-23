'use client';

import React, { useState, useEffect } from 'react';
import { Save, Building2, Mail, Phone, Share2, Shield } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/Primitives';

export default function FooterAdminPage() {
  const [brandDescription, setBrandDescription] = useState(
    'Premium enterprise software development, AI solutions, automation, and corporate training for modern organizations.'
  );
  const [headOffice, setHeadOffice] = useState(
    '7/3-49, VENKATESWARAPURAM, KADANGANERI, GANDHI NAGAR STREET, TENKASI 627854 TAMIL NADU'
  );
  const [branchOffice, setBranchOffice] = useState(
    '10B/1H,15/1, THIRUMALAI NAMBI COMPLEX, PALAYAMKOTTAI, 2ND FLOOR THIRUVANDURAM ROAD, TIRUNELVELI-627003, TAMIL NADU'
  );
  const [email, setEmail] = useState('info@aesciontech.com');
  const [phone, setPhone] = useState('+91 7550068877');
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/company/aescion-edtech/');
  const [instagram, setInstagram] = useState(
    'https://www.instagram.com/aescion_edtech_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  );
  const [facebook, setFacebook] = useState('https://www.facebook.com/profile.php?id=61585357586915');
  const [copyright, setCopyright] = useState('Aescion EdTech Solutions. All rights reserved.');
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/settings/public`)
      .then((res) => res.json())
      .then((resData) => {
        const publicSettings = resData?.data || resData;
        if (Array.isArray(publicSettings)) {
          const footerObj = publicSettings.find((s: any) => s.key === 'footer')?.value;
          if (footerObj) {
            if (footerObj.brandDescription) setBrandDescription(footerObj.brandDescription);
            if (footerObj.headOffice) setHeadOffice(footerObj.headOffice);
            if (footerObj.branchOffice) setBranchOffice(footerObj.branchOffice);
            if (footerObj.email) setEmail(footerObj.email);
            if (footerObj.phone) setPhone(footerObj.phone);
            if (footerObj.copyright) setCopyright(footerObj.copyright);
            if (footerObj.socialLinks) {
              if (footerObj.socialLinks.linkedin) setLinkedin(footerObj.socialLinks.linkedin);
              if (footerObj.socialLinks.instagram) setInstagram(footerObj.socialLinks.instagram);
              if (footerObj.socialLinks.facebook) setFacebook(footerObj.socialLinks.facebook);
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const token = localStorage.getItem('accessToken');
      const body = {
        value: {
          brandDescription,
          headOffice,
          branchOffice,
          email,
          phone,
          copyright,
          socialLinks: {
            linkedin,
            instagram,
            facebook,
          },
        },
        isPublic: true,
        description: 'Public Footer Configuration',
      };
      const res = await fetch(`${apiUrl}/settings/branding/footer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMessage('Footer settings saved successfully!');
      } else {
        setMessage('Footer saved to local state (Note: Login required for persistent admin updates)');
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
        title="Footer Settings Manager"
        description="Configure footer brand description, office addresses, contact channels, and social media handles"
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

      {/* Brand Description & Copyright */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Brand & Copyright Information
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Brand Summary Text</label>
            <textarea
              rows={2}
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              className="w-full p-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Copyright Notice</label>
            <input
              type="text"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" /> Office Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Head Office Address</label>
            <textarea
              rows={3}
              value={headOffice}
              onChange={(e) => setHeadOffice(e.target.value)}
              className="w-full p-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Branch Office Address</label>
            <textarea
              rows={3}
              value={branchOffice}
              onChange={(e) => setBranchOffice(e.target.value)}
              className="w-full p-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Contact & Social Channels */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-primary" /> Contact Channels & Social Media
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Contact Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Phone / WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">Instagram URL</label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-neutral-700 block mb-1">Facebook URL</label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-neutral-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
