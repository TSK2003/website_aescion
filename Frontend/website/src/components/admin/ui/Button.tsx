import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/* ======================================================
   BUTTON SYSTEM
   Variants: primary, secondary, outline, ghost, danger, success
   Sizes: sm, md, lg
   States: loading, disabled, icon-only
   ====================================================== */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft-sm',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90 shadow-soft-sm',
  outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
  ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  danger: 'bg-danger text-danger-foreground hover:opacity-90 shadow-soft-sm',
  success: 'bg-success text-success-foreground hover:opacity-90 shadow-soft-sm',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
  md: 'h-8 px-3 text-sm gap-2 rounded-md',
  lg: 'h-10 px-4 text-sm gap-2 rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, icon, iconRight, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-default focus-ring whitespace-nowrap',
          variantStyles[variant],
          sizeStyles[size],
          (disabled || loading) && 'opacity-50 pointer-events-none',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
        {children}
        {iconRight}
      </button>
    );
  }
);
Button.displayName = 'Button';

/* ======================================================
   ICON BUTTON — Compact square button
   ====================================================== */

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'md';
  tooltip?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', tooltip, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        title={tooltip}
        className={cn(
          'inline-flex items-center justify-center transition-default focus-ring rounded-md',
          variant === 'outline' ? 'border border-gray-200 bg-white hover:bg-gray-50' : 'hover:bg-gray-100',
          size === 'sm' ? 'w-7 h-7' : 'w-8 h-8',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
