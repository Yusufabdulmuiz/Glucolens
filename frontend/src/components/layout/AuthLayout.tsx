import React from 'react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/ui/LanguageSelector'; 
import { Logo } from '@/components/ui/Logo'; // 

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;

}

/**

 * Layout wrapper for public authentication pages (Login, Register).

 * Centers content on a neutral background.

 */

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  className,
}) => {

  return (

  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 relative overflow-hidden">
     
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <div className={cn("w-full max-w-md z-10", className)}>
     
        <div className="flex flex-col items-center justify-center mb-8 animate-in fade-in zoom-in-95 duration-300">
          <Logo layout="vertical" linkTo={null} />

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