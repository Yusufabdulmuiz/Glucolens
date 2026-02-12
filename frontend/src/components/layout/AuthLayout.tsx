import React from 'react';
import { Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/ui/LanguageSelector'; 



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
        <div className="flex flex-col items-center space-y-2 text-center mb-8">
          <div className="h-12 w-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-2 transition-transform hover:scale-105">
            <Droplet size={28} fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Glucolens
          </h1>
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
