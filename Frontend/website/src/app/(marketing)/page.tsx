import React from 'react';
import { Hero } from '@/components/sections/hero';
import dynamic from 'next/dynamic';

const TrustedBy = dynamic(() => import('@/components/sections/trusted-by').then(mod => ({ default: mod.TrustedBy })));
const CompanyOverview = dynamic(() => import('@/components/sections/company-overview').then(mod => ({ default: mod.CompanyOverview })));
const CoreServices = dynamic(() => import('@/components/sections/core-services').then(mod => ({ default: mod.CoreServices })));
const TechnologyExpertise = dynamic(() => import('@/components/sections/technology-expertise').then(mod => ({ default: mod.TechnologyExpertise })));
const WhyChooseUs = dynamic(() => import('@/components/sections/why-choose-us').then(mod => ({ default: mod.WhyChooseUs })));
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <CompanyOverview />
      <CoreServices />
      <TechnologyExpertise />
      <WhyChooseUs />
    </>
  );
}
