import React from 'react';
import { cn } from '@/lib/utils';
import { Droplet } from 'lucide-react';

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
    // Changed: Applied the UX gradient background
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className={cn("w-full max-w-md", className)}>
        
        {/* Changed: Logo Section from UX */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
            <Droplet className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Glucolens
          </h1>
        </div>

        {/* Changed: Wrapped children in the UX Card style */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {children}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2026 Glucolens. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};