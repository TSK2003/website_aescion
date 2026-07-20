import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { DynamicAccordion } from '@/components/ui/dynamic-accordion';
import Link from 'next/link';
import {
  Code, Cloud, BrainCircuit, Database, Smartphone, Shield,
  CheckCircle2, ArrowRight, Star, GraduationCap, Calendar, Users, Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Internship Programs | AESCION',
  description: 'Launch your tech career with our rigorous internship programs. Work on live enterprise projects with senior mentors.',
};

const domains = [
  { icon: Code, title: 'Full-Stack Development', desc: 'React, Next.js, Node.js, NestJS, PostgreSQL' },
  { icon: Cloud, title: 'Cloud Engineering', desc: 'AWS, Docker, Kubernetes, CI/CD, Terraform' },
  { icon: BrainCircuit, title: 'AI & Machine Learning', desc: 'Python, PyTorch, LLMs, Data Pipelines' },
  { icon: Database, title: 'Data Engineering', desc: 'PostgreSQL, Redis, Kafka, ETL Pipelines' },
  { icon: Smartphone, title: 'Mobile Development', desc: 'React Native, Flutter, iOS, Android' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Penetration Testing, OWASP, Zero-Trust' },
];

const processSteps = [
  { step: '01', title: 'Apply Online', desc: 'Fill out the application form with your resume, portfolio, and preferred domain.' },
  { step: '02', title: 'Technical Assessment', desc: 'Complete a take-home coding challenge or architecture design exercise.' },
  { step: '03', title: 'Interview', desc: 'A 30-minute technical interview with one of our senior architects.' },
  { step: '04', title: 'Onboarding', desc: 'Selected candidates receive a personalized learning roadmap and mentor assignment.' },
  { step: '05', title: 'Live Projects', desc: 'Work on real enterprise projects under the supervision of your assigned mentor.' },
  { step: '06', title: 'Certification', desc: 'Upon successful completion, receive an AESCION certification and performance evaluation.' },
];

const stats = [
  { value: '98%', label: 'Placement Rate' },
  { value: '500+', label: 'Interns Trained' },
  { value: '12', label: 'Week Duration' },
  { value: '4.9/5', label: 'Intern Rating' },
];

const faqs = [
  { question: 'Who is eligible for the internship?', answer: 'Students in their 3rd or 4th year of B.Tech/B.E/MCA/M.Tech/BCA, or recent graduates within 1 year of graduation. No prior industry experience required.' },
  { question: 'Is the internship paid?', answer: 'Our premium internship tracks have a nominal program fee that covers mentorship, infrastructure, and certification. Top performers receive stipends and full-time offers.' },
  { question: 'What is the duration?', answer: 'Our standard program is 12 weeks (3 months). We also offer 4-week intensive bootcamp tracks and 6-month extended research internships.' },
  { question: 'Can I do this internship remotely?', answer: 'Yes. All internship programs are available in remote, hybrid, and on-site formats.' },
  { question: 'Will I get a certificate?', answer: 'Yes. Upon successful completion, you receive an AESCION internship certificate, a detailed performance evaluation, and a letter of recommendation.' },
];

export default function InternshipPage() {
  return (
    <>
      <PageHero
        title="Launch Your Tech Career"
        description="Bridge the gap between academic learning and enterprise software engineering. Work on live production systems with senior mentors."
        breadcrumbs={[{ label: 'Internship Programs' }]}
        bgClassName="bg-neutral-950 text-white"
      />

      {/* Stats Banner */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-primary-100 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Domains */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="Available Domains"
            description="Choose your area of specialisation. Each domain includes a unique curriculum designed by our engineering leads."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {domains.map((domain, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-2xl hover:border-primary-300 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                  <domain.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{domain.title}</h3>
                <p className="text-neutral-500 text-sm">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader
            title="Selection Process"
            description="A transparent, merit-based process designed to identify candidates with strong fundamentals and a genuine passion for engineering."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {processSteps.map((item, idx) => (
              <div key={idx} className="relative p-6 bg-white border border-neutral-200 rounded-2xl">
                <span className="absolute -top-3 -left-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 mt-3">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader badge="Learning Roadmap" title="What You'll Work On" align="left" isDark />
              <ul className="space-y-5">
                {[
                  'Real enterprise codebases with production-grade architecture',
                  'CI/CD pipelines, automated testing, and code review workflows',
                  'System design, database modelling, and API architecture',
                  'Agile sprint planning, standups, and retrospectives',
                  'Security best practices, OWASP, and data privacy',
                  'Presentation and technical communication skills',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-primary-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-2xl">
              <div className="w-full h-8 bg-neutral-950 rounded-t-lg flex items-center px-4 gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm text-primary-300 space-y-2">
                <p><span className="text-secondary-400">const</span> intern = {'{'}</p>
                <p className="ml-4">name: <span className="text-green-400">&quot;Your Name&quot;</span>,</p>
                <p className="ml-4">domain: <span className="text-green-400">&quot;Full-Stack&quot;</span>,</p>
                <p className="ml-4">mentor: <span className="text-green-400">&quot;Senior Architect&quot;</span>,</p>
                <p className="ml-4">project: <span className="text-green-400">&quot;Enterprise ERP&quot;</span>,</p>
                <p>{'};'}</p>
                <br />
                <p><span className="text-secondary-400">await</span> intern.<span className="text-white">startJourney</span>();</p>
                <p className="text-green-400 animate-pulse">&gt; Career launched successfully 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader title="Frequently Asked Questions" />
          <DynamicAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-neutral-400 mb-10">
            Applications are open for the next cohort. Limited seats available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
              Apply Now
            </Link>
            <Link href="/training" className="px-8 py-4 border border-neutral-700 text-white font-semibold rounded-xl hover:bg-neutral-900 transition-colors">
              View Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
