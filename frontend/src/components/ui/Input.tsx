import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors bg-white",
            error 
              ? "border-risk-high focus:ring-risk-high focus:border-risk-high text-risk-high placeholder:text-red-300" 
              : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-risk-high font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };