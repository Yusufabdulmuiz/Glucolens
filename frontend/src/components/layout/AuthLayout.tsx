import React from 'react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/ui/LanguageSelector'; 
import { Logo } from '@/components/ui/Logo'; // <--- Import the new component

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  className,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-ground p-4 relative overflow-hidden">
      
      {/* Global Utilities */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Main Card Container */}
      <div className={cn(
        "w-full max-w-[400px] bg-white rounded-2xl shadow-soft p-8 sm:p-10 relative z-10",
        "animate-in fade-in zoom-in-95 duration-300", 
        className
      )}>
        
        {/* App Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Replaced hardcoded logo with component */}
          <Logo layout="vertical" linkTo={null} />
        </div>

        {children}
        
        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8">
          <p>© 2026 Glucolens. Secure Medical Platform.</p>
        </div>

      </div>
    </div>
  );
};
