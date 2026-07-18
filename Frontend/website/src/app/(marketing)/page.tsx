import React from 'react';
import { Hero } from '@/components/sections/hero';
import dynamic from 'next/dynamic';

const TrustedBy = dynamic(() => import('@/components/sections/trusted-by').then(mod => ({ default: mod.TrustedBy })));
const CompanyOverview = dynamic(() => import('@/components/sections/company-overview').then(mod => ({ default: mod.CompanyOverview })));
const CoreServices = dynamic(() => import('@/components/sections/core-services').then(mod => ({ default: mod.CoreServices })));
const TechnologyExpertise = dynamic(() => import('@/components/sections/technology-expertise').then(mod => ({ default: mod.TechnologyExpertise })));
const SolutionsShowcase = dynamic(() => import('@/components/sections/solutions-showcase').then(mod => ({ default: mod.SolutionsShowcase })));
const WhyChooseUs = dynamic(() => import('@/components/sections/why-choose-us').then(mod => ({ default: mod.WhyChooseUs })));
const IndustriesServed = dynamic(() => import('@/components/sections/industries-served').then(mod => ({ default: mod.IndustriesServed })));
const InternshipPrograms = dynamic(() => import('@/components/sections/internship-programs').then(mod => ({ default: mod.InternshipPrograms })));
const CorporateTraining = dynamic(() => import('@/components/sections/corporate-training').then(mod => ({ default: mod.CorporateTraining })));
const AiAutomation = dynamic(() => import('@/components/sections/ai-automation').then(mod => ({ default: mod.AiAutomation })));
const OurProcess = dynamic(() => import('@/components/sections/our-process').then(mod => ({ default: mod.OurProcess })));
const Statistics = dynamic(() => import('@/components/sections/statistics').then(mod => ({ default: mod.Statistics })));
const PortfolioPreview = dynamic(() => import('@/components/sections/portfolio-preview').then(mod => ({ default: mod.PortfolioPreview })));
const LatestBlogs = dynamic(() => import('@/components/sections/latest-blogs').then(mod => ({ default: mod.LatestBlogs })));
const Testimonials = dynamic(() => import('@/components/sections/testimonials').then(mod => ({ default: mod.Testimonials })));
const Faqs = dynamic(() => import('@/components/sections/faqs').then(mod => ({ default: mod.Faqs })));
const CallToAction = dynamic(() => import('@/components/sections/cta').then(mod => ({ default: mod.CallToAction })));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <CompanyOverview />
      <CoreServices />
      <TechnologyExpertise />
      <SolutionsShowcase />
      <WhyChooseUs />
      <IndustriesServed />
      <InternshipPrograms />
      <CorporateTraining />
      <AiAutomation />
      <OurProcess />
      <Statistics />
      <PortfolioPreview />
      <LatestBlogs />
      <Testimonials />
      <Faqs />
      <CallToAction />
    </>
  );
}
