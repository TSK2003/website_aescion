'use client';

import React from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  const links = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Training", href: "/training" },
    { label: "Internship", href: "/internship" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">AESCION</span>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-3 text-lg font-semibold text-neutral-800 hover:text-primary-600 border-b border-neutral-50"
                onClick={onClose}
              >
                {link.label}
                <ChevronRight className="w-5 h-5 text-neutral-300" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-neutral-100 bg-neutral-50">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
