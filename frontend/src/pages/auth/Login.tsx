import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Stores & Services
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { type AuthResponse } from '@/types/auth';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';

/**
 * Login Page Component
 * Handles user authentication and redirection.
 */
const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        username: data.email, 
        password: data.password
      });

      const { user, access_token } = response.data;
      
      if (!access_token || !user) {
        throw new Error("Invalid response from server: Missing token or user data");
      }

      login(user, access_token);
      navigate(from, { replace: true });

    } catch (err: unknown) {
      console.error('[Login] Request Failed:', err);

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'Invalid email or password.';
        setServerError(message);
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <span className="font-bold">Error:</span> {serverError}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email or username"
            type="email"
            placeholder="your.email@example.com"
            error={errors.email?.message}
            {...register('email')}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
            autoComplete="current-password"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isSubmitting}
        >
          Login
        </Button>

        {/* Added: Forgot Password Link */}
        <div className="text-center">
          <Link 
            to="/auth/forgot-password" 
            className="text-sm font-medium text-primary hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      {/* Updated: Bottom text */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link 
          to="/auth/register" 
          className="font-medium text-primary hover:underline transition-colors"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;