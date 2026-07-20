import React from 'react';
import Link from 'next/link';
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
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Our Offices</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Head Office</h4>
                        <p className="text-neutral-600 text-sm">7/3-49, VENKATESWARAPURAM,KADANGANERI,<br/>GANDHI NAGAR STREET, TENKASI 627854 TAMIL NADU</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Branch Office</h4>
                        <p className="text-neutral-600 text-sm">10B/1H,15/1, THIRUMALAI NAMBI, COMPLEX,<br/>PALAYAMKOTTAI, 2ND FLOOR THIRUVANDURAM ROAD,<br/>TIRUNELVELI-627003, TAMIL NADU</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Phone</h4>
                        <p className="text-neutral-600">+91 7550068877</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0 text-primary-600">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">Email</h4>
                        <p className="text-neutral-600">info@aesciontech.com</p>
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
                  <Link href="/careers" className="inline-block px-6 py-2 border border-neutral-700 hover:border-neutral-500 rounded-lg text-sm font-semibold transition-colors">
                    View Open Positions
                  </Link>
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <div className="w-full h-[450px] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.3562340597733!2d77.72276134075794!3d8.728312641957759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0411ff5689aa91%3A0x77874ccbd7fe72d8!2sAESCION%20EDTECH%20SOLUTIONS!5e1!3m2!1sen!2sin!4v1784521536139!5m2!1sen!2sin" 
          className="w-full h-full"
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
