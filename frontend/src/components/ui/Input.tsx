import React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

  label?: string;

  error?: string;

  icon?: React.ReactNode;         // Added for left icons (User, Mail, Phone)

  rightElement?: React.ReactNode; // Added for right elements (Eye toggle)

}

const Input = React.forwardRef<HTMLInputElement, InputProps>(

  ({ className, label, error, icon, rightElement, type, ...props }, ref) => {

    return (

      <div className="w-full space-y-1">

        {/* LABEL */}

        {label && (

          <label className="block text-sm font-medium text-foreground">

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

            type={type} 

            className={cn(

              "flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-base transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

              error && "border-destructive ring-destructive/20 focus-visible:ring-destructive/40",

              // padding logic so text doesn't hide behind icons

              icon ? "pl-10" : "pl-3",

              rightElement ? "pr-10" : "pr-3",

              className

            )}

            {...props}

          />

          {/* RIGHT ELEMENT like Password Toggle */}

          {rightElement && (

            <div className="absolute right-3 flex items-center justify-center">

              {rightElement}

            </div>

          )}
         
        </div>

        {/* ERROR MESSAGE */}

        {error && (

          <p className="text-xs text-destructive font-medium">{error}</p>

        )}

      </div>

    );

  }

);

Input.displayName = 'Input';

export { Input };