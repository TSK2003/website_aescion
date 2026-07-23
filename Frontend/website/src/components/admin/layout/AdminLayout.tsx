'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (pathname === '/admin/login') {
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const hasAuth = isAuthenticated || Boolean(token);

    if (!hasAuth) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, pathname, router, isMounted]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isMounted) {
    return null;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const hasAuth = isAuthenticated || Boolean(token);

  if (!hasAuth) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-medium text-gray-600">Redirecting to admin login...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - hidden on mobile, full height on desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
