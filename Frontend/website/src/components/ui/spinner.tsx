import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className = 'w-5 h-5 text-current' }: SpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} />;
}
