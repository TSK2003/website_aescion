'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import { GlobalSearch } from '../ui/global-search';

const defaultNavLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Training', href: '/training' },
  { label: 'Internship', href: '/internship' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerConfig, setHeaderConfig] = useState<{
    logoUrl: string;
    navLinks: { label: string; href: string }[];
    ctaText: string;
    ctaHref: string;
  }>({
    logoUrl: '/logo_with_name.png',
    navLinks: defaultNavLinks,
    ctaText: 'Contact Us',
    ctaHref: '/contact',
  });

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/settings/public`)
      .then((res) => res.json())
      .then((resData) => {
        const publicSettings = resData?.data || resData;
        if (Array.isArray(publicSettings)) {
          const headerObj = publicSettings.find((s: any) => s.key === 'header')?.value;
          if (headerObj) {
            setHeaderConfig({
              logoUrl: headerObj.logoUrl || '/logo_with_name.png',
              navLinks: headerObj.navLinks?.length ? headerObj.navLinks : defaultNavLinks,
              ctaText: headerObj.ctaText || 'Contact Us',
              ctaHref: headerObj.ctaHref || '/contact',
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHomePage ? window.innerHeight * 0.35 : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const shouldHideHeader = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          shouldHideHeader
            ? '-translate-y-full opacity-0 py-5 pointer-events-none'
            : isScrolled
              ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-200 py-3 translate-y-0 opacity-100 pointer-events-auto'
              : 'bg-white py-5 border-b border-neutral-100 translate-y-0 opacity-100 pointer-events-auto'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Aescion Home">
            <Image
              src={headerConfig.logoUrl}
              alt="Aescion Logo"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {headerConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={headerConfig.ctaHref}
              className="bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shadow-sm"
            >
              {headerConfig.ctaText}
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              aria-label="Search"
              className="p-2 text-neutral-600"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-neutral-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
