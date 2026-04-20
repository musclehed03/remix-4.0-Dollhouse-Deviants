import React from 'react';

export const FounderSignature = () => {
  return (
    <div className="mt-8 flex flex-col items-start group relative">
      <div className="absolute inset-0 bg-[#FF69B4]/10 blur-3xl group-hover:bg-[#FF69B4]/30 transition-all duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col">
        {/* The Signature Graphic */}
        <svg 
          width="320" 
          height="120" 
          viewBox="0 0 320 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 mb-2 drop-shadow-[0_0_15px_rgba(255,105,180,0.9)]"
        >
          {/* Jagged Brutalist Path */}
          <path
            d="M10 80 L 40 10 L 80 90 L 120 20 L 160 100 L 200 30 L 240 80 L 280 15 L 310 90"
            stroke="#FF69B4"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="animate-sig"
          />
          {/* Glitch Overlay Path */}
          <path
            d="M15 80 L 45 10 L 85 90 L 125 20 L 165 100 L 205 30 L 245 80 L 285 15 L 315 90"
            stroke="#FFF"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="animate-sig-glitch opacity-50"
          />
          {/* Underline / Strict Border */}
          <rect x="10" y="110" width="300" height="2" fill="#FF69B4" className="animate-glitch-line" />
          <rect x="10" y="115" width="200" height="1" fill="#FF69B4" fillOpacity="0.5" />
          
          <style>{`
            .animate-sig {
              stroke-dasharray: 1500;
              stroke-dashoffset: 1500;
              animation: drawBrutalist 2.5s cubic-bezier(0.9, 0, 0.1, 1) forwards;
            }
            .animate-sig-glitch {
              stroke-dasharray: 1500;
              stroke-dashoffset: 1500;
              animation: drawBrutalist 2.5s cubic-bezier(0.9, 0, 0.1, 1) forwards;
              animation-delay: 0.1s;
            }
            .animate-glitch-line {
              animation: glitchFade 0.5s infinite alternate steps(2, end);
            }
            @keyframes drawBrutalist {
              0% { stroke-dashoffset: 1500; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes glitchFade {
              0% { transform: translateX(0px); opacity: 1; }
              50% { transform: translateX(3px); opacity: 0.7; }
              100% { transform: translateX(-3px); opacity: 1; }
            }
          `}</style>
        </svg>

        {/* Text Box */}
        <div className="relative z-10 self-start text-[#121212] bg-[#FF69B4] px-4 py-2 border-l-4 border-white shadow-[0_0_20px_rgba(255,105,180,0.8)] ml-4 
                        transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] leading-none mb-1">
            Sonja
          </h4>
          <p className="text-xs font-bold uppercase tracking-[0.4em] bg-black text-[#FF69B4] px-2 py-0.5 inline-block">
            Architect // Verified
          </p>
        </div>
      </div>
    </div>
  );
};
