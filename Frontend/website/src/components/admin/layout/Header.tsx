'use client';

import React from 'react';
import { Search, Bell, RefreshCw, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const breadcrumbMap: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Users',
  '/roles': 'Roles',
  '/organizations': 'Organizations',
  '/cms': 'CMS',
  '/blogs': 'Blogs',
  '/crm': 'CRM',
  '/applications': 'Applications',
  '/training': 'Training',
  '/internships': 'Internships',
  '/media': 'Media Library',
  '/seo': 'SEO Center',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/audit-logs': 'Audit Logs',
  '/system': 'System Monitor',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const pageTitle = breadcrumbMap[pathname] || segments[segments.length - 1] || 'Dashboard';

  return (
    <header className={cn('flex items-center justify-between h-12 px-4 bg-white border-b border-gray-200', className)}>
      <div className="flex items-center gap-3">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-400">
          <span className="text-gray-500">Admin</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">{pageTitle}</span>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* Global Search */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-md px-2.5 py-1 border border-gray-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
          <input type="text" placeholder="Global search..." className="bg-transparent border-none outline-none text-xs w-full placeholder:text-gray-400" />
          <kbd className="text-[9px] bg-white border border-gray-200 rounded px-1 py-0.5 text-gray-400 font-mono ml-1">⌘K</kbd>
        </div>

        <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors" title="Refresh">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        <button className="relative p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors" title="Notifications">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-secondary rounded-full"></span>
        </button>

        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
