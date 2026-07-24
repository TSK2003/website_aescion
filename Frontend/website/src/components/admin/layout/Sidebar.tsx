'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  UserCheck,
  FileSignature,
  Briefcase,
  GraduationCap,
  BookOpen,
  Cpu,
  Layers,
  FileText,
  Globe,
  FolderTree,
  Activity,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavSection = {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
};

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'CRM & Leads',
    items: [
      { name: 'CRM Pipeline', href: '/admin/crm', icon: UserCheck, badge: 'Live' },
      { name: 'Applications', href: '/admin/applications', icon: FileSignature },
      { name: 'Internships', href: '/admin/internships', icon: Briefcase },
      { name: 'Training', href: '/admin/training', icon: GraduationCap },
    ],
  },
  {
    title: 'Content',
    items: [
      { name: 'Blogs & News', href: '/admin/blogs', icon: BookOpen },
      { name: 'Services', href: '/admin/services', icon: Cpu },
      { name: 'Solutions', href: '/admin/solutions', icon: Layers },
      { name: 'CMS Pages', href: '/admin/cms', icon: FileText },
      { name: 'SEO Engine', href: '/admin/seo', icon: Globe },
    ],
  },
  {
    title: 'Media & Assets',
    items: [{ name: 'Media Library', href: '/admin/media', icon: FolderTree }],
  },
  {
    title: 'System',
    items: [
      { name: 'Audit Logs', href: '/admin/audit-logs', icon: Activity },
      { name: 'System Health', href: '/admin/system', icon: ShieldAlert },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 z-30 select-none',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* AESCION Official Logo Header */}
      <div
        className={cn(
          'border-b border-slate-800/80 bg-slate-950/50 transition-all',
          collapsed ? 'py-3 px-2 flex flex-col items-center gap-2' : 'h-16 px-4 flex items-center justify-between'
        )}
      >
        <Link href="/admin" className="flex items-center justify-center overflow-hidden">
          {collapsed ? (
            <div className="relative w-9 h-9 shrink-0 bg-white/10 rounded-xl p-1 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="AESCION Logo"
                width={32}
                height={32}
                priority
                className="object-contain"
              />
            </div>
          ) : (
            <div className="relative w-40 h-10 shrink-0 bg-white/5 rounded-xl px-2 py-1 flex items-center justify-start border border-white/10">
              <Image
                src="/logo_with_name.png"
                alt="AESCION Enterprise Logo"
                fill
                priority
                className="object-contain p-1"
              />
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800',
            collapsed && 'mt-1'
          )}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin">
        {navSections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {sec.title}
              </h3>
            )}
            {sec.items.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative',
                    collapsed && 'justify-center px-0',
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 font-bold border-l-4 border-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  />
                  {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                  {!collapsed && item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div
        className={cn(
          'p-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary-600/20 border border-primary-500/30 text-primary-400 flex items-center justify-center font-bold text-xs shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white truncate">Administrator</span>
              <span className="text-[10px] text-slate-400 truncate">Super Admin</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => {
              localStorage.removeItem('aescion-admin-auth');
              localStorage.removeItem('accessToken');
              window.location.href = '/admin/login';
            }}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
