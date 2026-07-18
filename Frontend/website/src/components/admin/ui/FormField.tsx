import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input, Select, Textarea, Checkbox } from '@/components/admin/ui/Input';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  placeholder?: string;
  helper?: string;
  className?: string;
  leftIcon?: React.ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  options,
  placeholder,
  helper,
  className,
  leftIcon,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        const errorMessage = error?.message as string | undefined;
        
        if (type === 'textarea') {
          return (
            <Textarea
              ref={ref}
              label={label}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              helper={helper}
              error={errorMessage}
              className={className}
            />
          );
        }

        if (type === 'select' && options) {
          return (
            <Select
              ref={ref}
              label={label}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              placeholder={placeholder}
              helper={helper}
              error={errorMessage}
              className={className}
            />
          );
        }

        if (type === 'checkbox') {
          return (
            <div className={className}>
              <Checkbox
                label={label}
                checked={value || false}
                onChange={onChange}
              />
              {errorMessage && <p className="text-[11px] text-danger mt-1">{errorMessage}</p>}
              {helper && !errorMessage && <p className="text-[11px] text-gray-400 mt-1">{helper}</p>}
            </div>
          );
        }

        return (
          <Input
            ref={ref}
            type={type}
            label={label}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            helper={helper}
            error={errorMessage}
            leftIcon={leftIcon}
            className={className}
          />
        );
      }}
    />
  );
}
