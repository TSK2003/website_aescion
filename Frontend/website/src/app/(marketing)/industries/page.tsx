import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureGrid } from '@/components/ui/feature-grid';
import Link from 'next/link';
import {
  GraduationCap, Stethoscope, ShoppingCart, Factory, Building2, Landmark,
  ArrowRight, CheckCircle2, Target, BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries We Serve | AESCION',
  description: 'Technology solutions tailored for Education, Healthcare, Finance, Retail, Manufacturing, and Government.',
};

const industries = [
  {
    slug: 'education',
    icon: GraduationCap,
    title: 'Education & EdTech',
    overview: 'Build next-generation learning platforms, student information systems, and campus management solutions for schools, colleges, and universities.',
    problems: ['Legacy LMS platforms with poor UX', 'No real-time analytics on student performance', 'Fragmented systems for admissions, grades, and finance'],
    solutions: ['Custom LMS with AI-powered recommendations', 'Unified student portal with mobile-first design', 'Automated assessment and grading workflows'],
  },
  {
    slug: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare & Life Sciences',
    overview: 'HIPAA-compliant patient portals, telemedicine platforms, EHR systems, and clinical data analytics designed for healthcare institutions.',
    problems: ['Patient data siloed across departments', 'Manual clinical documentation workflows', 'Compliance complexity (HIPAA, GDPR, HL7)'],
    solutions: ['Interoperable EHR with FHIR standard', 'Telehealth platform with secure video and chat', 'AI-powered clinical decision support'],
  },
  {
    slug: 'finance',
    icon: Landmark,
    title: 'Banking & Fintech',
    overview: 'Secure core banking systems, payment gateways, lending platforms, and regulatory compliance tools for financial institutions.',
    problems: ['Legacy core banking systems are slow and costly', 'Fraud detection relies on rule-based approaches', 'Regulatory reporting is manual and error-prone'],
    solutions: ['Cloud-native core banking microservices', 'ML-powered real-time fraud detection', 'Automated regulatory reporting pipelines'],
  },
  {
    slug: 'retail',
    icon: ShoppingCart,
    title: 'Retail & E-commerce',
    overview: 'Headless commerce platforms, inventory management systems, and omnichannel experiences for retail businesses.',
    problems: ['Monolithic e-commerce platforms cannot scale', 'Disconnected inventory across channels', 'Poor mobile conversion rates'],
    solutions: ['Headless commerce with Next.js storefront', 'Real-time inventory sync across all channels', 'AI-powered product recommendations'],
  },
  {
    slug: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing & IoT',
    overview: 'Real-time dashboarding, supply chain tracking, predictive maintenance, and industrial IoT platforms.',
    problems: ['No visibility into production line status', 'Reactive maintenance leads to costly downtime', 'Supply chain disruptions are discovered too late'],
    solutions: ['IoT sensor data pipelines with real-time dashboards', 'ML-powered predictive maintenance models', 'Automated supply chain risk alerts'],
  },
  {
    slug: 'government',
    icon: Building2,
    title: 'Government & Public Sector',
    overview: 'Secure citizen portals, digital governance platforms, and public service automation for government bodies.',
    problems: ['Paper-based processes are slow and error-prone', 'Citizens cannot access services online', 'Data privacy and sovereignty concerns'],
    solutions: ['Secure citizen service portals with digital identity', 'Automated document processing with OCR and AI', 'On-premise or sovereign cloud deployments'],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Industry-Specific Solutions"
        description="Deep domain expertise across verticals allows us to build software that solves real problems, not generic templates."
        breadcrumbs={[{ label: 'Industries' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      <div className="bg-white">
        {industries.map((industry, idx) => (
          <section key={industry.slug} className={`py-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} border-b border-neutral-100`}>
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                      <industry.icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-900">{industry.title}</h2>
                  </div>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                    {industry.overview}
                  </p>

                  {/* Problems */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-500" /> Industry Challenges
                    </h3>
                    <ul className="space-y-3">
                      {industry.problems.map((problem, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-neutral-600">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></span>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Our Approach
                    </h3>
                    <ul className="space-y-3">
                      {industry.solutions.map((sol, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3 text-neutral-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-[4/3] bg-neutral-100 rounded-3xl overflow-hidden relative border border-neutral-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center">
                      <div className="text-center">
                        <industry.icon className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                        <span className="text-neutral-400 font-medium">{industry.title} Case Study</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-24 bg-primary-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don&apos;t see your industry?</h2>
          <p className="text-xl text-primary-100 mb-10">
            Our engineering expertise is transferable across any vertical. Tell us about your domain and we&apos;ll build a solution tailored to it.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
            Discuss Your Industry <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
