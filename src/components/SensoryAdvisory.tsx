import React, { useState, useEffect } from 'react';
import { Brain, Heart, ZapOff, X } from 'lucide-react';
import { useAccess } from '../context/AccessibilityContext';

export default function SensoryAdvisory() {
  const [isVisible, setIsVisible] = useState(false);
  const { isSimplifiedMode, toggleSimplifiedMode } = useAccess();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('dd_sensory_ack');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dd_sensory_ack', 'true');
  };

  const engage = () => {
    if (!isSimplifiedMode) toggleSimplifiedMode();
    dismiss();
  };

  return (
    <div className="absolute top-24 right-8 z-[50] animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="w-[320px] bg-[#050505] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FF69B4]/5 blur-3xl rounded-full" />
        
        <button 
          onClick={dismiss}
          className="absolute top-4 right-4 text-zinc-800 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#FF1E89]/10 rounded-xl border border-[#FF69B4]/20">
            <Brain className="text-[#FF69B4]" size={18} />
          </div>
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-1">
              Sensory Intel <Heart size={10} className="fill-[#FF69B4] text-[#FF69B4]" />
            </h4>
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Architect Protocol</p>
          </div>
        </div>

        <p className="text-[11px] text-zinc-500 leading-relaxed mb-6 italic font-medium">
          "High-contrast visuals and motion active. Requires cognitive override to disable. Initiate grounding sequence to strip density."
        </p>

        <button 
          onClick={engage}
          className="w-full bg-transparent hover:bg-[#FF1E89] text-[#FF69B4] hover:text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border border-[#FF69B4]/30 hover:border-[#FF69B4] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,105,180,0.1)] hover:shadow-[0_0_20px_rgba(255,105,180,0.4)]"
        >
          <ZapOff size={12} />
          Engage Simplified View
        </button>
      </div>
    </div>
  );
}
