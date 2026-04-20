import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, ChevronRight, Loader2 } from 'lucide-react';

export default function VaultGate() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    // Save the verification in session storage (lasts until they close the tab)
    sessionStorage.setItem('vault_verified', 'true');
    
    // Artificial delay for the "gate opening" animation/cinematic
    setTimeout(() => {
      navigate('/vault');
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 overflow-hidden relative"
      role="region"
      aria-label="The Vault Entrance"
      aria-live="polite"
      aria-busy={isVerifying}
    >
      <Helmet>
        <title>The Vault | Restricted Access | Dollhouse Deviants</title>
        <meta name="title" content="The Vault | Restricted Access | Dollhouse Deviants" />
        <meta name="description" content="[ARCHITECT CLEARANCE REQUIRED] - Restricted creative archives and 18+ content. Entry into the inner sanctum of the Dollhouse." />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dollhousedeviants.com/the-vault" />
        <meta property="og:title" content="The Vault | Dollhouse Deviants" />
        <meta property="og:description" content="Entry into the restricted archives. Architectural clearance required for the inner sanctum." />
        <meta property="og:image" content="/the-vault-logo-better.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="The Vault | Restricted" />
        <meta property="twitter:description" content="Architectural clearance required. 18+ restricted access." />
        <meta property="twitter:image" content="/the-vault-logo-better.webp" />
      </Helmet>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,255,0.05)_0%,_rgba(255,0,255,0)_70%)]"></div>

      <div className="max-w-md w-full z-10 text-center">
        <div className="inline-flex p-4 rounded-full bg-magenta-500/10 border border-magenta-500/20 mb-8 animate-pulse">
          <Lock className="text-magenta-500" size={32} />
        </div>
        
        <h1 className="text-5xl font-black uppercase text-white tracking-tighter mb-6">
          The Vault
        </h1>
        
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center gap-2 justify-center text-magenta-500 mb-6 font-mono text-xs tracking-[0.3em] uppercase">
            <ShieldAlert size={14} />
            Restricted Access
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed mb-10">
            This section contains adult-oriented content, including photography and artistic depictions intended for a mature audience only.
          </p>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className={`w-full bg-magenta-600 hover:bg-magenta-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group ${isVerifying ? 'opacity-80 cursor-wait' : ''}`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  OPENING GATE...
                </>
              ) : (
                <>
                  I AM 18 OR OLDER
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <a 
              href="/" 
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold py-4 rounded-2xl transition-all flex items-center justify-center"
            >
              EXIT TO HUB
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-700 font-mono uppercase tracking-widest max-w-xs mx-auto">
          By entering, you agree to our 18 U.S.C. 2257 Compliance and Terms of Service.
        </p>
      </div>
    </div>
  );
}
