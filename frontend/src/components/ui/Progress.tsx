import { cn } from '@/lib/utils';

export const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}>
    <div 
      className="bg-primary h-full w-full flex-1 transition-all duration-1000" 
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);