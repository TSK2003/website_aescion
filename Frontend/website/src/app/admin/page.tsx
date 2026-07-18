'use client';

import React from 'react';
import { Users, Eye, ArrowUpRight, Briefcase, FileText, GraduationCap, Globe, HardDrive, Bell, CalendarDays, CheckCircle2, Clock } from 'lucide-react';
import { StatCard, PageHeader } from '@/components/admin/ui/Primitives';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Executive Dashboard" description="Overview of the AESCION Enterprise Ecosystem" />

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Visitors" value="45.2K" icon={Eye} trend="+5.4%" trendLabel="vs last month" />
        <StatCard title="Active Users" value="1,240" icon={Users} trend="+12%" trendLabel="vs last month" />
        <StatCard title="Leads" value="384" icon={ArrowUpRight} trend="+18%" />
        <StatCard title="Applications" value="12" icon={Briefcase} trend="-2%" />
        <StatCard title="Published" value="48" icon={FileText} trend="+4" />
        <StatCard title="Training" value="6" icon={GraduationCap} trend="+1" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="SEO Score" value="92/100" icon={Globe} />
        <StatCard title="Storage" value="14.2 GB" icon={HardDrive} />
        <StatCard title="Pending" value="5" icon={Clock} />
        <StatCard title="Approvals" value="3" icon={CheckCircle2} />
      </div>

      {/* Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-xs text-primary font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { action: 'New lead submitted', user: 'Website Form', time: '2 min ago', color: 'bg-emerald-500' },
              { action: 'Blog published: AI in Education', user: 'Admin', time: '1 hour ago', color: 'bg-blue-500' },
              { action: 'Application received for SDE role', user: 'Careers Page', time: '3 hours ago', color: 'bg-amber-500' },
              { action: 'User role updated to Editor', user: 'Admin', time: '5 hours ago', color: 'bg-purple-500' },
              { action: 'SEO meta updated for Services page', user: 'CMS', time: 'Yesterday', color: 'bg-primary' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.user} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Notifications */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {[
                { label: 'New Blog', icon: FileText },
                { label: 'Add Lead', icon: ArrowUpRight },
                { label: 'Upload Media', icon: HardDrive },
                { label: 'View Calendar', icon: CalendarDays },
              ].map((action) => (
                <button key={action.label} className="flex items-center gap-2 p-2.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
                  <action.icon className="w-3.5 h-3.5 text-gray-400" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
              <Bell className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100">
              {['New application received', 'Lead status changed', 'Blog pending review'].map((n, i) => (
                <div key={i} className="px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer">{n}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
