import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplet, Eye, EyeOff } from 'lucide-react';

import { useAuthStore } from '@/store/authStore';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  
  // State
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  // Handle Login
  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setShowLoader(true);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock User Data
      const fakeUser = {
        id: "1",
        email: data.email, 
        name: "Dr. Yusuf (Demo)",
        role: "doctor",
      };
      
      login(fakeUser, "mock-token-xyz");
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      setServerError(t('invalid_credentials') || "Invalid email or password");
      setShowLoader(false);
    }
  };

  const handleDemoFill = () => {
    setValue('email', 'demo@glucolens.com');
    setValue('password', 'password123');
  };

  return (
    <>
      {showLoader && (
        <LoadingScreen 
          fullScreen={true} 
          message={t('logging_in') || "Authenticating..."} 
        />
      )}

      <AuthLayout hideHeader={true}>
        <div className="bg-white rounded-2xl shadow-soft p-8 sm:p-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="h-12 w-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-2 transform transition-transform hover:scale-110 duration-300">
              <Droplet size={28} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Glucolens
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {t('welcome')}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center font-medium">
                {serverError}
              </div>
            )}
            
            <Input
              label={t('email_label')}
              {...register('email')}
              error={errors.email?.message}
              placeholder="name@example.com"
              className="h-11"
              disabled={showLoader}
            />
            
            <div className="relative">
               <Input
                label={t('password_label')}
                type={showPassword ? "text" : "password"}
                {...register('password')}
                error={errors.password?.message}
                placeholder="••••••••"
                className="h-11 pr-10"
                disabled={showLoader}
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                  disabled={showLoader}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary-600 hover:bg-primary-700 h-11 text-base shadow-lg shadow-primary-600/20"
              isLoading={showLoader}
              disabled={showLoader}
            >
              {t('login_button')}
            </Button>

            <div className="flex items-center justify-center">
              <Link to="/forgot-password" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                {t('forgot_password')}
              </Link>
            </div>

             <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400 font-medium">Or</span>
                </div>
              </div>

             <button 
                type="button"
                onClick={handleDemoFill}
                disabled={showLoader}
                className="w-full bg-white border border-gray-200 text-gray-700 font-semibold h-11 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                {t('demo_button')}
              </button>
          </form>

           <div className="text-center text-xs text-gray-500 mt-6">
            {t('no_account')} <Link to="/auth/register" className="text-primary-600 font-bold hover:underline">{t('sign_up')}</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
