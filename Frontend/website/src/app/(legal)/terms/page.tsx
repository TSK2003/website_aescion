import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | AESCION',
};

export default function TermsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Terms of Service</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>By accessing or using AESCION's services, you agree to be bound by these Terms of Service.</p>
        {/* Full terms of service content here */}
      </div>
    </>
  );
}
