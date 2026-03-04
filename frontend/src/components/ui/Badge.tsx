import { cn } from '@/lib/utils';

export const Badge = ({ level, className }: { level?: string; className?: string }) => {
  const normalized = level?.toLowerCase() || 'pending';
  const styles: Record<string, string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };
  return (
    <span className={cn(
      `inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap capitalize`,
      styles[normalized] || 'bg-gray-100 text-gray-700',
      className
    )}>
      {normalized} Risk
    </span>
  );
};