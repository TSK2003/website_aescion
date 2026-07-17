import React from 'react';
import { Hero } from '@/components/sections/hero';
import { TrustedBy } from '@/components/sections/trusted-by';
import { CompanyOverview } from '@/components/sections/company-overview';
import { CoreServices } from '@/components/sections/core-services';
import { TechnologyExpertise } from '@/components/sections/technology-expertise';
import { SolutionsShowcase } from '@/components/sections/solutions-showcase';
import { WhyChooseUs } from '@/components/sections/why-choose-us';

import { IndustriesServed } from '@/components/sections/industries-served';
import { InternshipPrograms } from '@/components/sections/internship-programs';
import { CorporateTraining } from '@/components/sections/corporate-training';

import { AiAutomation } from '@/components/sections/ai-automation';
import { OurProcess } from '@/components/sections/our-process';
import { Statistics } from '@/components/sections/statistics';

import { PortfolioPreview } from '@/components/sections/portfolio-preview';
import { LatestBlogs } from '@/components/sections/latest-blogs';
import { Testimonials } from '@/components/sections/testimonials';
import { Faqs } from '@/components/sections/faqs';
import { CallToAction } from '@/components/sections/cta';

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
