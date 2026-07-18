'use client';

import React from 'react';
import { Globe, Save, ExternalLink, AlertTriangle } from 'lucide-react';
import { PageHeader, TabNav } from '@/components/admin/ui/Primitives';

const pages = [
  { page: 'Homepage', title: 'AESCION - Enterprise Software', desc: 'Building the future of enterprise software...', score: 95 },
  { page: 'About', title: 'About AESCION', desc: 'Learn about our mission and team...', score: 88 },
  { page: 'Services', title: 'Our Services', desc: 'Explore our enterprise solutions...', score: 92 },
  { page: 'Training', title: 'Professional Training Programs', desc: 'Industry-ready training courses...', score: 78 },
  { page: 'Blog', title: 'AESCION Blog', desc: 'Insights on technology and business...', score: 85 },
];

export default function SeoPage() {
  const [tab, setTab] = React.useState('meta');
  return (
    <div className="space-y-4">
      <PageHeader title="SEO Center" description="Manage meta tags, schema, sitemaps, and redirects">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90"><Save className="w-3.5 h-3.5" /> Save All</button>
      </PageHeader>

      <TabNav tabs={[{ id: 'meta', label: 'Meta Manager' }, { id: 'schema', label: 'Schema' }, { id: 'sitemap', label: 'Sitemap' }, { id: 'redirects', label: 'Redirects' }, { id: 'reports', label: '404 Reports' }]} activeTab={tab} onChange={setTab} />

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Page</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Meta Title</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-600">Meta Description</th>
              <th className="px-4 py-2.5 text-center text-xs font-medium text-gray-600">Score</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((page) => (
              <tr key={page.page} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{page.page}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{page.title}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[250px] truncate">{page.desc}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-bold ${page.score >= 90 ? 'text-emerald-600' : page.score >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                    {page.score}/100
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-primary hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
