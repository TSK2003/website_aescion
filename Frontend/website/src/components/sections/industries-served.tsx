import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Stethoscope, 
  ShoppingCart, 
  Factory, 
  Building2, 
  Landmark,
  ArrowRight
} from 'lucide-react';

const industries = [
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Healthcare", icon: Stethoscope, slug: "healthcare" },
  { name: "Retail & E-commerce", icon: ShoppingCart, slug: "retail" },
  { name: "Manufacturing", icon: Factory, slug: "manufacturing" },
  { name: "Construction", icon: Building2, slug: "construction" },
  { name: "Finance", icon: Landmark, slug: "finance" }
];

export function IndustriesServed() {
  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/20 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Industries We Transform
            </h2>
            <p className="text-lg text-neutral-400">
              Deep domain expertise across verticals allows us to build solutions that solve specific industry challenges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, idx) => (
            <Link 
              href={`/industries/${industry.slug}`} 
              key={idx}
              className="group flex flex-col items-center justify-center p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:bg-neutral-800 hover:border-primary-500/50 transition-all duration-300"
            >
              <industry.icon className="w-10 h-10 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-center text-sm">{industry.name}</h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
