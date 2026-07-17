'use client';

import React from 'react';
import {
  LayoutDashboard, Users, FileText, Settings, BarChart2, Bell, FolderTree,
  FileSignature, GraduationCap, Briefcase, UserCheck, Building2, Search as SearchIcon,
  Shield, Activity, Monitor, Globe, BookOpen, ChevronDown, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type MenuItem = {
  name: string;
  icon: React.ElementType;
  href?: string;
  children?: { name: string; href: string }[];
};

const menus: MenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  {
    name: 'Users & Roles', icon: Users, children: [
      { name: 'Users', href: '/users' },
      { name: 'Roles', href: '/roles' },
    ]
  },
  { name: 'Organizations', icon: Building2, href: '/organizations' },
  {
    name: 'CMS', icon: FileText, children: [
      { name: 'Pages', href: '/cms' },
      { name: 'Components', href: '/cms/components' },
      { name: 'Navigation', href: '/cms/navigation' },
    ]
  },
  {
    name: 'Blogs', icon: BookOpen, children: [
      { name: 'Articles', href: '/blogs' },
      { name: 'Categories', href: '/blogs/categories' },
      { name: 'Tags', href: '/blogs/tags' },
    ]
  },
  { name: 'CRM', icon: UserCheck, href: '/crm' },
  { name: 'Applications', icon: FileSignature, href: '/applications' },
  { name: 'Training', icon: GraduationCap, href: '/training' },
  { name: 'Internships', icon: Briefcase, href: '/internships' },
  { name: 'Media Library', icon: FolderTree, href: '/media' },
  { name: 'SEO Center', icon: Globe, href: '/seo' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Audit Logs', icon: Activity, href: '/audit-logs' },
  { name: 'System Monitor', icon: Monitor, href: '/system' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

function NavItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const isActive = item.href ? pathname === item.href : item.children?.some(c => pathname.startsWith(c.href));

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center justify-between gap-2 px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors',
            isActive ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <span className="flex items-center gap-2.5">
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.name}
          </span>
          {open ? <ChevronDown className="w-3.5 h-3.5 opacity-50" /> : <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
        </button>
        {open && (
          <div className="ml-6 mt-0.5 space-y-0.5 border-l border-gray-200 pl-2.5">
            {item.children.map(child => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'block px-2 py-1 text-[13px] rounded-md transition-colors',
                  pathname === child.href ? 'text-primary font-medium bg-primary/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        'flex items-center gap-2.5 px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors',
        isActive ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {item.name}
    </Link>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col w-56 h-full bg-white border-r border-gray-200', className)}>
      <div className="flex items-center h-12 px-4 border-b border-gray-200">
        <span className="text-base font-bold text-primary tracking-tight">AESCION</span>
        <span className="ml-1 text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">OS</span>
      </div>

      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center bg-gray-50 rounded-md px-2.5 py-1.5 border border-gray-200">
          <SearchIcon className="w-3.5 h-3.5 text-gray-400 mr-2" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs w-full placeholder:text-gray-400" />
        </div>
      </div>

      <nav className="flex-1 px-2 pb-4 space-y-0.5 overflow-y-auto">
        {menus.map(item => <NavItem key={item.name} item={item} />)}
      </nav>

      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">A</div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-gray-900 truncate">Admin User</span>
            <span className="text-[10px] text-gray-400 truncate">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
