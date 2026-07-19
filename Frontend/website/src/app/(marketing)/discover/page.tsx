import React from 'react';
import { PageHero } from '@/components/ui/page-hero';
import dynamic from 'next/dynamic';

const SolutionsShowcase = dynamic(() => import('@/components/sections/solutions-showcase').then(mod => ({ default: mod.SolutionsShowcase })));
const IndustriesServed = dynamic(() => import('@/components/sections/industries-served').then(mod => ({ default: mod.IndustriesServed })));
const InternshipPrograms = dynamic(() => import('@/components/sections/internship-programs').then(mod => ({ default: mod.InternshipPrograms })));
const CorporateTraining = dynamic(() => import('@/components/sections/corporate-training').then(mod => ({ default: mod.CorporateTraining })));
const AiAutomation = dynamic(() => import('@/components/sections/ai-automation').then(mod => ({ default: mod.AiAutomation })));
const OurProcess = dynamic(() => import('@/components/sections/our-process').then(mod => ({ default: mod.OurProcess })));
const Statistics = dynamic(() => import('@/components/sections/statistics').then(mod => ({ default: mod.Statistics })));
const PortfolioPreview = dynamic(() => import('@/components/sections/portfolio-preview').then(mod => ({ default: mod.PortfolioPreview })));
const LatestBlogs = dynamic(() => import('@/components/sections/latest-blogs').then(mod => ({ default: mod.LatestBlogs })));
const Faqs = dynamic(() => import('@/components/sections/faqs').then(mod => ({ default: mod.Faqs })));

export const metadata = {
  title: 'Discover All Services | AESCION',
  description: 'Explore our complete suite of enterprise software solutions, training programs, and industry expertise.',
};

export default function DiscoverPage() {
  return (
    <>
      <PageHero
        title="Discover Our Ecosystem"
        description="Explore the complete spectrum of AESCION's capabilities, from AI automation to corporate training."
        breadcrumbs={[{ label: 'Discover' }]}
        bgClassName="bg-neutral-950 text-white"
      />
      <SolutionsShowcase />
      <IndustriesServed />
      <AiAutomation />
      <OurProcess />
      <Statistics />
      <PortfolioPreview />
      <CorporateTraining />
      <InternshipPrograms />
      <LatestBlogs />
      <Faqs />
    </>
  );
}
