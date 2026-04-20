import React from 'react';
import { Eye, ZapOff } from 'lucide-react';
import { useAccess } from '../context/AccessibilityContext';

export const AccessibilityToggle = () => {
  const { isSimplifiedMode, toggleSimplifiedMode } = useAccess();

  return (
    <button
      onClick={() => toggleSimplifiedMode()}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 group ${
        isSimplifiedMode 
          ? 'bg-[#FF1E89] border-[#FF69B4] text-white shadow-[0_0_20px_rgba(255,105,180,0.8)]' 
          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300 hover:shadow-[0_0_15px_rgba(161,161,170,0.6)]'
      }`}
    >
      {isSimplifiedMode ? <ZapOff size={14} /> : <Eye size={14} className="group-hover:text-zinc-400" />}
      <span className="text-xs uppercase font-black tracking-widest">
        {isSimplifiedMode ? 'Simplified View: ON' : 'Simplified View: OFF'}
      </span>
    </button>
  );
};
