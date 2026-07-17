import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import Link from 'next/link';
import { ArrowRight, Building2, GraduationCap, Stethoscope, ShoppingCart, Factory, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Solutions | AESCION',
  description: 'Pre-architected enterprise solutions for ERP, HRMS, LMS, and AI capabilities.',
};

const solutions = [
  { slug: 'education-lms', title: 'Next-Gen LMS', desc: 'A hyper-scalable learning management system for universities and corporate ed-tech.', icon: GraduationCap },
  { slug: 'healthcare-ehr', title: 'Healthcare & EHR', desc: 'HIPAA-compliant patient portals, telemedicine apps, and electronic health records.', icon: Stethoscope },
  { slug: 'fintech-core', title: 'Fintech Core Systems', desc: 'Secure ledger systems, payment gateways, and banking APIs.', icon: Landmark },
  { slug: 'enterprise-erp', title: 'Enterprise ERP', desc: 'Custom enterprise resource planning systems to unify disjointed business units.', icon: Building2 },
  { slug: 'retail-omnichannel', title: 'Retail & E-commerce', desc: 'High-conversion headless commerce and inventory management.', icon: ShoppingCart },
  { slug: 'manufacturing-iot', title: 'Manufacturing IoT', desc: 'Real-time dashboarding, supply chain tracking, and predictive maintenance.', icon: Factory },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero 
        title="Pre-Architected Solutions"
        description="Accelerate your time-to-market with our battle-tested software solutions, customized to fit your exact business workflows."
        breadcrumbs={[{ label: 'Solutions' }]}
        bgClassName="bg-primary-900 text-white"
      />

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, idx) => (
              <div key={idx} className="flex gap-6 p-8 border border-neutral-200 rounded-2xl hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/10 transition-all group">
                <div className="w-16 h-16 bg-neutral-100 group-hover:bg-primary-50 rounded-2xl flex items-center justify-center shrink-0 text-neutral-500 group-hover:text-primary-600 transition-colors">
                  <solution.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">{solution.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{solution.desc}</p>
                  <Link 
                    href={`/solutions/${solution.slug}`} 
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:text-primary-700"
                  >
                    View Solution Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why custom solutions over SaaS?</h2>
          <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
            Off-the-shelf SaaS products force you to adapt your business to their software. Our custom-architected solutions adapt the software to your competitive advantage. You own the code, the data, and the intellectual property.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
            Discuss Your Use Case
          </Link>
        </div>
      </section>
    </>
  );
}
