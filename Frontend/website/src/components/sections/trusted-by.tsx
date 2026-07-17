import React from 'react';

const partners = [
  "Microsoft", "AWS", "Google Cloud", "Stripe", "Vercel", "Zoho"
];

export function TrustedBy() {
  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
          Trusted by Innovative Organizations Worldwide
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <div key={index} className="text-xl md:text-2xl font-bold text-neutral-800 select-none">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
