import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;         // Added for left icons (User, Mail, Phone)
  rightElement?: React.ReactNode; // Added for right elements (Eye toggle)
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, rightElement, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {/* LABEL */}
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        {/* INPUT WRAPPER */}
        <div className="relative flex items-center">
          
          {/* LEFT ICON */}
          {icon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}

          {/* ACTUAL INPUT */}
          <input
            ref={ref}
            className={cn(
              "w-full py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors bg-white",
              // Dynamic padding to prevent text from typing over the icons
              icon ? "pl-10" : "pl-3",
              rightElement ? "pr-10" : "pr-3",
              // Semantic Colors
              error 
                ? "border-risk-high focus:ring-risk-high focus:border-risk-high text-risk-high placeholder:text-red-300" 
                : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder:text-gray-400",
              className
            )}
            {...props}
          />

          {/* RIGHT ELEMENT (e.g. Password Toggle) */}
          {rightElement && (
            <div className="absolute right-3 flex items-center justify-center">
              {rightElement}
            </div>
          )}
          
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-xs text-risk-high font-medium animate-in fade-in zoom-in-95">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
        
