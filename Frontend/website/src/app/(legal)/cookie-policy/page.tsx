import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | AESCION',
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Cookie Policy</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>We use cookies to improve your experience, analytics, and marketing. Here is a breakdown of how we use them.</p>
        {/* Full cookie policy content here */}
      </div>
    </>
  );
}
