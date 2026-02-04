import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Stores & Services
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { registerSchema, type RegisterFormData } from '@/lib/validation';
import { type AuthResponse } from '@/types/auth';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';

/**
 * Register Page Component
 * Handles new user registration and auto-login.
 */
const Register = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * Handle Registration Submission
   * @param data - Validated form data from Zod
   */
  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      // 1. Type-Safe API Call
      // The Mock Adapter (or real backend) will return the User + Token
      const response = await api.post<AuthResponse>('/auth/register', {
        full_name: data.fullName,
        email: data.email,
        password: data.password
      });

      // 2. Validate Response Data
      const { user, access_token } = response.data;
      
      if (!user || !access_token) {
        throw new Error("Registration successful, but server returned invalid data.");
      }

      // 3. Auto-Login & Redirect
      // We immediately log the user in with the token we just received
      login(user, access_token);
      console.log('[Register] Success. Auto-logging in...');
      navigate('/dashboard');

    } catch (err: unknown) {
      console.error('[Register] Request Failed:', err);

      // 4. Professional Error Handling
      if (axios.isAxiosError(err)) {
        // Handle 409 Conflict (Email exists) or 400 Bad Request
        const message = err.response?.data?.message || 'Registration failed. Please try again.';
        setServerError(message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred.');
      }
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <span className="font-bold">Error:</span> {serverError}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Jean Pierre"
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

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isSubmitting}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link 
          to="/auth/login" 
          className="font-medium text-primary-600 hover:text-primary-500 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;