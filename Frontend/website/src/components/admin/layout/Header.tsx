'use client';

import React, { useState } from 'react';
import { Search, Bell, Plus, RefreshCw, ChevronRight, User, Shield, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GlobalSearch } from '@/components/ui/global-search';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Executive Dashboard',
  '/admin/crm': 'CRM & Deal Pipeline',
  '/admin/applications': 'Applications Center',
  '/admin/internships': 'Internships Management',
  '/admin/training': 'Corporate Training',
  '/admin/blogs': 'Blog Articles',
  '/admin/services': 'Services Catalog',
  '/admin/solutions': 'Enterprise Solutions',
  '/admin/cms': 'CMS Pages',
  '/admin/seo': 'SEO Engine',
  '/admin/media': 'Media Library',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/analytics': 'Analytics & Reports',
  '/admin/system': 'System Health',
  '/admin/settings': 'System Settings',
};

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const pageTitle = breadcrumbMap[pathname] || 'Admin Portal';

  return (
    <>
      <header className={cn('flex items-center justify-between h-16 px-6 bg-white border-b border-neutral-200 z-20 shadow-sm', className)}>
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-bold">{pageTitle}</span>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-500 transition-colors w-48 sm:w-64"
          >
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className="truncate">Search system...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white border border-neutral-200 rounded px-1.5 py-0.5 text-neutral-400 font-mono">⌘K</kbd>
          </button>

          {/* Quick Add Button */}
          <div className="relative">
            <button
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Quick Create
            </button>

            {isQuickAddOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => { setIsQuickAddOpen(false); router.push('/admin/crm'); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  + Add Lead
                </button>
                <button
                  onClick={() => { setIsQuickAddOpen(false); router.push('/admin/blogs'); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  + Create Blog Post
                </button>
                <button
                  onClick={() => { setIsQuickAddOpen(false); router.push('/admin/services'); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  + New Service
                </button>
                <button
                  onClick={() => { setIsQuickAddOpen(false); router.push('/admin/media'); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  + Upload Media
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => router.push('/admin/notifications')}
            className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs border border-primary-200 hover:bg-primary-200 transition-colors"
            >
              A
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-xs font-bold text-neutral-900">AESCION Administrator</p>
                  <p className="text-[10px] text-neutral-400">admin@aesciontech.com</p>
                </div>
                <button
                  onClick={() => { setIsProfileOpen(false); router.push('/admin/settings'); }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors flex items-center gap-2 mt-1"
                >
                  <Shield className="w-4 h-4 text-neutral-400" /> Account Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('aescion-admin-auth');
                    localStorage.removeItem('accessToken');
                    window.location.href = '/admin/login';
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
