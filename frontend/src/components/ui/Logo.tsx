import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  layout?: 'horizontal' | 'vertical';
  linkTo?: string | null;
}

export const Logo = ({ 
  className, 
  layout = 'horizontal', 
  linkTo = '/' 
}: LogoProps) => {
  const isVertical = layout === 'vertical';

  const Content = (
    <>
      <div className={cn(
        "flex items-center justify-center bg-primary-600 text-white shadow-soft transition-transform duration-300 group-hover:scale-105",
        isVertical ? "h-12 w-12 rounded-2xl" : "h-9 w-9 rounded-xl"
      )}>
        <Droplet 
          size={isVertical ? 28 : 20} 
          fill="currentColor" 
          className="animate-in zoom-in-50 duration-500" 
        />
      </div>
      <span className={cn(
        "font-bold tracking-tight text-gray-900",
        isVertical ? "text-xl" : "text-lg"
      )}>
        Glucolens
      </span>
    </>
  );

  if (!linkTo) {
    return (
      <div className={cn(
        "flex items-center select-none", 
        isVertical ? "flex-col gap-3" : "flex-row gap-3", 
        className
      )}>
        {Content}
      </div>
    );
  }

  return (
    <Link 
      to={linkTo} 
      className={cn(
        "flex items-center group transition-opacity hover:opacity-90", 
        isVertical ? "flex-col gap-3" : "flex-row gap-3", 
        className
      )}
    >
      {Content}
    </Link>
  );
};

