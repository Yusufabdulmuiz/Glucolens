import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Primary interaction component.
 * Supports multiple visual variants and a built-in loading state.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-soft focus:ring-primary-500",
      secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm focus:ring-gray-200",
      outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
      ghost: "text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-200",
      destructive: "bg-risk-high text-white hover:bg-red-600 shadow-soft focus:ring-red-500",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };