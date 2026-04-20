import React, { useEffect, useState } from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 15); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center font-mono overflow-hidden">
      
      {/* 1. THE MASSIVE LOGO & SYNCHRONIZED GLOW */}
      <div className="relative mb-24 group px-4 flex justify-center items-center">
        
        {/* THE DYNAMIC BACKGROUND PULSE */}
        <div className="absolute w-[120vw] h-[120vw] bg-[#FF69B4]/5 blur-[150px] rounded-full animate-sync-pulse pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[95vw] md:max-w-[75vw] mx-auto glitch-effect animate-master-glitch">
          <img referrerPolicy="no-referrer" 
            src="/DD-SFW-Logo-No-Main.jpg" 
            alt="Dollhouse Deviants" 
            className="w-full h-auto opacity-70 contrast-150 drop-shadow-[0_0_50px_rgba(0,0,0,1)] animate-flicker relative z-10 transition-transform duration-700"
          />

          {/* AGGRESSIVE HORIZONTAL SCAN LINE */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-20 mix-blend-screen opacity-60">
            <div className="h-[4px] w-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF,0_0_30px_#00E5FF] animate-mega-scan" />
            <div className="h-[2px] w-full bg-[#FF69B4] shadow-[0_0_20px_#FF69B4,0_0_40px_#FF69B4] animate-mega-scan" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* 2. ENLARGED COMMAND CONSOLE */}
      <div className="w-full max-w-2xl px-12 space-y-8 relative z-20">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-[#FF69B4] font-black italic tracking-[0.3em] text-lg hover:drop-shadow-[0_0_15px_rgba(255,105,180,0.5)] transition-all">
              <ShieldAlert size={24} className="animate-pulse" />
              SYSTEM INITIALIZATION
            </div>
            <div className="text-[12px] text-zinc-600 uppercase tracking-[0.6em] font-bold">
              Secure Uplink: Waverly_Node_01
            </div>
          </div>
          <div className="text-5xl font-black text-white italic tracking-tighter shadow-[#FF69B4]/20">
            {progress}%
          </div>
        </div>
        
        {/* MASSIVE PROGRESS BAR */}
        <div className="h-3 w-full bg-zinc-950 overflow-hidden rounded-full border border-zinc-800 p-[2px]">
          <div 
            className="h-full bg-[#FF1E89] transition-all duration-200 shadow-[0_0_35px_#FF1E89]" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* STATUS LOGS */}
        <div className="h-10 flex items-center justify-center border-t border-zinc-900 pt-8">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 animate-pulse font-black italic">
            {progress < 30 && "> Mounting Identity_Kernel..."}
            {progress >= 30 && progress < 60 && "> Diverting Traffic via Stealth_Relay..."}
            {progress >= 60 && progress < 90 && "> Handshaking: Sonja_Kelley_Architect..."}
            {progress >= 90 && "> Sanctuary Ready. Welcome Home."}
          </p>
        </div>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes mega-scan {
          0% { transform: translateY(-150px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
        @keyframes sync-pulse {
          0%, 100% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-mega-scan {
          animation: mega-scan 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-sync-pulse {
          animation: sync-pulse 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
