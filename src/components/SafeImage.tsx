import React from 'react';
import { useAccess } from '../context/AccessibilityContext';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  description?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onError?: (e: any) => void;
  style?: React.CSSProperties;
}

export default function SafeImage({ src, alt, className = '', description, ...props }: SafeImageProps) {
  const { isSimplifiedMode } = useAccess();

  // If the image is purely decorative (no alt text), we tell screen readers to ignore it
  const isDecorative = !alt || alt === "";

  if (isSimplifiedMode) {
    return (
      <div 
        className={`bg-zinc-800 border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center p-4 ${className}`}
        role="img" 
        aria-label={alt || "Image placeholder"}
      >
        <span className="text-zinc-500 text-xs uppercase tracking-widest text-center">
          [Image Hidden: {alt}]
        </span>
        {description && <p className="sr-only">{description}</p>}
      </div>
    );
  }

  return (
    <>
      <img referrerPolicy="no-referrer" 
        src={src} 
        alt={alt} 
        className={className} 
        loading="lazy" 
        aria-hidden={isDecorative} 
        {...props}
      />
      {/* Long description for screen readers only */}
      {description && <p className="sr-only">{description}</p>}
    </>
  );
}

// Named export for compatibility
export { SafeImage };
