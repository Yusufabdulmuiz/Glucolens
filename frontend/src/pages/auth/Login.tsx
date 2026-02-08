import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Stores & Services
import { useAuthStore } from '@/store/authStore';
import { loginSchema, type LoginFormData } from '@/lib/validation';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoadingScreen } from '@/components/ui/LoadingScreen'; // <--- NEW IMPORT

/**
 * Login Page Component (DEMO VERSION)
 * Bypasses the backend for testing purposes.
 */
const Login = () => {
  // State for handling errors
  const [serverError, setServerError] = useState<string | null>(null);
  
  // NEW: State to control the Blue Full-Screen Loader
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  // Determine where to send the user after login
  const from = location.state?.from?.pathname || '/dashboard';

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }, // Removed isSubmitting because we use showLoader now
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  /**
   * Handle Form Submission (MOCKED)
   * This version DOES NOT call the API. It logs you in immediately.
   */
  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    
    // 1. TRIGGER THE BLUE SCREEN IMMEDIATELY
    setShowLoader(true);

    try {
      // 2. Fake a 3-second delay (Longer wait = "Serious Medical App" feel)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 3. Create Fake User Data
      const fakeUser = {
        id: "demo-user-123",
        email: data.email, 
        name: "Dr. Yusuf (Demo)",
        role: "doctor",
      };
      
      const fakeToken = "mock-access-token-xyz-123";

      // 4. Update Global Store
      console.log(`[Demo Login] Success. Welcome ${fakeUser.name}`);
      login(fakeUser, fakeToken);

      // 5. Navigate to Dashboard
      navigate(from, { replace: true });

    } catch (err: unknown) {
      console.error('[Login] Request Failed:', err);
      setServerError('An unexpected error occurred. Please try again.');
      setShowLoader(false); // Turn off loader if it fails
    }
  };

  return (
    <>
      {/* NEW: The Full Screen Overlay */}
      {showLoader && (
        <LoadingScreen 
          fullScreen={true} 
          message="Authenticating Credentials..." 
        />
      )}

      <AuthLayout>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500">
            (Demo Mode: Enter ANY email/password)
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
              placeholder="demo@glucolens.com"
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
            isLoading={showLoader} // Keeps the button spinner spinning too!
            disabled={showLoader}  // Stops double-clicking
          >
            Sign in (Demo)
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
    </>
  );
};

export default Login;
