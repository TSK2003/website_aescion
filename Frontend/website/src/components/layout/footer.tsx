import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-20 pb-10 border-t border-neutral-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">AESCION</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm leading-relaxed">
              Premium enterprise software development, AI solutions, automation, and corporate training for modern organizations.
            </p>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services/software-development" className="hover:text-primary-400 transition-colors">Software Development</Link></li>
              <li><Link href="/services/ai-solutions" className="hover:text-primary-400 transition-colors">AI Solutions</Link></li>
              <li><Link href="/services/cloud-solutions" className="hover:text-primary-400 transition-colors">Cloud Architecture</Link></li>
              <li><Link href="/services/automation" className="hover:text-primary-400 transition-colors">Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} Aescion EdTech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
