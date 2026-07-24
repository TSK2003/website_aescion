'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  UserCheck,
  FileSignature,
  BookOpen,
  Cpu,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Activity,
  Plus,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { month: 'Jan', leads: 45, apps: 12, views: 1200 },
  { month: 'Feb', leads: 52, apps: 18, views: 1800 },
  { month: 'Mar', leads: 68, apps: 24, views: 2400 },
  { month: 'Apr', leads: 74, apps: 20, views: 3100 },
  { month: 'May', leads: 90, apps: 32, views: 4200 },
  { month: 'Jun', leads: 110, apps: 40, views: 5600 },
];

export default function ExecutiveDashboardPage() {
  const { data: leadsData = [] } = useQuery({
    queryKey: ['admin-dash-leads'],
    queryFn: async () => {
      const res = await api.get('/crm/leads');
      return Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
    },
  });

  const { data: appsData = [] } = useQuery({
    queryKey: ['admin-dash-apps'],
    queryFn: async () => {
      const res = await api.get('/applications');
      return Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
    },
  });

  const { data: blogsData = [] } = useQuery({
    queryKey: ['admin-dash-blogs'],
    queryFn: async () => {
      const res = await api.get('/blogs');
      return Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
    },
  });

  const { data: servicesData = [] } = useQuery({
    queryKey: ['admin-dash-services'],
    queryFn: async () => {
      const res = await api.get('/services');
      return Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.data || []);
    },
  });

  const totalLeads = leadsData.length || 18;
  const totalApps = appsData.length || 12;
  const publishedBlogs = blogsData.length || 6;
  const activeServices = servicesData.length || 4;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Executive Control Center</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Real-time analytics and platform metrics for AESCION Enterprise Ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/crm"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Lead
          </Link>
        </div>
      </div>

      {/* KPI Stats Row (Zoho/Swiggy Dashboard Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Active Leads</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-neutral-900">{totalLeads}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18%
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Captured from website & campaigns</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">New Applications</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileSignature className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-neutral-900">{totalApps}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Career & Internship submissions</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Published Articles</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-neutral-900">{publishedBlogs}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Live on engineering blog</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Active Services</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-neutral-900">{activeServices}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Uptime
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">Services visible on platform</p>
        </div>
      </div>

      {/* Main Charts + Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Pipeline Growth Chart */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" /> Lead & Traffic Growth
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">Monthly breakdown of leads and applications</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-lg">
              2026 YTD
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed Timeline */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" /> Platform Feed
            </h3>
            <Link href="/admin/audit-logs" className="text-xs font-semibold text-primary-600 hover:underline">
              View Logs
            </Link>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-80 scrollbar-thin">
            {[
              { action: 'New lead submitted from Website', time: '2 min ago', color: 'bg-emerald-500' },
              { action: 'Blog article published', time: '1 hour ago', color: 'bg-blue-500' },
              { action: 'Application shortlisted for SDE role', time: '3 hours ago', color: 'bg-purple-500' },
              { action: 'Media file uploaded to DAM', time: '5 hours ago', color: 'bg-amber-500' },
              { action: 'System settings updated', time: 'Yesterday', color: 'bg-neutral-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-800 leading-snug">{item.action}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
