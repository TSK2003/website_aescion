import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { DynamicAccordion } from '@/components/ui/dynamic-accordion';
import Link from 'next/link';
import {
  Code, Cloud, BrainCircuit, Database, Shield, Smartphone,
  CheckCircle2, ArrowRight, Users, Award, BookOpen, Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Corporate Training | AESCION',
  description: 'Upskill your engineering workforce with our expert-led technology workshops on React, AWS, AI, and Software Architecture.',
};

const categories = [
  { icon: Code, title: 'Full-Stack Engineering', desc: 'React, Next.js, Node.js, NestJS, TypeScript, and System Design.', duration: '4-12 weeks' },
  { icon: Cloud, title: 'Cloud & DevOps', desc: 'AWS, Docker, Kubernetes, CI/CD, Terraform, and Infrastructure as Code.', duration: '4-8 weeks' },
  { icon: BrainCircuit, title: 'AI & Data Science', desc: 'Machine Learning, LLMs, PyTorch, LangChain, and Data Pipelines.', duration: '6-12 weeks' },
  { icon: Database, title: 'Database Architecture', desc: 'PostgreSQL, MongoDB, Redis, Elasticsearch, and performance tuning.', duration: '2-4 weeks' },
  { icon: Shield, title: 'Cybersecurity', desc: 'OWASP, penetration testing, zero-trust architecture, and compliance.', duration: '4-6 weeks' },
  { icon: Smartphone, title: 'Mobile Development', desc: 'React Native, Flutter, iOS/Android native, and mobile CI/CD.', duration: '4-8 weeks' },
];

const programTypes = [
  { title: 'Corporate Training', desc: 'Customized programs for your existing engineering teams. We assess skill gaps and design targeted workshops.' },
  { title: 'College Training', desc: 'Bridge the gap between academic curriculum and industry demands. We train final-year students in production-ready stacks.' },
  { title: 'Faculty Development Program', desc: 'Equip your teaching staff with hands-on expertise in modern technologies so they can teach with confidence.' },
  { title: 'Intensive Bootcamps', desc: '2-4 week immersive programs for rapid skill acquisition. Project-based learning with real-world deliverables.' },
];

const features = [
  { icon: Users, title: 'Expert Instructors', description: 'All training is conducted by our senior architects with 10+ years of production experience.' },
  { icon: Award, title: 'Certification', description: 'Participants receive industry-recognized AESCION certifications upon successful completion.' },
  { icon: BookOpen, title: 'Hands-On Projects', description: 'No slides-only lectures. Every program includes a real-world capstone project.' },
  { icon: Clock, title: 'Flexible Delivery', description: 'Available as on-site workshops, live virtual sessions, or self-paced hybrid programs.' },
];

const faqs = [
  { question: 'Can you customize the curriculum for our company?', answer: 'Yes, absolutely. We conduct a pre-training assessment to understand your team\'s current skill level and your specific technology goals, then design a fully customized curriculum.' },
  { question: 'What is the typical batch size?', answer: 'We recommend batches of 15-30 participants for optimal instructor-to-student interaction. For larger groups, we run parallel batches with dedicated instructors.' },
  { question: 'Do you provide post-training support?', answer: 'Yes. All participants get 30 days of post-training Q&A access, recorded sessions, and supplemental learning resources.' },
  { question: 'Can your team travel to our location?', answer: 'Yes. We conduct on-site training anywhere in the world. Travel and accommodation costs are included in the proposal.' },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        title="Corporate Technology Training"
        description="Equip your engineering teams with modern stacks. We design and deliver intensive, hands-on workshops led by our senior architects."
        breadcrumbs={[{ label: 'Training' }]}
        bgClassName="bg-primary-900 text-white"
      />

      {/* Training Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="Training Domains"
            description="Choose from our comprehensive catalog or request a custom curriculum tailored to your team's specific needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-8 bg-white border border-neutral-200 rounded-2xl hover:shadow-lg hover:border-primary-200 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{cat.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{cat.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Types */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader
            title="Program Formats"
            description="We offer training in multiple formats to fit the needs of corporates, colleges, and individual learners."
            isDark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {programTypes.map((prog, idx) => (
              <div key={idx} className="p-8 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-primary-500/50 transition-colors">
                <h3 className="text-xl font-bold mb-3">{prog.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader title="Why Train With AESCION" description="What sets our training programs apart from online courses and generic workshops." />
          <FeatureGrid features={features} columns={4} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader title="Frequently Asked Questions" />
          <DynamicAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-600 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upskill your team?</h2>
          <p className="text-xl text-primary-100 mb-10">
            Get a customized training proposal with curriculum, pricing, and scheduling within 48 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
            Request a Training Proposal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
