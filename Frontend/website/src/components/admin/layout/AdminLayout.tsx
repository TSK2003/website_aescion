'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import Image from 'next/image';
import { Lock, Loader2 } from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check login state
  useEffect(() => {
    setIsMounted(true);
    if (pathname === '/admin/login') {
      setIsCheckingAuth(false);
      return;
    }

    const localToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const hasValidToken = Boolean(accessToken || localToken || isAuthenticated);

    if (!hasValidToken) {
      setIsCheckingAuth(true);
      router.replace('/admin/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [pathname, router, isAuthenticated, accessToken]);

  // Login page has no sidebar wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show full screen auth check spinner before rendering admin layout
  if (!isMounted || isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white gap-4 p-4 font-sans">
        <div className="relative w-48 h-12 mb-2">
          <Image
            src="/logo_with_name.png"
            alt="AESCION Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold">
          <Lock className="w-4 h-4 text-primary-400" />
          <span>Access Restricted — Verifying Administrator Authentication...</span>
          <Loader2 className="w-4 h-4 text-primary-400 animate-spin ml-1" />
        </div>
      </div>
    );
  }

  const localToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const hasValidToken = Boolean(accessToken || localToken || isAuthenticated);

  if (!hasValidToken) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 font-sans">
      {/* Sidebar - desktop */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
