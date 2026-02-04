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
  // State for handling API errors (e.g., "Invalid password")
  const [serverError, setServerError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Determine where to send the user after login (default to dashboard)
  // This supports "Deep Linking" - if they tried to visit /settings but weren't logged in,
  // we send them back to /settings after they login.
  const from = location.state?.from?.pathname || '/dashboard';

  // Initialize React Hook Form with Zod Validation
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

  /**
   * Handle Form Submission
   * @param data - The validated form data (email, password) from Zod
   */
  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      // 1. Type-Safe API Call
      // We explicitly tell axios to expect an <AuthResponse> object.
      // This ensures 'response.data' has autocomplete for 'access_token' and 'user'.
      const response = await api.post<AuthResponse>('/auth/login', {
        username: data.email, // Adjust payload key based on backend requirement
        password: data.password
      });

      // 2. Update Global Store
      // We extract the user and token from the strictly typed response
      const { user, access_token } = response.data;
      
      if (!access_token || !user) {
        throw new Error("Invalid response from server: Missing token or user data");
      }

      login(user, access_token);

      // 3. Navigate
      console.log(`[Login] Success. Redirecting to: ${from}`);
      navigate(from, { replace: true });

    } catch (err: unknown) {
      console.error('[Login] Request Failed:', err);

      // 4. Professional Error Handling
      if (axios.isAxiosError(err)) {
        // If the error comes from the server (e.g., 401 Unauthorized)
        const message = err.response?.data?.message || 'Invalid email or password.';
        setServerError(message);
      } else if (err instanceof Error) {
        // If it's a code error (e.g., parsing failed)
        setServerError(err.message);
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* Global Server Error Alert */}
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <span className="font-bold">Error:</span> {serverError}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email')}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
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
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Link 
          to="/auth/register" 
          className="font-medium text-primary-600 hover:text-primary-500 hover:underline transition-colors"
        >
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;