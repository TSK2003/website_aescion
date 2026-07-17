import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AESCION',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>At AESCION, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.</p>
        {/* Full privacy policy content here */}
      </div>
    </>
  );
}
