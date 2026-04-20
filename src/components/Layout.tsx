import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { useAccess } from '../context/AccessibilityContext';
import { useAuth } from '../context/AuthContext';
import { Zap } from 'lucide-react';
import { Nameplate } from './Nameplate';
import { AccessibilityToggle } from './AccessibilityToggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSimplifiedMode, toggleSimplifiedMode } = useAccess();
  const { user: currentUser, loginWithGoogle } = useAuth();
  const [showSlowLoadTrigger, setShowSlowLoadTrigger] = useState(false);

  useEffect(() => {
    // If Simplified Mode is already on, don't show the trigger
    if (isSimplifiedMode) return;

    // Check if user previously dismissed it
    const isDismissed = localStorage.getItem('dd_dismissed_slow_load') === 'true';
    if (isDismissed) return;

    // Show the slow load trigger after 4 seconds to catch users on slow connections
    const timer = setTimeout(() => {
      setShowSlowLoadTrigger(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isSimplifiedMode]);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col relative overflow-x-hidden font-sans selection:bg-magenta-500/30 selection:text-white">
      {/* Slow Load Trigger Banner */}
      {showSlowLoadTrigger && !isSimplifiedMode && (
        <div className="fixed top-0 left-0 w-full z-[10000] bg-[#050505] border-b border-[#FF69B4]/30 p-3 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-top-4 shadow-xl">
          <span className="text-zinc-300 text-xs tracking-widest uppercase text-center font-mono">
            If the site isn't loading fast, we've got your back.
          </span>
          <button 
            onClick={() => {
              toggleSimplifiedMode();
              setShowSlowLoadTrigger(false);
            }}
            className="flex items-center gap-2 bg-transparent text-[#FF69B4] border border-[#FF69B4]/50 px-4 py-1.5 rounded-none text-xs font-black uppercase tracking-widest hover:bg-[#FF69B4] hover:text-white hover:border-[#FF1E89] hover:shadow-[0_0_20px_rgba(255,105,180,0.8)] transition-all duration-300"
          >
            <Zap size={12} />
            Enable Simplified View
          </button>
          <button 
            onClick={() => {
              setShowSlowLoadTrigger(false);
              localStorage.setItem('dd_dismissed_slow_load', 'true');
            }}
            className="absolute right-4 text-zinc-600 hover:text-white text-xs transition-colors"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Background radial glow - subtle and luxurious */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.03)_0%,_rgba(18,18,18,0)_70%)] pointer-events-none"></div>

      {/* Navigation Landmark - Pushed to top left */}
      <nav className="z-20 w-full px-4 sm:px-6 py-6 flex justify-between items-center" aria-label="Main Navigation">
         <a href="/" className="flex items-center gap-3 text-white font-serif tracking-widest text-xl hover:text-[#FF69B4] transition-colors duration-500">
           <img referrerPolicy="no-referrer" 
             src="/branding/dd-sfw-logo.jpg?v=1" 
             alt="Dollhouse Deviants Logo" 
             className="h-10 w-auto rounded-sm object-contain" 
           />
           <span className="uppercase font-light hidden sm:inline-block">Dollhouse Deviants</span>
         </a>
         
         <div className="flex items-center gap-4 sm:gap-6">
           <AccessibilityToggle />
           
           {/* INSIDE YOUR PROFILE/NAVBAR SECTION */}
           <div className="flex items-center gap-4 pl-4 sm:pl-6 border-l border-zinc-800">
             {currentUser ? (
               <>
                 <div className="text-right hidden md:block">
                   <Nameplate 
                     name={currentUser.displayName || 'Sonja (Founder)'} 
                     role={(currentUser as any).role || 'architect'} 
                     className="text-xs justify-end"
                   />
                   <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-1">
                     System Status: Online
                   </p>
                 </div>
                 
                 <div className="w-10 h-10 shrink-0 rounded-full border border-[#FF69B4]/20 overflow-hidden relative group shadow-[0_0_15px_rgba(255,105,180,0.15)] transition-all duration-700 hover:border-[#FF69B4]/50">
                   <img referrerPolicy="no-referrer" 
                     src="/avatars/sonja-profile.jpg?v=1" 
                     alt="User Avatar" 
                     className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                     onError={(e) => {
                       e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentUser.displayName || 'User'}&background=FF69B4&color=fff&bold=true`;
                     }}
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF69B4]/20 to-transparent h-1 w-full animate-scan-slow pointer-events-none" />
                 </div>
               </>
             ) : (
               <div className="flex items-center gap-3 group cursor-pointer" onClick={loginWithGoogle}>
                 <div className="text-right hidden md:block">
                   <p className="text-xs tracking-widest text-zinc-400 font-bold uppercase group-hover:text-[#FF69B4] transition-colors">Log In</p>
                   <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-1">
                     System Status: Offline
                   </p>
                 </div>
                 <div className="w-10 h-10 shrink-0 rounded-full border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 group-hover:border-[#FF69B4] group-hover:text-[#FF69B4] transition-all bg-zinc-900/50">
                    <span className="text-xs tracking-widest font-black uppercase">?</span>
                 </div>
               </div>
             )}
           </div>
         </div>
      </nav>
      
      {/* Main Content Landmark */}
      <main className="flex-grow flex flex-col items-center relative z-10 px-4 sm:px-8 pt-12 pb-32 w-full">
        {children}
      </main>

      {/* Footer is outside main */}
      <footer className="z-10 w-full">
        <Footer />
      </footer>
    </div>
  );
}
