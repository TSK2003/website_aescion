'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { ToastContainer, ToastProps } from '@/components/ui/Toast';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const showToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      
      showToast({ title: 'Welcome back!', description: 'Redirecting to dashboard...', type: 'success' });
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    } catch (error: any) {
      showToast({ 
        title: 'Authentication Failed', 
        description: error.message || 'Invalid credentials. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-4 shadow-soft-lg">
            A
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AESCION Admin OS</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to your enterprise workspace</p>
        </div>

        <div className="surface p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="email"
              control={control}
              label="Work Email"
              type="email"
              placeholder="admin@aescion.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <FormField
                name="password"
                control={control}
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
              />
            </div>

            <FormField
              name="rememberMe"
              control={control}
              type="checkbox"
              label="Remember this device for 30 days"
            />

            <Button type="submit" className="w-full mt-2" size="lg" loading={isLoading} iconRight={<ArrowRight className="w-4 h-4 ml-1 opacity-70" />}>
              Sign In
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} AESCION. All rights reserved. <br />
          Enterprise Software Ecosystem
        </p>
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
