'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('aescion-cookie-consent');
    if (!consent) {
      // Small delay to not block initial render paint
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('aescion-cookie-consent', JSON.stringify(prefs));
    setShow(false);
    
    // Dispatch custom event so Analytics component can pick it up
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const acceptEssential = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[300] bg-white border-t border-neutral-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 md:p-8 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-7xl">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Cookie className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-bold text-neutral-900">Cookie Preferences</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed max-w-3xl">
                We use cookies and similar technologies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button 
                onClick={() => setShowPreferences(true)}
                className="px-6 py-3 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Manage Preferences
              </button>
              <button 
                onClick={acceptEssential}
                className="px-6 py-3 text-sm font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>
              <button 
                onClick={acceptAll}
                className="px-6 py-3 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-lg shadow-primary-500/20"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 border-b border-neutral-100 pb-4">
              <h3 className="text-xl font-bold text-neutral-900">Manage Cookie Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="text-neutral-400 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-900">Strictly Necessary Cookies</h4>
                  <p className="text-sm text-neutral-600 mt-1">These cookies are essential for the website to function properly. They cannot be disabled.</p>
                </div>
                <input type="checkbox" checked disabled className="w-5 h-5 accent-primary-600 shrink-0 mt-1" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-900">Analytics Cookies</h4>
                  <p className="text-sm text-neutral-600 mt-1">Help us understand how visitors interact with our website by collecting and reporting information anonymously (Google Analytics, Clarity).</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="w-5 h-5 accent-primary-600 shrink-0 mt-1 cursor-pointer" 
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-900">Marketing Cookies</h4>
                  <p className="text-sm text-neutral-600 mt-1">Used to track visitors across websites to display relevant advertisements (Meta Pixel, LinkedIn Insight).</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="w-5 h-5 accent-primary-600 shrink-0 mt-1 cursor-pointer" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button 
                onClick={acceptAll}
                className="px-6 py-2.5 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={() => savePreferences(preferences)}
                className="px-6 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
