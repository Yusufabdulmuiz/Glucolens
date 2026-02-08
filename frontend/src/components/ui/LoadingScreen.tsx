import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

export function LoadingScreen({
  fullScreen = false,
  message = 'Loading...',
  className,
}: LoadingScreenProps) {
  // Full Screen Overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
          <div className="relative">
            
            <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
            
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary-600" />
            </div>
          </div>
          
          
          <p className="text-lg font-medium text-gray-900 animate-pulse">
            {message}
          </p>
        </div>
      </div>
    );
  }

  // Inline Loading (for inside cards)
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      <p className="mt-2 text-sm text-gray-500">{message}</p>
    </div>
  );
}
