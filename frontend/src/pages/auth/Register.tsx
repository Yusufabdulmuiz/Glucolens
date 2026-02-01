import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { registerSchema, RegisterFormData } from '@/lib/validation';

/**
 * Registration Page Component
 */
const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      const response = await api.post('/auth/register', {
        full_name: data.fullName,
        email: data.email,
        password: data.password
      });
      
      // Auto-login after registration (if API returns token)
      // Or redirect to login page
      if ((response.data as any).access_token) {
         login((response.data as any).user, (response.data as any).access_token);
         navigate('/dashboard');
      } else {
         navigate('/auth/login');
      }

    } catch (err: any) {
      // -- TEMPORARY DEV FALLBACK --
      if (import.meta.env.DEV) {
         console.warn("⚠️ DEV MODE: Simulating successful registration");
         login({ id: '2', name: data.fullName, email: data.email }, 'mock-token');
         navigate('/dashboard');
         return;
      }
      // -- END DEV FALLBACK --
      
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-gray-500">
          Enter your details to get started with Glucolens
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link 
          to="/auth/login" 
          className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;