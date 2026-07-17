import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/ui/page-hero';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | AESCION',
  description: 'Get in touch with our enterprise technology consultants to discuss your next project.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Let's build something exceptional together."
        description="Whether you're looking to migrate a monolithic architecture, deploy custom LLMs, or upskill your engineering team, our architects are ready to help."
        breadcrumbs={[{ label: 'Contact Us' }]}
        bgClassName="bg-primary-900 text-white"
      />

      <section className="py-24 bg-white relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50 rounded-bl-[100px] pointer-events-none -z-10 hidden lg:block"></div>
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12 relative z-10">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">Send us a message</h2>
              <p className="text-neutral-600 mb-8">Fill out the form below and a senior architect will get back to you within 24 hours.</p>
              
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-center lg:py-12">
              <div className="space-y-12">
                
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Global Headquarters</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Office Location</h4>
                        <p className="text-neutral-600">123 Enterprise Way, Suite 400<br/>Tech District, CA 94105</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Phone</h4>
                        <p className="text-neutral-600">+1 (800) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Email</h4>
                        <p className="text-neutral-600">hello@aescion.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Business Hours</h4>
                        <p className="text-neutral-600">Mon - Fri: 9:00 AM - 6:00 PM EST<br/>24/7 Support for Enterprise Clients</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-neutral-900 rounded-3xl text-white">
                  <h3 className="text-xl font-bold mb-3">Careers Inquiry?</h3>
                  <p className="text-neutral-400 mb-6 text-sm">Please do not use this form for job applications. Visit our careers portal instead.</p>
                  <a href="/careers" className="inline-block px-6 py-2 border border-neutral-700 hover:border-neutral-500 rounded-lg text-sm font-semibold transition-colors">
                    View Open Positions
                  </a>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <div className="w-full h-96 bg-neutral-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
            <span className="text-neutral-500 font-medium">Interactive Map Integration</span>
          </div>
        </div>
      </div>
    </>
  );
}
