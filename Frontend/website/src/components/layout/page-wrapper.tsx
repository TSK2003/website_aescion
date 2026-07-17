import React from 'react';

export function PageWrapper({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full bg-white pt-32 pb-24 ${className}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {children}
      </div>
    </div>
  );
}
