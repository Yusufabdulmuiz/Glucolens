import React from 'react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout wrapper for public authentication pages (Login, Register).
 * Centers content on a neutral background.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-ground p-4">
      <div className={cn("w-full max-w-md space-y-8", className)}>
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-xl bg-primary-500 flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Glucolens
          </h2>
        </div>

        {children}
        
        <div className="text-center text-sm text-gray-500">
          <p>© 2026 Glucolens. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};