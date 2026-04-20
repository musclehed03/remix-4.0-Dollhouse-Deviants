import React, { useState } from 'react';
import { useAccess } from '../context/AccessibilityContext';
import { Settings, Brain } from 'lucide-react';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { focusMode, toggleFocus, reduceMotion, toggleMotion, dyslexicFont, toggleFont, highContrast, toggleContrast, colorBlindMode, toggleColorBlind, lightMode, toggleLightMode, isSimplifiedMode, toggleSimplifiedMode } = useAccess();

  return (
    <div className="fixed bottom-8 left-8 z-[10000] group">
      {/* The "Easy Button" */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-zinc-950 border border-[#FF69B4]/30 hover:border-[#FF69B4] text-white p-4 rounded-full shadow-[0_0_15px_rgba(255,105,180,0.15)] transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-[0_0_25px_rgba(255,105,180,0.4)] overflow-hidden"
        aria-label="Sensory Settings"
      >
        <div className="absolute inset-0 bg-[#FF69B4]/5 group-hover:bg-[#FF69B4]/10 transition-colors pointer-events-none" />
        {/* The custom icon (composite gear + brain) using Lucide Icons to ensure it renders */}
        <div className="relative h-7 w-7 flex items-center justify-center z-10">
          <Settings className="absolute inset-0 h-full w-full text-zinc-500 group-hover:text-[#FF69B4] transition-colors duration-300 animate-[spin_6s_linear_infinite]" />
          <Brain className="absolute inset-0 h-4 w-4 m-auto text-zinc-300 group-hover:text-white transition-colors duration-300" />
        </div>
      </button>

      {/* Branded Label */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] uppercase font-bold italic text-magenta-500 tracking-wider whitespace-nowrap">
        Deviant Controls
      </span>

      {/* The Neurodiversity Menu */}
      {isOpen && (
        <div className="absolute bottom-24 left-0 w-80 bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
          <nav className="flex justify-between items-center mb-10 pb-4 border-b border-magenta-900/30">
            <h3 className="text-magenta-500 font-bold uppercase tracking-[0.2em] text-xs">Sensory Suite</h3>
            <button onClick={() => setIsOpen(false)} className="text-magenta-500 text-xl font-black">×</button>
          </nav>
          
          <div className="space-y-4">
            <Toggle label="Focus Mode (Hide Distractions)" active={focusMode} onClick={toggleFocus} />
            <Toggle label="Safe Motion (Stop Animations)" active={reduceMotion} onClick={toggleMotion} />
            <Toggle label="Readable Font (ADHD/Dyslexia)" active={dyslexicFont} onClick={toggleFont} />
            <Toggle label="High Contrast" active={highContrast} onClick={toggleContrast} />
            <Toggle label="Color Blind Support" active={colorBlindMode} onClick={toggleColorBlind} />
            <Toggle label="Light Theme" active={lightMode} onClick={toggleLightMode} />
            <Toggle label="Simplified View (Hide Images)" active={isSimplifiedMode} onClick={toggleSimplifiedMode} />
          </div>

          <p className="mt-8 text-[11px] text-zinc-600 uppercase leading-relaxed italic border-t border-zinc-900 pt-6">
             built with devotion for the neurodivergent community
          </p>
        </div>
      )}
    </div>
  );
}

const Toggle = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-4 rounded-lg text-xs font-bold transition-all flex justify-between items-center border ${active ? 'bg-magenta-600 text-white border-magenta-600' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-zinc-700'}`}
  >
    {label}
    <span className={`px-3 py-1 text-xs uppercase font-black tracking-widest ${active ? 'bg-white/20 text-white' : 'text-zinc-500'}`}>
      {active ? 'ON' : 'OFF'}
    </span >
  </button>
);
