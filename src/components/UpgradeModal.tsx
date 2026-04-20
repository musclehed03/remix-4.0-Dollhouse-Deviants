import React from 'react';
import { ShieldAlert, Crown, ArrowRight, X } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-[#FF69B4]/30 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(255,105,180,0.2)] text-center animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex justify-center mb-8">
          <div className="p-4 bg-[#FF1E89]/10 rounded-2xl border border-[#FF69B4]/20 animate-pulse">
            <ShieldAlert className="text-[#FF69B4]" size={48} />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">
          Clearance <span className="text-[#FF69B4] drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]">Denied</span>
        </h2>
        
        <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
          You are attempting to access <span className="text-white">Architect-Level</span> intelligence. 
          This encrypted transmission is reserved for the Inner Circle.
        </p>

        {/* PREVIEW BOX */}
        <div className="bg-black/50 border border-zinc-800 rounded-2xl p-6 mb-10 text-left">
          <h4 className="text-zinc-200 font-bold text-xs uppercase mb-4 tracking-widest flex items-center gap-2">
            <Crown size={14} className="text-[#FF69B4]" />
            Architect Tier Benefits:
          </h4>
          <ul className="space-y-3">
            {['Full Vault Access', 'Private Architect Logs', 'Early Boutique Drops'].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-xs uppercase font-bold text-zinc-500">
                <div className="w-1.5 h-1.5 bg-[#FF69B4] rounded-full shadow-[0_0_5px_#FF69B4]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <a 
            href="/support"
            className="w-full bg-[#FF69B4] hover:bg-white hover:text-black text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
          >
            Upgrade Clearance
            <ArrowRight size={16} />
          </a>
          <button 
            onClick={onClose}
            className="text-zinc-600 text-xs uppercase tracking-widest font-bold hover:text-zinc-400 transition-colors"
          >
            Stay as Deviant
          </button>
        </div>
      </div>
    </div>
  );
};
