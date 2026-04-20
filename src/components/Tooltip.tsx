import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ children, content, position = 'top', className = '' }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className={`group relative inline-flex ${className}`}>
      {children}
      {content && (
        <div 
          role="tooltip"
          className={`absolute ${positionClasses[position]} hidden group-hover:block group-focus-within:block w-max bg-[#050505] border border-[#FF69B4] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(255,105,180,0.5)] z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-200`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
