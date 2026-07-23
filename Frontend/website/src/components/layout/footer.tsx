'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerConfig, setFooterConfig] = useState({
    brandDescription:
      'Premium enterprise software development, AI solutions, automation, and corporate training for modern organizations.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/aescion-edtech/',
      instagram:
        'https://www.instagram.com/aescion_edtech_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      facebook: 'https://www.facebook.com/profile.php?id=61585357586915',
    },
    headOffice:
      '7/3-49, VENKATESWARAPURAM, KADANGANERI, GANDHI NAGAR STREET, TENKASI 627854 TAMIL NADU',
    branchOffice:
      '10B/1H,15/1, THIRUMALAI NAMBI COMPLEX, PALAYAMKOTTAI, 2ND FLOOR THIRUVANDURAM ROAD, TIRUNELVELI-627003, TAMIL NADU',
    email: 'info@aesciontech.com',
    phone: '+91 7550068877',
    copyright: 'Aescion EdTech Solutions. All rights reserved.',
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/settings/public`)
      .then((res) => res.json())
      .then((resData) => {
        const publicSettings = resData?.data || resData;
        if (Array.isArray(publicSettings)) {
          const footerObj = publicSettings.find((s: any) => s.key === 'footer')?.value;
          if (footerObj) {
            setFooterConfig((prev) => ({
              ...prev,
              ...footerObj,
            }));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-neutral-50 text-neutral-600 pt-12 pb-8 border-t border-neutral-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Aescion Home">
              <Image src="/logo_with_name.png" alt="Aescion Logo" width={160} height={40} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-neutral-500 mb-6 max-w-sm leading-relaxed">
              {footerConfig.brandDescription}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {footerConfig.socialLinks?.linkedin && (
                <a href={footerConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {footerConfig.socialLinks?.instagram && (
                <a href={footerConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {footerConfig.socialLinks?.facebook && (
                <a href={footerConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="text-neutral-900 font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services/custom-software-development" className="hover:text-primary-600 transition-colors">Software Development</Link></li>
              <li><Link href="/services/ai-automation" className="hover:text-primary-600 transition-colors">AI & Automation</Link></li>
              <li><Link href="/services/cloud-solutions" className="hover:text-primary-600 transition-colors">Cloud Architecture</Link></li>
              <li><Link href="/services/erp-software-development" className="hover:text-primary-600 transition-colors">ERP Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-900 font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary-600 transition-colors">Careers</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info Col */}
          <div className="lg:col-span-2">
            <h4 className="text-neutral-900 font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-neutral-500">
              <div>
                <strong className="text-neutral-900 block mb-1">Head Office:</strong>
                <p>{footerConfig.headOffice}</p>
              </div>
              {footerConfig.branchOffice && (
                <div>
                  <strong className="text-neutral-900 block mb-1 mt-4">Branch Office:</strong>
                  <p>{footerConfig.branchOffice}</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="flex items-center gap-2 mb-2">
                  <span className="text-neutral-900 font-semibold">Email:</span> 
                  <a href={`mailto:${footerConfig.email}`} className="hover:text-primary-600 transition-colors">{footerConfig.email}</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-neutral-900 font-semibold">Phone/WhatsApp:</span> 
                  <a href={`tel:${footerConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary-600 transition-colors">{footerConfig.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 flex items-center justify-center">
          <p className="text-sm text-neutral-500 text-center">
            &copy; {currentYear} {footerConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
