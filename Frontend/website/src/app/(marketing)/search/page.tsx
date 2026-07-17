import React from 'react';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | AESCION',
};

export default function SearchPage() {
  return (
    <PageWrapper>
      <Breadcrumb items={[{ label: 'Search' }]} />
      <h1 className="text-4xl font-bold text-neutral-900 mb-6">Search Results</h1>
      <div className="h-64 bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200 mt-12">
        <span className="text-neutral-400 font-medium">Search Results (To be implemented)</span>
      </div>
    </PageWrapper>
  );
}
