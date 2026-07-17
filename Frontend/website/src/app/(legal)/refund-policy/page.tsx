import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | AESCION',
};

export default function RefundPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Refund Policy</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Information regarding refunds for our software services, API usage, and corporate training programs.</p>
        {/* Full refund policy content here */}
      </div>
    </>
  );
}
