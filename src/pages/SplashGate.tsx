import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export default function SplashGate() {
  const { isAgeVerified, verifyAge } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAgeVerified) {
      navigate('/vault');
    }
  }, [isAgeVerified, navigate]);

  if (isAgeVerified) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#0a0a0a]">
      <div className="max-w-md w-full border-2 border-[#FF69B4] p-8 bg-[#1A1A1B] text-center shadow-[0_0_15px_rgba(255,105,180,0.3)]">
        <h1 className="text-4xl font-black tracking-tighter mb-6 uppercase text-white">
          Dollhouse <span className="text-[#FF69B4]">Deviants</span>
        </h1>
        
        <div className="space-y-4 mb-8 text-sm text-[#A3A3A3]">
          <p>This website contains age-restricted material.</p>
          <p>By entering, you confirm that you are at least 18 years of age or the age of majority in your jurisdiction, whichever is greater.</p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={verifyAge}
            className="w-full py-4 px-6 bg-transparent border-2 border-[#FF69B4] text-[#FF69B4] font-bold uppercase tracking-widest hover:bg-[#FF69B4] hover:text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(255,105,180,0.8)] transition-all duration-300 animate-pulse-neon"
          >
            I am 18 or older - Enter
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 px-6 bg-transparent border border-[#2D2D2D] text-[#A3A3A3] font-bold uppercase tracking-widest hover:bg-[#2D2D2D] hover:border-[#A3A3A3] hover:text-white hover:shadow-[0_0_15px_rgba(163,163,163,0.5)] transition-all duration-300"
          >
            Exit to Hub
          </button>
        </div>
      </div>
    </main>
  );
}
