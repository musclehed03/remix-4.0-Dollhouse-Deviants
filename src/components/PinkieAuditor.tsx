import React, { useState } from 'react';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';

/**
 * PinkieAuditor
 * Integrates with the Vertex AI Reasoning Engine (Pinkie_The_Brain)
 * via a secure server-side proxy.
 */
const PinkieAuditor = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const askPinkie = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 403 && data.troubleshooting) {
          const { troubleshooting } = data;
          setResult(`${data.message}\n\nTroubleshooting:\n- Identity: ${troubleshooting.identity || "Unknown"}\n- Role Needed: ${troubleshooting.requiredRole || "Agent Platform User"}\n- Console: ${troubleshooting.consoleLink}\n\n${troubleshooting.instruction}`);
        } else {
          // Robust error extraction to avoid "Objects are not valid as a React child"
          let errorMessage = "Incorrect ❌ Audit Denied.";
          
          if (data.error) {
            if (typeof data.error === 'string') {
              errorMessage = data.error;
            } else if (typeof data.error === 'object') {
              errorMessage = data.error.message || data.error.error || JSON.stringify(data.error);
            }
          } else if (data.message) {
            errorMessage = typeof data.message === 'object' ? JSON.stringify(data.message) : data.message;
          } else if (data.details && data.details.message) {
            errorMessage = data.details.message;
          }
          
          setResult(String(errorMessage));
        }
        return;
      }
      
      setResult(typeof data.output === 'object' ? JSON.stringify(data.output, null, 2) : (data.output || "Incorrect ❌ No response from Brain."));
    } catch (error) {
      setResult("Incorrect ❌ Connection Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#3f3f46] p-6 rounded-sm shadow-2xl relative overflow-hidden group">
      {/* Visual Flair */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <ShieldCheck size={80} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-[#ec4899]" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">
            Pinkie Auditor // System Integrity Check
          </h2>
        </div>

        <div className="space-y-4">
          <label className="sr-only" htmlFor="audit-input">Challenge the sanctuary</label>
          <input 
            id="audit-input"
            type="text"
            className="w-full bg-[#09090b] text-[#fafafa] border border-[#d4d4d8] p-3 text-sm focus:border-[#ec4899] focus:outline-none focus:ring-1 focus:ring-[#ec4899] transition-all font-mono" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Challenge the sanctuary..."
            onKeyDown={(e) => e.key === 'Enter' && askPinkie()}
          />
          
          <button 
            onClick={askPinkie} 
            disabled={loading || !input.trim()}
            className="w-full bg-[#ec4899] text-black font-black uppercase tracking-widest py-3 text-xs cursor-pointer transition-all hover:bg-[#be185d] hover:shadow-[0_0_15px_#ec4899] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                THINKING...
              </>
            ) : (
              "AUDIT"
            )}
          </button>
        </div>

        {result && (
          <div className="mt-6 font-mono text-[#fafafa] border-l-4 border-[#ec4899] pl-4 py-2 bg-black/40 text-sm animate-fade-in whitespace-pre-wrap">
            <div className="text-[10px] text-[#ec4899] uppercase font-bold mb-1 opacity-60 tracking-tighter">
              Verdict Protocol Alpha:
            </div>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default PinkieAuditor;
