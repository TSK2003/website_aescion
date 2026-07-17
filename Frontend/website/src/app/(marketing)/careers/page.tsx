import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Heart, Laptop, Coffee, Globe, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | AESCION',
  description: 'Join our team of elite engineers building the next generation of enterprise software.',
};

const benefits = [
  { icon: Globe, title: 'Remote-First Culture', description: 'Work from anywhere in the world. We care about output and architecture, not office attendance.' },
  { icon: Heart, title: 'Comprehensive Health', description: 'Premium medical, dental, and vision coverage for you and your dependents.' },
  { icon: Laptop, title: 'Top-Tier Equipment', description: 'Get the latest MacBook Pro and a generous stipend for your home office setup.' },
  { icon: BookOpen, title: 'Continuous Learning', description: 'Unlimited budget for technical books, courses, and certifications (AWS, CKA, etc).' },
  { icon: Coffee, title: 'Generous PTO', description: 'Take the time you need to recharge with our flexible, minimum-required vacation policy.' },
  { icon: TrendingUp, title: 'Competitive Equity', description: 'We want you to act like an owner, which is why every employee receives competitive stock options.' },
];

const jobs = [
  { role: 'Senior Next.js Architect', team: 'Engineering', location: 'Remote (US/EU)', type: 'Full-time' },
  { role: 'Lead DevOps Engineer', team: 'Cloud Infrastructure', location: 'Remote', type: 'Full-time' },
  { role: 'AI / Machine Learning Engineer', team: 'AI Practice', location: 'Remote (Global)', type: 'Full-time' },
  { role: 'Enterprise UI/UX Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero 
        title="Build the software that runs the enterprise."
        description="We are always looking for exceptional software engineers, architects, and designers who are passionate about building scalable, high-performance systems."
        breadcrumbs={[{ label: 'Careers' }]}
        bgClassName="bg-primary-900 text-white"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <SectionHeader 
            title="Life at AESCION"
            description="We are an engineering-first culture. That means no unnecessary meetings, no bureaucratic red tape, and an intense focus on technical excellence and deep work."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">Culture Image 1</div>
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="bg-neutral-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">Culture Image 2</div>
              </div>
              <div className="bg-neutral-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">Culture Image 3</div>
              </div>
            </div>
          </div>
          
          <SectionHeader 
            title="Perks & Benefits"
            description="We take care of our team so they can focus on doing their best work."
          />
          <FeatureGrid features={benefits} columns={3} />
        </div>
      </section>

      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeader 
            title="Open Positions"
            description="Don't see a perfect fit? Send your resume anyway. We always make room for exceptional talent."
          />
          
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <Link 
                href={`/careers/${job.role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                key={idx} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-white border border-neutral-200 rounded-2xl hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 transition-all"
              >
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-500">
                    <span className="text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full">{job.team}</span>
                    <span className="flex items-center gap-1.5"><Globe className="w-4 h-4"/>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                    View Role <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
}
