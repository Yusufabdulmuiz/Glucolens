import * as React from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen = React.forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ className, message = "Loading...", fullScreen = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          fullScreen
            ? "fixed inset-0 z-50 bg-slate-50/90 backdrop-blur-sm" // Glass overlay for full screen
            : "w-full h-full min-h-[140px] bg-transparent", // Transparent for inside cards
          className
        )}
        {...props}
      >
        <div className="relative flex items-center justify-center mb-4">
          {/* Outer Ring (Subtle Blue) */}
          <div className="absolute inset-[-8px] border-[3px] border-blue-100 rounded-full animate-[spin_3s_linear_infinite]" />
          
          {/* Inner Ring (Brand Blue) */}
          <div className="absolute inset-[-8px] border-[3px] border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          
          {/* Center Icon */}
          <div className="relative h-12 w-12 bg-white rounded-full shadow-lg shadow-blue-100/50 flex items-center justify-center z-10 border border-blue-50">
             <Activity className="h-6 w-6 text-blue-600 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Message */}
        <p className="text-sm font-medium text-slate-600 animate-pulse tracking-wide">
          {message}
        </p>
      </div>
    );
  }
);

LoadingScreen.displayName = "LoadingScreen";

export { LoadingScreen };
