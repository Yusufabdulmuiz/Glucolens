import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { loginSchema, LoginFormData } from '@/lib/validation';
import { AuthResponse } from '@/types/auth';

/**
 * Login Page Component
 * Handles user authentication via email/password.
 * Redirects to the dashboard or previous protected route upon success.
 */
const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Determine where to redirect after login (default to dashboard)
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Form Submission Handler
   * Attempts to authenticate with the backend.
   */
  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      // In development/mock mode, this might fail if the backend isn't running.
      // We will handle the "Demo Mode" fallback in the error block below for now.
      const response = await api.post<AuthResponse>('/auth/login', data);
      
      login(response.data.user, response.data.access_token);
      navigate(from, { replace: true });
      
    } catch (err: any) {
      console.error('Login Failed', err);
      
      // -- TEMPORARY DEV FALLBACK --
      // Since we don't have the real backend running yet, we allow a "Backdoor"
      // strictly for development testing if the API fails.
      if (import.meta.env.DEV) {
         console.warn("⚠️ DEV MODE: Simulating successful login");
         login(
           { id: '1', name: 'Dev User', email: data.email }, 
           'mock-jwt-token-123'
         );
         navigate(from, { replace: true });
         return;
      }
      // -- END DEV FALLBACK --

      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
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
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link 
          to="/auth/register" 
          className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;