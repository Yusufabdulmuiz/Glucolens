import * as React from "react";
import { Activity, Loader2 } from "lucide-react"; // Added Activity icon
import { cn } from "@/lib/utils";

interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen = React.forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ className, message = "Initializing...", fullScreen = true, ...props }, ref) => {
    
    // State to cycle through "Fake System Checks"
    const [statusText, setStatusText] = React.useState(message);
    
    React.useEffect(() => {
      if (!fullScreen) return;
      
      const steps = [
        "Connecting to Glucolens Neural Net...",
        "Verifying Biometric Data...",
        "Syncing Patient Records...",
        "System Ready."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        setStatusText(steps[i % steps.length]);
        i++;
      }, 800); // Change text every 800ms

      return () => clearInterval(interval);
    }, [fullScreen]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-500",
          fullScreen
            ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-md" // Glass effect
            : "w-full h-[200px] bg-gray-50/50 rounded-xl border border-dashed border-gray-200",
          className
        )}
        {...props}
      >
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer Ring (Spinning) */}
          <div className="absolute inset-0 border-4 border-green-100 rounded-full animate-[spin_3s_linear_infinite]" />
          
          {/* Inner Ring (Spinning Reverse) */}
          <div className="absolute inset-2 border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          
          {/* Center Icon (Pulse) */}
          <div className="bg-white p-4 rounded-full shadow-lg animate-pulse z-10">
             <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-semibold text-gray-700 animate-pulse">
            {fullScreen ? statusText : message}
          </p>
          {fullScreen && (
            <p className="text-xs text-green-600 font-mono bg-green-50 px-2 py-1 rounded-md">
              SECURE CONNECTION ESTABLISHED
            </p>
          )}
        </div>
      </div>
    );
  }
);

LoadingScreen.displayName = "LoadingScreen";

export { LoadingScreen };
