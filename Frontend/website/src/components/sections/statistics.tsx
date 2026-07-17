import React from 'react';

const stats = [
  { value: "50+", label: "Enterprise Clients", suffix: "" },
  { value: "120+", label: "Projects Delivered", suffix: "" },
  { value: "99.9", label: "Uptime Guaranteed", suffix: "%" },
  { value: "24/7", label: "Premium Support", suffix: "" }
];

export function Statistics() {
  return (
    <section className="py-20 bg-primary-500 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400 rounded-full blur-[80px] opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600 rounded-full blur-[80px] opacity-50 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 lg:divide-x lg:divide-primary-400/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center py-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 flex items-baseline tracking-tight">
                {stat.value}
                {stat.suffix && <span className="text-3xl lg:text-4xl text-primary-200 font-medium ml-1">{stat.suffix}</span>}
              </div>
              <div className="text-primary-100 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
