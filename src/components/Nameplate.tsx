import React from 'react';

interface NameplateProps {
  name: string;
  role?: string;
  className?: string;
}

export const Nameplate = ({ name, role, className = "" }: NameplateProps) => {
  // Removes any text in parentheses from the database string
  const cleanName = name.replace(/\s*\(.*?\)\s*/g, '').trim();
  const isArchitect = role === 'architect' || name.toLowerCase().includes('founder');

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-black uppercase tracking-tighter italic text-white">
        {cleanName}
      </span>
      {isArchitect && (
        <span className="text-pink-500 font-black uppercase italic text-xs tracking-widest px-2 py-0.5 border border-pink-500/30 rounded-md bg-pink-500/5 shadow-[0_0_10px_rgba(219,39,119,0.2)]">
          (Founder)
        </span>
      )}
    </div>
  );
};
