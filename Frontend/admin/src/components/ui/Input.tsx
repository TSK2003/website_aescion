import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Search } from 'lucide-react';

/* ======================================================
   INPUT SYSTEM
   Types: text, email, password, search, number, tel, url
   States: error, success, disabled, loading
   ====================================================== */

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helper?: string;
  error?: string;
  success?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helper, error, success, inputSize = 'md', leftIcon, rightIcon, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const sizeClasses = {
      sm: 'h-7 text-xs px-2',
      md: 'h-8 text-sm px-2.5',
      lg: 'h-10 text-sm px-3',
    };

    return (
      <div className="space-y-1">
        {label && <label htmlFor={inputId} className="text-label">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={cn(
              'w-full border rounded-md bg-white transition-default focus-ring outline-none',
              sizeClasses[inputSize],
              leftIcon && 'pl-8',
              (isPassword || rightIcon) && 'pr-8',
              error
                ? 'border-danger focus:ring-danger/30'
                : success
                ? 'border-success focus:ring-success/30'
                : 'border-gray-200 focus:border-primary',
              props.disabled && 'bg-gray-50 text-gray-400 cursor-not-allowed',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>
          )}
        </div>
        {error && <p className="text-[11px] text-danger flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
        {success && <p className="text-[11px] text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{success}</p>}
        {helper && !error && !success && <p className="text-helper">{helper}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ======================================================
   TEXTAREA
   ====================================================== */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helper, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1">
        {label && <label htmlFor={inputId} className="text-label">{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-2.5 py-2 text-sm border rounded-md bg-white transition-default focus-ring outline-none resize-none',
            error ? 'border-danger focus:ring-danger/30' : 'border-gray-200 focus:border-primary',
            props.disabled && 'bg-gray-50 text-gray-400',
            className
          )}
          rows={3}
          {...props}
        />
        {error && <p className="text-[11px] text-danger flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
        {helper && !error && <p className="text-helper">{helper}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

/* ======================================================
   SELECT
   ====================================================== */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helper, error, options, placeholder, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1">
        {label && <label htmlFor={inputId} className="text-label">{label}</label>}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-8 px-2.5 text-sm border rounded-md bg-white transition-default focus-ring outline-none appearance-none',
            error ? 'border-danger focus:ring-danger/30' : 'border-gray-200 focus:border-primary',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <p className="text-[11px] text-danger flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
        {helper && !error && <p className="text-helper">{helper}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

/* ======================================================
   CHECKBOX & TOGGLE
   ====================================================== */

export function Checkbox({ label, checked, onChange, disabled }: { label?: string; checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export function Toggle({ label, checked, onChange, disabled }: { label?: string; checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className={cn('inline-flex items-center gap-2.5 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-gray-200'
        )}
      >
        <span className={cn(
          'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm',
          checked && 'translate-x-4'
        )} />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
