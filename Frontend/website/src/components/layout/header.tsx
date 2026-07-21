'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Icon } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import { GlobalSearch } from '../ui/global-search';

const navLinks = [
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
  
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // On home page, wait until text is fully revealed (about 35vh) before showing header
      const threshold = isHomePage ? window.innerHeight * 0.35 : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Cmd+K / Ctrl+K shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(prev => !prev);
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Aescion Home">
            <Image src="/logo_with_name.png" alt="Aescion Logo" width={160} height={40} className="h-8 md:h-10 w-auto object-contain" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact" 
              className="bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shadow-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              aria-label="Search"
              className="p-2 text-neutral-600"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 text-neutral-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
