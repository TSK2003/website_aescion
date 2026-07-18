'use client';

import React from 'react';
import { BarChart2, Download, TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react';
import { PageHeader, StatCard, TabNav } from '@/components/admin/ui/Primitives';

export default function AnalyticsPage() {
  const [tab, setTab] = React.useState('traffic');
  return (
    <div className="space-y-4">
      <PageHeader title="Analytics & Reports" description="Monitor website traffic, leads, and performance">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50"><Download className="w-3.5 h-3.5" /> Export</button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Visitors" value="45,200" icon={Eye} trend="+12%" trendLabel="this month" />
        <StatCard title="Sessions" value="18,400" icon={Users} trend="+8%" />
        <StatCard title="Bounce Rate" value="32%" icon={TrendingUp} trend="-5%" />
        <StatCard title="CTR" value="4.2%" icon={MousePointerClick} trend="+0.3%" />
      </div>

      <TabNav tabs={[{ id: 'traffic', label: 'Traffic' }, { id: 'pages', label: 'Popular Pages' }, { id: 'leads', label: 'Lead Sources' }, { id: 'search', label: 'Search Queries' }, { id: 'performance', label: 'Performance' }]} activeTab={tab} onChange={setTab} />

      {/* Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[350px] flex flex-col items-center justify-center">
        <BarChart2 className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-sm font-medium text-gray-500">Analytics charts will render here</p>
        <p className="text-xs text-gray-400 mt-1">Connected via Recharts to live API data</p>
      </div>

      {/* Top Pages Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Top Pages</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Page</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Views</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Unique</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Avg. Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { page: '/', views: '12,450', unique: '8,200', time: '2m 15s' },
              { page: '/services', views: '5,800', unique: '4,100', time: '1m 45s' },
              { page: '/training', views: '4,200', unique: '3,500', time: '3m 10s' },
              { page: '/blog', views: '3,900', unique: '3,100', time: '2m 30s' },
              { page: '/about', views: '2,800', unique: '2,200', time: '1m 20s' },
            ].map(p => (
              <tr key={p.page} className="hover:bg-gray-50/50">
                <td className="px-4 py-2.5 font-medium text-gray-900">{p.page}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-700">{p.views}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-500">{p.unique}</td>
                <td className="px-4 py-2.5 text-right text-gray-500">{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
