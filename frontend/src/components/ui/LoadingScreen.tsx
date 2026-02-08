import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  fullScreen?: boolean
}

const LoadingScreen = React.forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ className, message = "Loading...", fullScreen = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-300",
          // If fullScreen is true, force it to cover the window with a blur
          fullScreen 
            ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm" 
            : "w-full h-[200px] bg-gray-50/50 rounded-xl border border-dashed border-gray-200",
          className
        )}
        {...props}
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary-600 mb-4" />
        
        {message && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    )
  }
)
LoadingScreen.displayName = "LoadingScreen"

export { LoadingScreen }
