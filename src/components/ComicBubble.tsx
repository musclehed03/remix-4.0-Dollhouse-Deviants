import React from 'react';

interface ComicBubbleProps {
  text: string;
  className?: string;
}

const ComicBubble: React.FC<ComicBubbleProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-3xl p-6 shadow-2xl ${className}`}>
      <p className="text-zinc-300 text-sm font-black tracking-tight leading-relaxed uppercase italic">
        {text}
      </p>
      
      {/* The Comic Tail (SVG) */}
      <svg 
        className="absolute -bottom-4 right-8 w-8 h-8 fill-zinc-900 stroke-zinc-700" 
        viewBox="0 0 20 20" 
        style={{ strokeWidth: '1px', strokeDasharray: '2,2' }}
      >
        <path d="M0 0 L20 0 L10 20 Z" />
      </svg>
    </div>
  );
};

export default ComicBubble;
