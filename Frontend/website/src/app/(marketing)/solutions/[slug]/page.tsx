import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { DynamicAccordion } from '@/components/ui/dynamic-accordion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BarChart3, Layers, Settings2 } from 'lucide-react';

interface SolutionDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Mock data — will be replaced by CMS in production
const SOLUTIONS_DATA: Record<string, {
  title: string;
  tagline: string;
  challenges: string[];
  modules: { name: string; desc: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}> = {
  'education-lms': {
    title: 'Next-Gen Learning Management System',
    tagline: 'A hyper-scalable LMS for universities, schools, and corporate training programs.',
    challenges: [
      'Legacy LMS platforms are slow, expensive, and hard to customize.',
      'Student engagement drops due to poor UX and lack of mobile support.',
      'Institutions lack real-time analytics on learner performance.',
      'Compliance and data privacy requirements are increasingly complex.',
    ],
    modules: [
      { name: 'Course Builder', desc: 'Drag-and-drop course creation with multimedia support, quizzes, and assignments.' },
      { name: 'Live Classes', desc: 'Integrated video conferencing with recording, whiteboard, and attendance tracking.' },
      { name: 'Student Portal', desc: 'Personalized dashboards with progress tracking, certificates, and social features.' },
      { name: 'Analytics Engine', desc: 'Real-time reports on engagement, completion rates, assessment performance, and predictions.' },
    ],
    benefits: ['40% increase in student engagement', '60% reduction in admin overhead', 'FERPA & GDPR compliant out of the box', 'White-label ready for institutional branding'],
    faqs: [
      { question: 'Can this integrate with our existing Student Information System?', answer: 'Yes. We provide REST and GraphQL APIs for deep integration with SIS platforms like Banner, PowerSchool, and custom systems.' },
      { question: 'Does it support offline learning?', answer: 'Yes. Our progressive web app (PWA) architecture allows students to download content and complete assignments offline, with automatic sync when connectivity returns.' },
    ],
  },
};

const DEFAULT_SOLUTION = {
  title: 'Enterprise Solution',
  tagline: 'A custom-architected solution designed for your specific business domain.',
  challenges: [
    'Off-the-shelf solutions do not fit unique business processes.',
    'Data silos prevent unified visibility across departments.',
    'Legacy systems are expensive to maintain and difficult to scale.',
    'Compliance requirements demand fine-grained access control.',
  ],
  modules: [
    { name: 'Core Platform', desc: 'The foundational architecture including auth, RBAC, multi-tenancy, and data pipeline.' },
    { name: 'Dashboard & Analytics', desc: 'Real-time business intelligence with customizable dashboards and alerting.' },
    { name: 'Workflow Engine', desc: 'Visual workflow builder for automating complex business processes and approvals.' },
    { name: 'Integration Hub', desc: 'Connect with 200+ third-party services via pre-built connectors and webhooks.' },
  ],
  benefits: ['Full source code ownership', 'Infinite customization potential', 'No per-seat licensing fees', 'Enterprise-grade security by default'],
  faqs: [
    { question: 'How long does implementation take?', answer: 'Most enterprise deployments go live in 3-6 months, depending on the complexity of integrations and custom modules required.' },
    { question: 'Do we own the intellectual property?', answer: 'Absolutely. Unlike SaaS, you own 100% of the source code, data, and deployment infrastructure. No vendor lock-in.' },
  ],
};

export async function generateMetadata(props: SolutionDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const data = SOLUTIONS_DATA[params.slug] || DEFAULT_SOLUTION;
  return {
    title: `${data.title} | AESCION Solutions`,
    description: data.tagline,
  };
}

export default async function SolutionDetailPage(props: SolutionDetailPageProps) {
  const params = await props.params;
  const data = SOLUTIONS_DATA[params.slug] || DEFAULT_SOLUTION;

  return (
    <>
      <PageHero
        title={data.title}
        description={data.tagline}
        breadcrumbs={[{ label: 'Solutions', href: '/solutions' }, { label: data.title }]}
        bgClassName="bg-primary-900 text-white"
      />

      {/* Business Challenges */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader badge="The Problem" title="Business Challenges We Solve" align="left" />
              <ul className="space-y-5">
                {data.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-500 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{challenge}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-100 rounded-3xl aspect-video flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <span className="font-medium">Solution Architecture Diagram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader badge="Platform" title="Core Modules" description="Each module is independently deployable and built with a microservices architecture." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {data.modules.map((mod, idx) => (
              <div key={idx} className="p-8 bg-white border border-neutral-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 text-primary-600">
                    {idx === 0 ? <Layers className="w-6 h-6" /> : idx === 1 ? <BarChart3 className="w-6 h-6" /> : <Settings2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{mod.name}</h3>
                    <p className="text-neutral-600 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-primary-950 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader title="Measurable Outcomes" description="Real results our clients achieve after deployment." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {data.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 bg-primary-900/50 border border-primary-800 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                <span className="text-primary-100 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader title="Frequently Asked Questions" />
          <DynamicAccordion items={data.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Ready to transform your operations?</h2>
          <p className="text-xl text-neutral-600 mb-10">
            Our architects will map your business requirements to a custom technical solution within 48 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
            Request a Technical Proposal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
