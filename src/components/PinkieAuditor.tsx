import React, { useState } from 'react';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import { useAuth } from '../context/AuthContext';

const PinkieAuditor = () => {
  const {
    user,
    isAdmin,
    loading: authLoading,
    loginWithGoogle,
  } = useAuth();

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const askPinkie = async () => {
    const prompt = input.trim();

    if (!user || !isAdmin || !prompt || loading) {
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const token = await user.getIdToken();

      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          input: prompt,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          setResult('Your session expired. Sign out and sign in again.');
        } else if (response.status === 403) {
          setResult('Pinkie is currently restricted to the founder.');
        } else if (response.status === 429) {
          setResult('Pinkie has reached the request limit. Try again shortly.');
        } else {
          setResult(
            typeof data.message === 'string'
              ? data.message
              : 'Pinkie is temporarily unavailable.',
          );
        }

        return;
      }

      setResult(
        typeof data.output === 'string'
          ? data.output
          : 'Pinkie returned no usable response.',
      );
    } catch {
      setResult('Connection to Pinkie failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#3f3f46] p-6 rounded-sm shadow-2xl relative overflow-hidden group">
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

        {authLoading ? (
          <div
            className="flex items-center gap-2 text-sm text-zinc-300"
            role="status"
          >
            <Loader2 size={16} className="animate-spin" />
            Checking access...
          </div>
        ) : !user ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-300">
              Sign in to access Pinkie Auditor.
            </p>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full bg-[#ec4899] text-black font-black uppercase tracking-widest py-3 text-xs cursor-pointer transition-all hover:bg-[#be185d] focus:outline-none focus:ring-2 focus:ring-[#fafafa]"
            >
              Sign in with Google
            </button>
          </div>
        ) : !isAdmin ? (
          <p
            className="text-sm text-zinc-300"
            role="status"
          >
            Pinkie Auditor is currently restricted to the founder while
            paid-tier access is being developed.
          </p>
        ) : (
          <div className="space-y-4">
            <label
              className="sr-only"
              htmlFor="audit-input"
            >
              Challenge the sanctuary
            </label>

            <input
              id="audit-input"
              type="text"
              maxLength={2000}
              className="w-full bg-[#09090b] text-[#fafafa] border border-[#d4d4d8] p-3 text-sm focus:border-[#ec4899] focus:outline-none focus:ring-1 focus:ring-[#ec4899] transition-all font-mono"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Challenge the sanctuary..."
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  void askPinkie();
                }
              }}
            />

            <button
              type="button"
              onClick={() => void askPinkie()}
              disabled={loading || !input.trim()}
              className="w-full bg-[#ec4899] text-black font-black uppercase tracking-widest py-3 text-xs cursor-pointer transition-all hover:bg-[#be185d] hover:shadow-[0_0_15px_#ec4899] focus:outline-none focus:ring-2 focus:ring-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </>
              ) : (
                'Audit'
              )}
            </button>
          </div>
        )}

        {result && (
          <div
            className="mt-6 font-mono text-[#fafafa] border-l-4 border-[#ec4899] pl-4 py-2 bg-black/40 text-sm animate-fade-in whitespace-pre-wrap"
            role="status"
            aria-live="polite"
          >
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