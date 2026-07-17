'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/toast';

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'Enterprise Software Development'
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      addToast('success', 'Your inquiry has been sent successfully. Our team will contact you shortly.');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      addToast('error', 'There was a problem submitting your inquiry. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-neutral-900">First Name</label>
          <input 
            {...register('firstName')}
            type="text" 
            id="firstName" 
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}`} 
            placeholder="John" 
          />
          {errors.firstName && <p className="text-red-500 text-xs font-medium mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-neutral-900">Last Name</label>
          <input 
            {...register('lastName')}
            type="text" 
            id="lastName" 
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}`} 
            placeholder="Doe" 
          />
          {errors.lastName && <p className="text-red-500 text-xs font-medium mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-900">Work Email</label>
        <input 
          {...register('email')}
          type="email" 
          id="email" 
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}`} 
          placeholder="john@company.com" 
        />
        {errors.email && <p className="text-red-500 text-xs font-medium mt-1">{errors.email.message}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="inquiryType" className="text-sm font-medium text-neutral-900">What can we help you with?</label>
        <select 
          {...register('inquiryType')}
          id="inquiryType" 
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow bg-white ${errors.inquiryType ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}`}
        >
          <option value="Enterprise Software Development">Enterprise Software Development</option>
          <option value="AI & Automation Consulting">AI & Automation Consulting</option>
          <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
          <option value="Corporate Training">Corporate Training</option>
          <option value="Other">Other</option>
        </select>
        {errors.inquiryType && <p className="text-red-500 text-xs font-medium mt-1">{errors.inquiryType.message}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-900">Project Details</label>
        <textarea 
          {...register('message')}
          id="message" 
          rows={5} 
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}`} 
          placeholder="Tell us about your technical requirements, timeline, and goals..."
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs font-medium mt-1">{errors.message.message}</p>}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Spinner className="w-5 h-5 text-white" />
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
}
