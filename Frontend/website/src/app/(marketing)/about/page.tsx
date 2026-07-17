import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { Users, Target, Shield, Zap, Building2, Globe2 } from 'lucide-react';
import { FeatureGrid } from '@/components/ui/feature-grid';

export const metadata: Metadata = {
  title: 'About Us | AESCION',
  description: 'Learn about AESCION, our mission, vision, and the team building the future of enterprise software.',
};

const values = [
  { icon: Shield, title: 'Uncompromising Quality', description: 'We build systems that are secure, scalable, and resilient by design. We never cut corners on architecture.' },
  { icon: Target, title: 'Business Alignment', description: 'Technology is just a tool. Our true focus is solving your most complex business challenges and driving measurable ROI.' },
  { icon: Zap, title: 'Continuous Innovation', description: 'We constantly evaluate and integrate cutting-edge technologies like LLMs to give our clients a competitive advantage.' },
  { icon: Users, title: 'Partnership Approach', description: 'We don’t just deliver code. We act as your long-term technical partner, providing ongoing guidance and support.' },
];

const timeline = [
  { year: '2023', title: 'AESCION Founded', description: 'Started with a vision to bring Silicon Valley engineering standards to enterprise organizations.' },
  { year: '2024', title: 'Enterprise Expansion', description: 'Secured partnerships with Fortune 500 companies for cloud migration and custom ERP development.' },
  { year: '2025', title: 'AI Integration Practice', description: 'Launched our dedicated AI consulting arm, integrating custom LLMs into enterprise workflows.' },
  { year: '2026', title: 'Global Operations', description: 'Expanded our operations to support clients across North America, Europe, and Asia.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="Architecting the Future of Enterprise Software."
        description="We are a collective of elite software engineers, cloud architects, and AI specialists dedicated to solving complex technical challenges for the world's most ambitious organizations."
        breadcrumbs={[{ label: 'About Us' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                badge="Our Story"
                title="Engineering Excellence as a Standard"
                align="left"
              />
              <div className="prose prose-lg text-neutral-600">
                <p>
                  AESCION was founded on a simple premise: enterprise software doesn't have to be slow, bloated, or hard to use. We recognized a massive gap in the market between what businesses needed and what traditional agencies were delivering.
                </p>
                <p>
                  We built our company differently. We don't employ "assemblers" who just glue plugins together. We hire computer scientists and systems architects who understand how to build resilient, high-performance software from the ground up.
                </p>
                <p>
                  Today, we partner with leading organizations across finance, healthcare, and education to modernize their technical infrastructure, automate their workflows, and train their engineering teams.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-neutral-100 rounded-2xl overflow-hidden relative mt-8">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 to-primary-600 flex items-center justify-center p-6 text-center shadow-inner">
                   <h3 className="text-white font-bold text-2xl">Modern Infrastructure</h3>
                 </div>
              </div>
              <div className="aspect-[4/5] bg-neutral-100 rounded-2xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center p-6 text-center shadow-inner">
                   <h3 className="text-white font-bold text-2xl">Elite Engineering</h3>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader 
            title="Our Core Values"
            description="The principles that guide our architecture decisions, our hiring process, and our client relationships."
          />
          <FeatureGrid features={values} columns={4} />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader 
            title="Our Journey"
            description="How we've grown and evolved our technical capabilities over time."
          />
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-100 text-primary-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-2.5 h-2.5 bg-primary-600 rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-xl text-neutral-900">{item.title}</h3>
                    <time className="font-mono font-medium text-primary-600">{item.year}</time>
                  </div>
                  <p className="text-neutral-600 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section reused from homepage component conceptually */}
      <section className="py-20 bg-primary-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x md:divide-primary-800">
            <div className="flex flex-col items-center"><div className="text-4xl md:text-5xl font-bold mb-2">50+</div><div className="text-primary-300 text-sm font-medium uppercase tracking-wider">Engineers</div></div>
            <div className="flex flex-col items-center"><div className="text-4xl md:text-5xl font-bold mb-2">120+</div><div className="text-primary-300 text-sm font-medium uppercase tracking-wider">Projects Shipped</div></div>
            <div className="flex flex-col items-center"><div className="text-4xl md:text-5xl font-bold mb-2">12</div><div className="text-primary-300 text-sm font-medium uppercase tracking-wider">Countries Served</div></div>
            <div className="flex flex-col items-center"><div className="text-4xl md:text-5xl font-bold mb-2">100%</div><div className="text-primary-300 text-sm font-medium uppercase tracking-wider">Client Retention</div></div>
          </div>
        </div>
      </section>
    </>
  );
}
