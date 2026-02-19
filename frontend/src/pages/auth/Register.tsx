import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// Stores & Services
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { registerSchema, type RegisterFormData } from '@/lib/validation';
import { type AuthResponse } from '@/types/auth';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthLayout } from '@/layouts/AuthLayout';

/**
 * Register Page Component
 * Handles new user registration, notification consents, and auto-login.
 */
const Register = () => {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<string | null>(null);
  
  // UI State for Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
      const response = await api.post<AuthResponse>('/auth/register', {
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber, 
        password: data.password,
        consents: { 
          email: data.emailReminders || false, 
          sms: data.smsReminders || false 
        }
      });

      // 2. Validate Response Data
      const { user, access_token } = response.data;
      
      if (!user || !access_token) {
        throw new Error("Registration successful, but server returned invalid data.");
      }

      // 3. Auto-Login & Redirect
      login(user, access_token);
      console.log('[Register] Success. Auto-logging in...');
      navigate('/dashboard');

    } catch (err: unknown) {
      console.error('[Register] Request Failed:', err);

      // 4. Professional Error Handling
      if (axios.isAxiosError(err)) {
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
      {/* HEADER SECTION */}
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {t('reg_title')}
        </h1>
        <p className="text-sm text-gray-500 max-w-[280px] mx-auto">
          {t('reg_subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0" />
            <span className="font-medium">{serverError}</span>
          </div>
        )}

        {/* INPUT FIELDS */}
        <div className="space-y-4">
          <Input
            label={t('reg_username')}
            icon={<User size={18} className="text-gray-400" />}
            placeholder="Enter your username"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          
          <Input
            label={t('reg_email')}
            type="email"
            icon={<Mail size={18} className="text-gray-400" />}
            placeholder="yourname@gmail.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label={t('reg_phone')}
            type="tel"
            icon={<Phone size={18} className="text-gray-400" />}
            placeholder="+1 (555) 000-0000"
            error={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />

          <Input
            label={t('reg_password')}
            type={showPassword ? 'text' : 'password'}
            icon={<Lock size={18} className="text-gray-400" />}
            placeholder="Enter your password"
            error={errors.password?.message}
            rightElement={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            {...register('password')}
          />

          <Input
            label={t('reg_confirm')}
            type={showConfirmPassword ? 'text' : 'password'}
            icon={<Lock size={18} className="text-gray-400" />}
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            rightElement={
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            {...register('confirmPassword')}
          />
        </div>

        {/* CONSENT CHECKBOXES */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-5 mt-0.5">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors"
                {...register('emailReminders')}
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
              {t('reg_email_consent')}
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-5 mt-0.5">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors"
                {...register('smsReminders')}
              />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
              {t('reg_sms_consent')}
            </span>
          </label>
        </div>

        {/* AI DISCLAIMER BOX */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start mt-6">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <p className="text-[13px] leading-relaxed text-amber-800 font-medium">
            {t('reg_ai_warning')}
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <Button 
          type="submit" 
          className="w-full mt-6 py-2.5 text-base font-medium shadow-soft" 
          isLoading={isSubmitting}
        >
          {t('reg_submit')}
        </Button>
      </form>

      {/* FOOTER LINK */}
      <div className="mt-8 text-center text-sm">
        <span className="text-gray-500">{t('reg_have_account')} </span>
        <Link 
          to="/auth/login" 
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          {t('reg_login_link')}
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
    
